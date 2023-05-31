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

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class ReferEarn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            allBrands:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allBrands:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getBrand()
        this.getLoginUserDetail()
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

    getBrand = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/brand`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allBrands:res.data.data.category
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

   
    

    render() {
        return <>
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Refer And Earn</h1>
                 </div>
                  <div class="refer-main-block">
                     <ul class="inner-refer-sec">
                       <li class="image">
                         <img src={require("assets/img/Refer-and-Earn-Offers.png")} alt="dashboard"/>
                       </li>
                       <li class="text">
                         <h1>Refer Friend & Earn</h1>
                         <p>Ask your Friend to signup with your referal code and make an intial payment.Once done, you and your friend earn 50 Coins</p>
                       </li>
                       <li class="code">
                         <h3>Your Referral Code</h3>
                         <p>{this.state.User.referal_code}</p>
                       </li>
                       {/* <li class="btn">
                         <a href="#">Refer Now</a>
                       </li> */}
                     </ul>
                  </div>
                  
              </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default ReferEarn;