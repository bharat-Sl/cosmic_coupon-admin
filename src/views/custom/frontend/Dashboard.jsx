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
class Dashboard extends React.Component {
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
            allOffer:[],
            allViewDeal:[],
            storeArr:[],
            allBrands:[],
            allTask:[],
            CompletedTask:"",
            WalletAmount:0
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getBrand()
        this.getAllData()
        this.getLoginUserDetail()
        this.getOffer()
        this.getUserCoupon()
        this.getViewDeal()
        this.getTodayTask()
        if(!sessionStorage.getItem("_access")){
            window.location.href="/"
        }
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
       
       
        
    }

    getTodayTask = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/task`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allTask:res.data.data.category
                })
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    } // }

    getViewDeal = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/view-deal`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    allViewDeal:res.data.data.category
                })
                console.log('allViewDeal',this.state.allViewDeal)
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getUserCoupon = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/user-coupon`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    allCoupon:res.data.data.category,
                })
                console.log("allcoupoon",this.state.allCoupon)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getOffer = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/view-offer`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allOffer:res.data.data.category
                })
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    

    getAllData = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/allData`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("promo",res.data);
            // setTimeout(() => {
                    this.setState({
                        loading:false,
                        showCat:true,
                        CompletedTask:res.data.CompletedTask,
                        WalletAmount:res.data.WalletAmount ? res.data.WalletAmount.amount : 0.00
                    })
                
            // }, 200);
            // console.log("iser0",this.state.totalUser)
      
        }, err => {
            console.log("error", err.response)
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

    OpenOfferDetail = (e, id) => {
        if(sessionStorage.getItem("_access")){
          sessionStorage.removeItem("store_id")
            sessionStorage.removeItem("brand_id")
            sessionStorage.removeItem("cat_id")
          sessionStorage.setItem("offer_id",id)
          window.open("/offer-detail", "_self")
          window.open("/view-offer", "_blank")
        }else{
          this.setState({
            show_login_modal: true,
          })
        }
      }
   
    

    render() {
        
        return <>
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
                <div class="col-md-8" id="middle-sec">
               {/* <div class="row" id="search-sec">
                    <div class="col-md-6">
                        <div class="search-bar">
                        <input type="text" placeholder="Search.." name="search"/><i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-md-6" id="user-detail">
                        <a href="#">
                         <span>My Account | Logout | <img src={require("assets/img/india-flag-icon-16.png")} class="user-logout-sec"/> INR</span>
                        </a>
                    </div>
                </div> */}
                <div class="upper-nav">
                    <ul class="nav">
                    <li class="right"><a href="#">Dashboard</a></li>
                    {/* <li class="left"><a href="#">20 Sep 2019, Friday<i class="fa fa-search" aria-hidden="true"></i></a></li> */}
                    </ul>
                </div>
                    {/*<div class="row" id="middle-content-area">
                    <div class="col-md-6">
                        <h1>Welcome Back Anna!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                    </div>
                        <div class="col-md-6">
                        <div class="image-middle">
                        <img src={require("assets/img/offer.png")} alt="dashboard"/>
                        <span class="cross-sign">X</span>
                        </div>
                        </div>
                    </div>*/}

                <div class="row" id="dashboard-content">
                  <div class="col-md-4">
                    <ul class="inner-content" id="complete-task-sec">
                      <li class="right">
                       <img src={require("assets/img/complete_task.png")} alt="dashboard"/>
                      </li>
                      <li class="left">
                        <h1>Completed Task</h1>
                        <p>{this.state.CompletedTask}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-4" id="wallet-amount-sec">
                      <ul class="inner-content">
                      <li class="right">
                       <img src={require("assets/img/wallet-new.png")} alt="dashboard"/>
                      </li>
                      <li class="left">
                        <h1>Wallet Amount</h1>
                        <p><i class="fa fa-inr" aria-hidden="true"></i> {this.state.WalletAmount}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-4">
                     <ul class="inner-content" id="refer-n-earn-sec">
                      <li class="right">
                       <img src={require("assets/img/refer.png")} alt="dashboard"/>
                      </li>
                      <li class="left">
                        <h1>Refer & Earn </h1>
                        <p>{this.state.User.referal_code != 'false' ? this.state.User.referal_code : ""}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                   {/*<div class="row" id="middle-sec-heading">
                       <div class="col-md-5">
                         <h1>Latest Brand</h1>
                       </div>
                       <div class="col-md-7">
                       <h1>Lorem Ispum</h1>
                </div>
                   </div>*/}
                    <div class="row" id="middle-graph">
                    <div class="col-md-5">
                        <ul class="brand-trends">
                        <li class="first"><h1>Latest Brand</h1></li>
                        {/* <li class="second">View All</li> */}
                        </ul>
                        {this.state.allBrands.length > 0 && <>
                            {this.state.allBrands.map((list, index) => {
                             return   <ul class="brand-trends-img">
                                <li class="first"><img src={this.state.image_url+'brand/'+list.image} alt="dashboard"/></li>
                                <li class="second">{list.brand_name}</li>
                                </ul>
                            })}
                        </>}
                        
                    </div>
                    <div class="col-md-7">
                        <div class="overview-whole-sec">
                            <h1>Saved Detail</h1>
                        <div class="row first-block" id="overview-boxes">
                            <div class="col-md-6">
                            <div class="icon-box" id="offer-saved">
                                <ul>
                                <li class="last"><img src={require("assets/img/offer_saved.png")} alt="dashboard"/></li>
                                <li class="right"><p><a href="/offer">Offer Saved</a></p></li>
                                <li class="left"><p class="number">{this.state.allOffer ? this.state.allOffer.length: "0"}</p></li>
                                </ul>
                            </div> 
                            </div>
                            <div class="col-md-6">
                            <div class="icon-box" id="today-task">
                                <ul>
                                <li class="last"><img src={require("assets/img/today_task.png")} alt="dashboard"/></li>
                                <li class="right"><p><a href="/today-task">Today Task</a></p></li>
                                <li class="left"><p class="number">{this.state.allTask ?  this.state.allTask.length : "0"}</p></li>
                                </ul>
                            </div> 
                            </div>
                         </div>
                        
                        
                        <div class="row" id="overview-boxes">
                            <div class="col-md-6">
                            <div class="icon-box" id="coupon-saved">
                                <ul>
                                <li class="last"><img src={require("assets/img/coupon_saved.png")} alt="dashboard"/></li>
                                <li class="right"><p><a href="/user-coupon">Coupon Saved</a></p></li>
                                <li class="left"><p class="number">{this.state.allCoupon ? this.state.allCoupon.length : "0"}</p></li>
                                </ul>
                            </div> 
                            </div>
                            <div class="col-md-6">
                            <div class="icon-box" id="deal-saved">
                                <ul>
                                <li class="last"><img src={require("assets/img/deal_saved.png")} alt="dashboard"/></li>
                                <li class="right"><p><a href="/user-deal">Deal Saved</a></p></li>
                                <li class="left"><p class="number">{this.state.allViewDeal ? this.state.allViewDeal.length : "0"}</p></li>
                                </ul>
                            </div> 
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                        

                    <div class="offer-box">
                        <ul class="nav">
                        <li class="right"><a href="#">Your Offer</a></li>
                        {/* <li class="left"><a href="#">More <img src={require("assets/img/arrow-black.png")} alt="dashboard"/></a></li> */}
                        </ul>
                        <div class="row">
                        {this.state.allOffer && this.state.allOffer.length > 0 && <>
                        {this.state.allOffer.map((list, index) => {
                            if(index<3){
                      return <div class="col-md-4">
                          <a href="javascript:void()" onClick={(e) => { this.OpenOfferDetail(e, list.offer_id._id) }}>
                            <ul class="icon-box">
                                <li class="right-side">
                                <p>{list.offer_id.discount}%</p>
                                </li>
                                <li class="left-side">
                                <p class="small">{list.offer_id.name}</p>
                                <p class="big">{list.offer_id.description} 
                                {/* <img src={require("assets/img/arrow-white.png")} alt="dashboard"/> */}
                                </p>
                                </li>
                            </ul>
                            </a>
                            </div>
                            }
                             })}
                             </>}
             
                             {this.state.allOffer && this.state.allOffer.length === 0 && <>
                                 <tr>
                                     <td colSpan="100%">No Records found</td>
                                 </tr>
                             </>}
                        </div>
                    </div>
                </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default Dashboard;