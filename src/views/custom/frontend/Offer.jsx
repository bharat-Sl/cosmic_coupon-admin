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
class Offer extends React.Component {
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
            allOffer:[],
            TodayCmpTask:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
      setInterval(async () => {
        this.getLoginUserDetail()
      },4000)
        this.getOffer()
        
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

    getLoginUserDetail = () => {
        this.setState({
            loading:true
        })
        var completedTask=[]
        Axios.get(`${this.state.url}/front/auth/get/login-user`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
          if(res.data.data.compltedTodayTask){
            for(let k of res.data.data.compltedTodayTask){
              completedTask.push(+k.offer_id)
            }
          }
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    User:res.data.data.category,
                    TodayCmpTask:completedTask
                    
                })
                console.log("brands",this.state.TodayCmpTask)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    openTask = (e, url,task_id,category_id) => {
      sessionStorage.setItem("task_id",task_id)
      sessionStorage.setItem("cat",category_id)
      window.open(url, '_blank');
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
      var coupn_setting = {
        className: "coupon-slider",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
         responsive: [
          {
          breakpoint: 1140,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 830,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
         {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
      }
        return <>
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
                 
                {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><img src={require("assets/img/store-active.png")} alt="logo"/><p>Top Online Stores</p></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><img src={require("assets/img/recharge-service-active.png")} alt="logo"/><p>Mobiles & Electronics</p></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><img src={require("assets/img/role-active.png")} alt="logo"/><p>Clothing & Shoes</p></a>
  </li>
</ul> */}
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <div class="hot-coupon-offer-sec">
                  <h1>Hot Offers Of The Day</h1>
                  <div class="row">
                  {this.state.allOffer && this.state.allOffer.length > 0 && <>
                  {this.state.allOffer.map((list, index) => {
                      return <div class="col-md-3">
                      <a href="javascript:void()" onClick={(e) => { this.OpenOfferDetail(e, list.offer_id._id) }}>
                        <div class="inner-offer-sec">
                          <img src={this.state.image_url+'offer/'+list.offer_id.image} alt="logo"/>
                          <p>Prime Day Sale – Upto {list.offer_id.discount}% on {list.offer_id.name}</p>
                          <a href="#">Get This Offer</a>
                        </div>
                      </a>
                    </div>
                     
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
  {/* <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <div class="hot-coupon-offer-sec">
                  <h1>Hot Coupons & Offers Of The Day</h1>
                  <div class="row">
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/anazon.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/anazon.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Coupon</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/paytm.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/paytm.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
  </div> */}
  {/* <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
    <div class="hot-coupon-offer-sec">
                  <h1>Hot Coupons & Offers Of The Day</h1>
                  <div class="row">
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/anazon.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/anazon.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Coupon</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/paytm.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-3">
                      <a href="#">
                        <div class="inner-offer-sec">
                          <img src={require("assets/img/paytm.png")} alt="logo"/>
                          <p>Prime Day Sale – Upto 70% Block Buster Deals + Extra 10% HDFC Discount (For Prime Members Only)</p>
                          <a href="#">Get This Deal</a>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
  </div> */}
</div>
                  
                 {/* <div id="offer-table">
                       <table class="table">
                          <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Icon</th>
                                <th scope="col">Category</th>
                                <th scope="col">Store</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Point</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Expire Date</th>
                                <th scope="col">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.state.allOffer.length > 0 && <>
                                {this.state.allOffer.map((list, index) => {
                                    if(list.status === 'active'){
                                    return <tr key={"trry" + index}>
                                        <td>{index+1}</td>
                                        <td>{list.name}</td>
                                        <td>{list.description}</td>
                                        <td><img height="5%" src={this.state.image_url+'offer/'+list.image}/></td>
                                        <td>{list.category_id !=null ? list.category_id.cat_name : "--"}</td>
                                        <td>{list.store_id !=null ? list.store_id.name : "--"}</td>
                                        <td>{list.brand_id !=null ? list.brand_id.brand_name : "--"}</td>
                                        <td>{list.point}</td>
                                        <td>{moment(list.start_date).format("YYYY-MM-DD")}</td>
                                        <td>{moment(list.expire_date).format("YYYY-MM-DD")}</td>
                                        <td><a href={list.link} target="_blank">Click</a>
                                        </td>

                                    </tr>
                                    }
                                })}
                            </>}

                            {this.state.allOffer.length === 0 && <>
                                <tr>
                                    <td colSpan="100%">No Records found</td>
                                </tr>
                            </>}
                        </tbody>
                        </table>
                         
                    </div> */}

                 
               
            </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default Offer;