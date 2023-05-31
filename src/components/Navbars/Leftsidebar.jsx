/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";

class Leftsidebar extends React.Component {
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
            allBrands:[],
            WalletAmount:""
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();
    componentDidMount = () => {
        this.getLoginUserDetail()
        this.getWalletAmount()
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
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
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
        
        // setTimeout(() => {
        //     this.UploadImage(file)
        // }, 100);
        
      }

      onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                token: sessionStorage.getItem('_access')
            }
        };
        Axios.post(`${this.state.url}/front/auth/update/user-image`,formData,config, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            this.notify("success", "Image updated successfully");
            
        }, err => {
            console.log("error", err.response)
        })
      }

      ReedemPoint = (e) => {
          var data ={
              type:"Redeem Point",
          }
        Axios.post(`${this.state.url}/front/auth/redeem/point`,data, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            this.getLoginUserDetail()
            this.notify("success", "Coin Redeem successfully");
            setTimeout(() => {
                window.location.reload()
            }, 2000);
            
        }, err => {
            console.log("error", err.response)
        })
      }
  render() {
    return (
        <div class="col-md-2" id="logout-sec">
            <NotificationAlert ref={this.notificationAlert} />
                    <div class="logout-sidebar">
                     <h1>My Profile</h1>
                    {/* <ul class="nav-logout">
                        <li class="right">
                        <a href="#">Logout</a>
                        </li>
                        <li class="left">
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </li>
                    </ul> */}
                    <ul class="image-sidebar">

                    {!this.state.imagePreviewUrl && <>
                    <li>
                    {!this.state.User.profile_picture && <>
                        <img src={require("assets/img/girl2.png")} alt="dashboard"/><i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </>}

                    {this.state.User.profile_picture && <>
                        <img  src={this.state.image_url+'users/'+this.state.User.profile_picture} alt="dashboard"/><i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </>}
                    </li>
                    </>}
                        {this.state.imagePreviewUrl && <>
                        <li><img src={this.state.imagePreviewUrl} alt="dashboard"/><i class="fa fa-plus-circle" aria-hidden="true"></i></li>
                        <form onSubmit={this.onFormSubmit}>
                        <button class="form-control" type="submit">change Image</button>
                        </form>
                        </>}

                        <input type="file" class="choose-file" onChange={(e)=>this._handleImageChange(e)}></input>
                        <li>
                        <p>{this.state.User.name}</p>
                        {/* <p class="small">Student</p> */}
                        </li>
                    </ul>

                    <ul class="wallet-coins">
                       <a href="/wallet-history">
                        <li class="para">
                        <p>
                        <img src={require("assets/img/coin.png")} alt="coin"/>  <a href="javascript:void()" onClick={(e) => this.ReedemPoint(e)}><i class="" aria-hidden="true"></i> {this.state.User.point}</a> 
                           <span> <a href="javascript:void()" onClick={(e) => this.ReedemPoint(e)}>Redeem</a> </span>
                        </p>
                        </li>
                      </a>
                    </ul>

                    {/* <div class="whole-reminder-sec">
                    <ul class="reminder-sec">
                        <p>Notification<img src={require("assets/img/notification.png")} alt="dashboard"/></p>
                        <li class="right">
                          <img src={require("assets/img/blue-env.png")} alt="dashboard"/>
                        </li>
                        <li class="left">
                        <p>Lorem Ispum Test</p>
                        <p class="date">24 Sep 2019,Friday</p>
                        </li>
                    </ul>
                    <ul class="reminder-sec">
                        <li class="right">
                            <img src={require("assets/img/blue-env.png")} alt="dashboard"/>
                        </li>
                        <li class="left">
                        <p>Lorem Ispum Test</p>
                        <p class="date">24 Sep 2019,Friday</p>
                        </li>
                    </ul>
                    </div> */}
                    {/*<ul class="pay-sec">
                       <a href="/wallet-history">
                        <li class="image"><img src={require("assets/img/icon-wallet-right.png")} alt="dashboard"/></li>
                       <li class="para">
                        <p>
                            Wallet Amount
                        </p>
                         {/*<a href="javascript:void()" onClick={(e) => this.ReedemPoint(e)}>Redeem Coin</a>
                        </li>
                        <li class="btn" id="button-sec"><a href="#"><i class="fa fa-inr" aria-hidden="true"></i>{this.state.WalletAmount}</a></li>
                      </a>
                    </ul> */}

                    <ul class="pay-sec-new">
                       <a href="/wallet-history">
                          <li class="left"><img src={require("assets/img/wallet-blue.png")} alt="dashboard"/></li>
                          <li class="right">
                            <p>Wallet Amount</p>
                            <a href="#"><i class="fa fa-inr" aria-hidden="true"></i>{this.state.WalletAmount}</a>
                          </li>  
                       </a>
                    </ul>

                    <ul class="notication-section-whole">
                        <ul class="notification-heading">
                            <li class="left"><h3>Notification</h3></li>
                            {/*<li class="right"><p>View All</p></li>*/}
                        </ul>
                      {/*<div class="today-sec">
                        <h3 class="heading">Today</h3>
                        <ul class="notification-inner-sec" id="today-portion">
                           <li class="left"><img src={require("assets/img/anazon.png")} alt="dashboard"/></li>
                            <li class="right">
                                <h4>Amazon Top Deals</h4>
                                <p>Upto Rs.1000 Rewards Shop Now!</p>
                                <h6>2 Hours ago</h6>
                            </li>
                        </ul>
                        <ul class="notification-inner-sec" id="today-portion">
                           <li class="left"><img src={require("assets/img/anazon.png")} alt="dashboard"/></li>
                            <li class="right">
                                <h4>Amazon Top Deals</h4>
                                <p>Upto Rs.1000 Rewards Shop Now!</p>
                                <h6>2 Hours ago</h6>
                            </li>
                        </ul>
                       </div> 
                      
                       <div class="today-sec">
                        <h3 class="heading">Yesterday</h3>
                        <ul class="notification-inner-sec" id="today-portion">
                           <li class="left"><img src={require("assets/img/anazon.png")} alt="dashboard"/></li>
                            <li class="right">
                                <h4>Amazon Top Deals</h4>
                                <p>Upto Rs.1000 Rewards Shop Now!</p>
                                <h6>2 Hours ago</h6>
                            </li>
                        </ul>
                       </div> */}
                       <div class="no-notification">
                       <img src={require("assets/img/no_notification.png")} alt="dashboard"/>
                       </div>
                    </ul>

                    {/*<ul class="pay-sec">
                       <a href="/wallet-history">
                        <li class="image"><img src={require("assets/img/icon-wallet-right.png")} alt="dashboard"/></li>
                        <li class="para">
                        <p>
                            Wallet Coin
                        </p>
                        </li>
                        <li class="btn" id="button-sec"><a href="#"><i class="" aria-hidden="true"></i>{this.state.User.point}</a></li>
                      </a>
                    </ul>*/}
                    </div>
                </div>
    );
  }
}


export default Leftsidebar;
