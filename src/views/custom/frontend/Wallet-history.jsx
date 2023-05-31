/* eslint-disable  */
import React from "react";
// import Axios from "axios";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import InnerHeader from "components/Navbars/Innerheader";
import Footer from "components/Navbars/Frontfooter";
import RightSidebar from "components/Navbars/Rightsidebar";
import LeftSidebar from "components/Navbars/Leftsidebar";
import * as moment from "moment";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class WalletHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            WalletHistory:[],
            WalletAmount:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getWalletHistory()
        this.getLoginUserDetail()
        this.getWalletAmount()
        if(!sessionStorage.getItem("_access")){
            window.location.href="/"
        }
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }
    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    notify(type, message) {
        if (type === "error") type = "danger";
        var options = {};
        options = {
            place: process.env.REACT_APP_ALERT_POSITION ? process.env.REACT_APP_ALERT_POSITION : "tr",
            message: (
                <div>
                    <div>
                        <b>{message}</b>
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7
        };
        this.notificationAlert.current.notificationAlert(options);
    }

    getWalletHistory = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/wallet-history`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    WalletHistory:res.data.data.category
                })
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getLoginUserDetail = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/login-user`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    User:res.data.data.category
                })
                console.log("brands",this.state.User)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getWalletAmount = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/wallet-amount`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            var total_amount = 0
            setTimeout(() => {
                if(res.data.data.category){
                    total_amount = res.data.data.category.amount;
                }else{
                    total_amount = 0;
                }
                this.setState({
                    loading:false,
                    showCat:true,
                    WalletAmount:total_amount
                })
                console.log("wallet amount",this.state.WalletAmount)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
   
    

    render() {
        return <>
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Wallet History</h1>
                     <ul class="add-money-sec">
                           <li class="right">
                             <p>Wallet Balance</p>
                             <h1><i class="fa fa-inr" aria-hidden="true"></i>{this.state.WalletAmount}</h1>
                           </li>
                           <li class="left">
                             <p><img src={require("assets/img/white-wallet.png")} alt="dashboard"/></p>
                           </li>
                       </ul>
                 </div>
                    <div class="all-task-table" id="wallet-history">
                     <table class="table">
                          <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Transaction Fee</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Message</th>
                                <th scope="col">Date</th>
                              </tr>
                          </thead>
                          <tbody>
                          {this.state.WalletHistory.length > 0 && <>
                            {this.state.WalletHistory.map((list, index) => {
                            return <tr>
                              <th scope="row">{index+1}</th>
                              <td class="brand-img">{list.type}</td>
                              <td>{list.amount}</td>
                              <td class="url-sec">{list.txn_fee}</td>
                              <td class="status-sec">{list.total_amount}</td>
                              <td class="date-sec">{list.message}</td>
                              <td class="date-sec">{moment(list.created_at).format("YYYY-MM-DD")}</td>
                            </tr>
                            
                             })}
                             </>}
         
                             {this.state.WalletHistory.length === 0 && <>
                                 <tr>
                                     <td colSpan="100%">No Records found</td>
                                 </tr>
                             </>}
                          </tbody>
                        </table>
                         
                    </div>
                   
                  </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default WalletHistory;