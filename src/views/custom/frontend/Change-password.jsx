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
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            confirm_password: "",
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
            [e.target.name]: e.target.value
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

    ChangePassword = (e) => {
        e.preventDefault();
        if (this.state.password === "" || this.state.password === undefined) {
            this.notify("error", "Please enter password.");
            return false;
        }
        if (this.state.confirm_password === "" || this.state.confirm_password === undefined) {
            this.notify("error", "Please enter confirm password.");
            return false;
        }
        if (this.state.password != this.state.confirm_password) {
            this.notify("error", "Confirm password not match.");
            return false;
        }
        var data = {
            password:this.state.password,
            confirm_password:this.state.confirm_password
        }
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/admin/auth/change-password`,{data:data}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    loading:false,
                    show_list:true,
                    // ShowDatatable:false
                })
                this.notify("success", "Password change successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
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
        <NotificationAlert ref={this.notificationAlert} />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Change Your Password</h1>
                 </div>
                  <div class="refer-main-block" id="change-pass-main">
                     <ul class="inner-refer-chg-pass">
                       <li class="image">
                         <img src={require("assets/img/ResetPassword-person.png")} alt="dashboard"/>
                       </li>
                       <li class="text">
                         <h1>Change Your Password</h1>
                        
                       </li>
                       <li class="inner-form">
                          <form action="">
                            <input type="password" id="new-pass" name="password" onChange={(e) => { this.inputChange(e) }} value={this.state.password} placeholder="New Password"/><br></br>

                            <input type="password" name="confirm_password" id="confirm-pass" onChange={(e) => { this.inputChange(e) }} value={this.state.confirm_password} placeholder="Confirm New Password"/><br></br>
                            <input type="submit" onClick={(e) => { this.ChangePassword(e) }} value="Change My Password" id="submit"/>
                          </form> 
                        </li>
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

export default ChangePassword;