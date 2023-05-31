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
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import Axios from "axios";
import NotificationAlert from "react-notification-alert"
import { Modal } from "react-bootstrap";
import ModernDatepicker from 'react-modern-datepicker';
import * as moment from "moment";
import Header from "components/Navbars/Frontheader";
import Footer from "components/Navbars/Frontfooter";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Slider from "react-slick";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
const $ = window.jQuery;

class Exclusive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allDeal:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            image:"",
            login_otp:"",
            type:"",
            link:"",
            title:"",
            category_id:"",
            brand_id:"",
            store_id:"",
            price:"",
            discount:"",
            discount_type:"",
            allOffer:[],
            show_list:true,
            ShowDatatable:true,
            allCategories:[],
            allStore:[],
            allCoupon:[],
            allBrandList:[],
            ExclusiveSlider:[],
            CouponCode:'',
            // value: '',
             copied: false,
             description:"",
             discount:"",
             name:"",
             link:"",
             image:""
        }
       
    }
    notificationAlert = React.createRef();
    componentDidMount = () => {
      this.getExclusiveSlider()
       this.getAllCategory()
        this.getOffer()
        this.getAllCoupon()
        this.getDeal()
        this.changeCurrency()
        
    }

    changeCurrency = () => {
      // var baseAmt = 100;
      Axios.get(`https://api.exchangeratesapi.io/latest?base=${sessionStorage.getItem("currency")}`, {
        
    }).then(res => {
      //   setTimeout(() => {
            console.log(res)
            this.setState({
              rates: res.data['rates'],
              currencies: Object.keys(res.data['rates']).sort(),
              
            })
          //   window.location.reload();
          //   console.log("Number.parseFloat(baseAmt",Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)) 
          //   return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
          
      //   }, 100);
        
    }, err => {
        console.log("error", err.response)
    })
    }

  convertAmount(baseAmt){
      return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
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

    

    onChange = ({target: {value}}) => {
        this.setState({value, copied: false});
      };
    
      onClick = ({target: {innerHTML}}) => {
        console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
      };

    onCopy = () => {
        this.setState({copied: true});
      };

      getOffer = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/offer`, {
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

    getDeal = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/deal`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
              
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeal:res.data.data.category,
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getExclusiveSlider = () => {
      this.setState({
          loading:true
      })
      Axios.get(`${this.state.url}/front/auth/get/exclusive-slider`, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(res => {
          setTimeout(() => {
              this.setState({
                  loading:false,
                  showCat:true,
                  ExclusiveSlider:res.data.data.category
              })
          }, 100);
          
      }, err => {
          console.log("error", err.response)
      })
      
  }

    getAllCategory = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/all-category`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allCategories:res.data.data.category
                })
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllCoupon = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/coupon`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
              const result = [];
                const map = new Map();
                for (const item of res.data.data.category) {
                    if(!map.has(item.category_id._id)){
                        map.set(item.category_id._id, true);    // set any value to Map
                        result.push(item.category_id);
                    }
                }
                this.setState({
                    loading:false,
                    showCat:true,
                    allCoupon:res.data.data.category,
                    CouponCat:result
                })
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

      Login = (e) => {
        this.showLoginModal(true);
        this.showSignupModal(false);
      }

      showLoginModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            this.setState({
                name: "",
                profile_picture:"",
                mobile:"",
                created_at:""
            })
        }
        this.setState({
          show_login_modal: show,
        })
      }
      
      Signup = (e) => {
        this.showLoginModal(false)
        this.showSignupModal(true);
      }

      showSignupModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            this.setState({
                name: "",
                profile_picture:"",
                mobile:"",
                created_at:""
            })
        }
        this.setState({
          show_signup_modal: show,
      
        })
      }
      
      showOtpModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            this.setState({
                name: "",
                profile_picture:"",
                mobile:"",
                created_at:""
            })
        }
        this.setState({
          show_otp_modal: show,
      
        })
      }

      onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
          this.notify("error", "Please enter name.");
          return false;
        }
        if (this.state.mobile === "" ) {
          this.notify("error", "Please enter mobile number.");
          return false;
        }
        var data = {
          name: this.state.name,
          mobile:this.state.mobile,
          upline_code:this.state.upline_code ? this.state.upline_code : null
          
      }
      console.log(data)
          Axios.post(`${this.state.url}/front/auth/signup`,{data:data})
          .then((resp) => {
            console.log(resp)
                  if (resp.data.success === true) {
                    this.showSignupModal(false);
                  this.setState({
                    show_otp_modal:true,
                      mobile:resp.data.data.mobile,
                      otp:resp.data.data.otp,
                      name:resp.data.data.name
                      // ShowDatatable:false
                  })
                  // this.notify("success", "User singnup successfully");
              } else {
                  this.notify("error", resp.data.message);
              }
          }, err => {
              this.setState({
                  loading: false
              })
          })
      }

      showLoginOtpModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            this.setState({
                name: "",
                profile_picture:"",
                mobile:"",
                created_at:""
            })
        }
        this.setState({
          show_otp_login_modal: show,
        })
      }
      
      onFormSubmitLogin = (e) => {
        e.preventDefault();
        if (this.state.mobile === "" ) {
          this.notify("error", "Please enter mobile number.");
          return false;
        }
        var data = {
          mobile:this.state.mobile
      }
          Axios.post(`${this.state.url}/front/auth/login`,{data:data})
          .then((resp) => {
            console.log(resp)
                  if (resp.data.success === true) {
                    this.showSignupModal(false);
                    this.showLoginModal(false);
                    if(resp.data.data.user.status == 'pending'){
                      this.notify("error", "Your request is pending from admin approval please contact adminstrator");
                    }else if(resp.data.data.user.status == 'inactive'){
                      this.notify("error", "Your account in active by admin please contact administrator");
                    }else{
                      this.setState({
                        show_otp_login_modal:true,
                        login_otp:resp.data.data.user.otp,
                        mobile:resp.data.data.user.mobile
                      })
                    
                    }
                    
              } else {
                  this.notify("error", "User Not Found");
              }
          }, err => {
              this.setState({
                  loading: false
              })
          })
      }
      
      VerifyLoginOTP= (e) => {
        e.preventDefault()
        var data = {
         mobile:this.state.mobile,
         otp:this.state.match_otp,
      }
      if(this.state.match_otp == undefined || this.state.match_otp == ""){
        this.notify("error", "Please enter otp.");
          return false;
      }
      
        Axios.post(`${this.state.url}/front/auth/verify-login-otp`,{data:data})
         .then((resp) => {
           console.log(resp)
          //  return false;
                 if (resp.data.success === true) {
                   this.showLoginModal(false);
                   this.showLoginOtpModal(false)
                 this.setState({
                  show_otp_login_modal:false,
                  loggedIn:resp.data.data.token,
                 })
                   sessionStorage.setItem("_access", resp.data.data.token);
                    this.notify("success", "User logged successfully");
                    window.location.href = '/dashboard';
                 
             } else {
                 this.notify("error", "Wrong OTP");
             }
         }, err => {
             this.setState({
                 loading: false
             })
         })
      }
      
      VerifyOtp= (e) => {
         e.preventDefault()
         var data = {
          name: this.state.name,
          mobile:this.state.mobile,
          otp:this.state.otp,
          registered_via:"web",
          upline_code:this.state.upline_code ? this.state.upline_code : null
      }
      
         Axios.post(`${this.state.url}/front/auth/verify-otp`,{data:data})
          .then((resp) => {
            console.log(resp)
                  if (resp.data.success === true) {
                    this.showOtpModal(false);
                    this.showSignupModal(false);
                  this.setState({
                      name:"",
                      mobile:"",
                      otp:""
                      // ShowDatatable:false
                  })
                  this.notify("success", "User singnup successfully");
                  
              } else {
                  this.notify("error", "Wrong OTP");
              }
          }, err => {
              this.setState({
                  loading: false
              })
          })
      }

      handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }

      openCoupon = (e,id) => {
          if(sessionStorage.getItem("_access")){
            sessionStorage.setItem('coupon_id',id);
            window.open("/coupon-detail", '_self');
            Axios.post(`${this.state.url}/front/auth/save-coupon`,{coupon_id:id}, {
                headers: {
                    token: sessionStorage.getItem('_access')
                }
            }).then(res => {
            }, err => {
                console.log("error", err.response)
            })
        }else{
            this.setState({
                show_login_modal: true,
              })
        }
      }

      OpenCategoryPage = (e, cat_id) => {
        var newPageUrl = 'category-detail';
        sessionStorage.setItem("cat_id",cat_id)
        window.open(newPageUrl, "_self")
      }

      openDetailPage = (e, id) => {
        sessionStorage.setItem("store_id",id)
      }

      
      openPage = (e, type, type_id) => {
        sessionStorage.removeItem("offer_id")
        if(type === 'store'){
          sessionStorage.removeItem("cat_id")
          sessionStorage.removeItem("brand_id")
          sessionStorage.setItem("store_id",type_id)
        }else if(type === 'brand'){
          sessionStorage.removeItem("cat_id")
          sessionStorage.removeItem("store_id")
          sessionStorage.setItem("brand_id",type_id)
        }else if(type === 'category'){
          sessionStorage.removeItem("store_id")
          sessionStorage.removeItem("brand_id")
          sessionStorage.setItem("cat_id",type_id)
        }
        
      }

      gmailLogin = (data) => {
        Axios.post(`${this.state.url}/front/auth/gmail-login`,{data:data})
              .then((resp) => {
                // console.log(resp); return false
                  if (resp.data.success === true) {
                    this.setState({
                      loggedIn:resp.data.data.token
                    })
                    sessionStorage.setItem("_access", resp.data.data.token);
                  this.notify("success", "User logged successfully");
                  window.location.href = '/dashboard';
                      
                  } else {
                      this.notify("error", resp.data.message);
                  }
              }, err => {
                  this.setState({
                      loading: false
                  })
              })
      }
      facebookLogin = (data) => {
        Axios.post(`${this.state.url}/front/auth/facebook-login`,{data:data})
              .then((resp) => {
                // console.log(resp); return false
                  if (resp.data.success === true) {
                    this.setState({
                      loggedIn:resp.data.data.token
                    })
                    sessionStorage.setItem("_access", resp.data.data.token);
                  this.notify("success", "User logged successfully");
                  window.location.href = '/dashboard';
                      
                  } else {
                      this.notify("error", resp.data.message);
                  }
              }, err => {
                  this.setState({
                      loading: false
                  })
              })
      }
  render() {
    const responseFacebook = (response) => {
      console.log("facebook",response);
      var data = {
        name: response['name'],
        social_id:response['userID'],
        profile_picture: null,
        email: null,
      }
      if(response['userID']){
        this.facebookLogin(data);
        }
    }
    const responseGoogle = (response) => {
      console.log("gmail responsasdfsdfe",response['profileObj']);
      var data = {
        name: response['profileObj'].givenName+' '+response['profileObj'].familyName,
        social_id:response['profileObj'].googleId,
        profile_picture:response['profileObj'].imageUrl ? response['profileObj'].imageUrl : null,
        email:response['profileObj'].email ? response['profileObj'].email : null,
        
    }
    console.log(data)
    if(response['profileObj'].googleId){
      this.gmailLogin(data);
    }
    
    }
    var settings = {
      className: "exclusive-slider coupon",
       dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
          responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
       {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
       {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
        };

    var coupn_setting = {
        className: "coupon-slider",
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
           responsive: [
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
      };
    return  <>
    {this.state.loading && <>
        <div class="loading">Loading&#8230;</div>
        </> }
      <Header  />
        <div className="">
        <NotificationAlert ref={this.notificationAlert} />
        <div class="exclusive-offer-banner">
        <Slider {...settings}>
            

            {this.state.ExclusiveSlider.map((slide, index) => {
              var cat_type = "";
              if(slide.type == 'brand'){
                cat_type = '/brand-detail';
              }else if(slide.type == 'category'){
                cat_type = '/category-detail';
              }else if(slide.type == 'store'){
                cat_type = '/store-detail';
              }else{
                cat_type = "";
              }
           return  <div class="exclusive-inner-part">
             <a href={cat_type} onClick={(e) => { this.openPage(e, slide.type, slide.type_id) }}>
            <img src={this.state.image_url+'exclusive-slider/'+slide.image} alt=""></img>
            {/*<h1 class="heading">{slide.text}</h1>*/}
            <div class="row">
            
            <div class="col-md-12">
                <h1><span class="number">{slide.text}</span></h1>
                {/* <p>and find your Store</p> */}
            </div>
            {/* <div class="col-md-4">
                <h1><span class="number">1</span>Store with coupon</h1>
                <p>and find your Store</p>
            </div>
            <div class="col-md-4">
                <h1><span class="number">1</span>Store with coupon</h1>
                <p>and find your Store</p>
            </div> */}
            </div>
            {/* <a href="#" class="btn">Learn More</a>  */}
            </a>
            </div>
            
             })}
             </Slider>
        </div>

        <div class="exclusive-offer-sec">
    <div class="container">
      <h1>Exclusive Offer</h1>
      <div class="row">
      {this.state.allOffer.length > 0 && <>
        {this.state.allOffer.map((list, index) => {
            if(list.exclusive === 'yes'){
            return <div class="col-md-2">
         <a href="javascript:void()" onClick={(e) => { this.OpenOfferDetail(e, list._id) }}>
            <ul class="inner-offer-sec">
              <li>
                <a href="#">
                  <img src={this.state.image_url+'offer/'+list.image} class="d-inline-block align-top"alt=""/>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>{list.name} Offer</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3>Discount: {list.discount}%</h3>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>View Detail</p>
                </a>
              </li>
            </ul>
          </a>
        </div>
            }
        })}
        </>}

        {this.state.allOffer.length === 0 && <>
            <p>No Record Found</p>
        </>}
      </div>
    </div>
  </div>

  <div class="exclusive-coupon-sec">
   <div class="container">
     <h1>Exclusive Coupon</h1>
     <div class="row">
     {this.state.allCoupon.length > 0 && <>
    {this.state.allCoupon.map((list, index) => {
        if(list.exclusive === 'yes'){
        return <div class="col-md-3">
        <a href="javascript:void()" target="_blank" onClick={(e) => { this.openCoupon(e, list._id) }} class="exclusive-coupon">
        <ul class="exclusive-coupon-inner">
          <li><a href="#"><img src={this.state.image_url+'coupon/'+list.image} class="d-inline-block align-top"alt=""/></a></li>
          <li><a href="#"><p>{list.name}</p></a></li>
          <li><a href="#"><h3>{list.discount}%</h3></a></li>
          <li><a href="#"><h4>{list.description}</h4></a></li>
          <li><a href="javascript:void()" class="offer-btn">View Coupon</a></li>
        </ul>
        </a>
      </div>
       }
    })}
    </>}

    {this.state.allCoupon.length === 0 && <>
        <p>No Record Found</p>
    </>}
     </div>
   </div>
 </div>

 <div class="exclusive-categories-sec">
     <div class="container">
       <div class="row">
         <div class="col-md-3">
           <h1>Exclusive Category</h1> 
         </div>
         <div class="col-md-9">
           {/* <div class="row" id="deal-slider"> */}
           <Slider {...coupn_setting}>
           {this.state.allCategories.map((slide, index) => {
               if(slide.exclusive === 'yes'){
                return <div class="col-md-12">
              <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, slide._id) }}>
                <ul class="deal-slider-sec">
                  <li><a href="#"><h1>{slide.cat_name}</h1></a></li>
                  <li class="image-area">
                    <a href="#" class="deal-background"><img src={this.state.image_url+'category/'+slide.image} class="d-inline-block align-top"alt=""/></a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>View Detail</h3>
                      <p>{slide.description}</p>
                    </a>
                  </li>
                </ul>
              </a>
             </div>
               }
               })}
             </Slider>
           {/* </div> */}
         </div>
       </div>
     </div>
  </div>

  <div class="exclusive-coupon-sec">
   <div class="container">
     <h1>Exclusive Deal</h1>
    {/* <div class="row">
     {this.state.allDeal.length > 0 && <>
    {this.state.allDeal.map((list, index) => {
        if(list.exclusive === 'yes'){
        return <div class="col-md-3">
        <a href="/store-detail" onClick={(e) => { this.openDetailPage(e, list.store_id._id) }} class="exclusive-coupon">
        <ul class="exclusive-coupon-inner">
          <li><img src={this.state.image_url+'deal/'+list.image} class="d-inline-block align-top"alt=""/></li>
          <li><p>{list.title}</p></li>
          <li><h3>{list.discount}%</h3></li>
          <li><h4>{list.description}</h4></li>
          <li><a class="offer-btn">View Deal</a></li>
        </ul>
        </a>
      </div>
       }
    })}
    </>}

    {this.state.allCoupon.length === 0 && <>
        <p>No Record Found</p>
    </>}
     </div>*/}
      <div class="row">
      {this.state.allDeal.length > 0 && <>
    {this.state.allDeal.map((list, index) => {
        if(list.exclusive === 'yes'){
          var discount_type = "";
            if(sessionStorage.getItem("currency") == 'INR'){
              discount_type = "₹"
            }else{
              discount_type = sessionStorage.getItem("currency");
            }
        return <div class="col-md-2">
          <a href="/store-detail" onClick={(e) => { this.openDetailPage(e, list.store_id._id) }}>
            <div class="premium-deal-sec">
              <div class="discount-banner">
               {list.discount_type == 'amount' && <><h1>Extra<br />{discount_type} {this.convertAmount(list.discount)} Off</h1> </>}

               {list.discount_type == 'percent' && <><h1>Extra<br />{list.discount}% Off</h1> </>}
              </div>
              <div class="discount-text-area">
                <ul class="text-section">
                  <li class="image-sec">
                    <img src={this.state.image_url+'deal/'+list.image} alt="logo" class="line"/>
                  </li>
                  <li class="cash-back-sec">
                    <p>{list.title}</p>
                  </li>
                  <li class="order-sec">
                    <p>{list.description}</p>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </div>
        }
      })}
        </>}

        {this.state.allDeal.length === 0 && <>
            <p>No Record Found</p>
        </>}
        
      </div>
   </div>
 </div>
        </div>

<div class="hot-deal-section">
 <div class="container">
  <div class="row" id="heading-section">
    <div class="col-md-6">
      <h1> Hot Deals</h1>
    </div>
    <div class="col-md-6" id="section-btn">
      {/* <a href="#">See All</a> */}
    </div>
  </div>
  <div class="row upper" id="content-section">
  {this.state.allDeal.length > 0 && <>
    {this.state.allDeal.map((list, index) => {
        if(list.hot_deal === 'yes'){
          var discount_type = "";
            if(sessionStorage.getItem("currency") == 'INR'){
              discount_type = "₹"
            }else{
              discount_type = sessionStorage.getItem("currency");
            }
    return <div class="col-md-6">
      <div class="row" id="hot-deal-text-sec">
        <div class="col-lg-2">
          <img src={this.state.image_url+'deal/'+list.image} alt="logo" class="line"/>
        </div>
        <div class="col-lg-7">
        {list.discount_type == 'amount' && <><h3>{discount_type} {this.convertAmount(list.discount)} Off</h3> </>}

{list.discount_type == 'percent' && <><h3>{list.discount}% off Everything!</h3> </>}

           
           <p>{list.description}</p>
           <p><i class="fa fa-clock-o" aria-hidden="true"></i>Expires {moment(list.end_date).format("DD-MM-YYYY")}</p>
        </div>
        <div class="col-lg-3">
          <a href="/store-detail" onClick={(e) => { this.openDetailPage(e, list.store_id._id) }} class="hot-content">Shop Now</a>
        </div>
      </div>
    </div>}
      })}
        </>}

        {this.state.allDeal.length === 0 && <>
            <p>No Record Found</p>
        </>}
    
  </div>
  
  </div>
</div>


        <Footer  />

        <Modal
          show={this.state.show_login_modal}
          onHide={() => this.showLoginModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
             <div class="form-title text-center">
               <h4>Login</h4>
               <h5>Welcome to Coupon Venture</h5>
             </div>
             <div class="d-flex flex-column text-center">
               <form>
                 <div class="form-group">
                   <input type="text"  value={this.state.mobile} name="mobile" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Mobile Number"/>
                   <span class="icon-form"><i class="fa fa-mobile" aria-hidden="true"></i></span>
                 </div>
                 
                 
                 <button type="button" onClick={(e) => { this.onFormSubmitLogin(e) }} data-toggle="modal" data-target="#enterotpModal"class="btn btn-info btn-block btn-round">Login</button>
             
               </form>
           
           </div>
         
         <div class="social-media">
           <p>Or Use Social Media For Login </p>
           <GoogleLogin
              clientId="974466710645-jk1fk8b3nisq387at0d26uni2i0jmkno.apps.googleusercontent.com"
              render={renderProps => (
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                <a href="javascript:void(0)" onClick={renderProps.onClick} disabled={renderProps.disabled} class="google">Google <i class="fa fa-google-plus" aria-hidden="true"></i></a>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
           <FacebookLogin
              appId="935753126909369"
              autoLoad
              callback={responseFacebook}
              render={renderProps => (
                <a href="javascript:void(0)" onClick={renderProps.onClick} class="faebbok">Facebook <i class="fa fa-facebook" aria-hidden="true"></i></a>
                // <button onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
            />
            
          
         </div>
           <div class="modal-footer d-flex justify-content-center">
             <div class="signup-section">Not have an account? <a href="javascript:void(0)" onClick={(e) => { this.Signup(e) }} class="text-info"> Signup Here</a></div>
           </div>
     </Modal.Body>
        </Modal>



      <Modal
          show={this.state.show_signup_modal}
          onHide={() => this.showSignupModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
             <div class="form-title text-center">
               <h4>Sign Up</h4>
               <h5>Welcome to Coupon Venture</h5>
             </div>
             <div class="d-flex flex-column text-center">
             <form>
              <div class="form-group">
                <input type="text" value={this.state.name} name="name" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Full Name"/>
                <span class="icon-form"><img src={require("assets/img/email.png")}/></span>
              </div>
              <div class="form-group">
                <input type="text" value={this.state.mobile} name="mobile" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Mobile Number"/>
                <span class="icon-form"><i class="fa fa-mobile" aria-hidden="true"></i></span>
              </div>
              <div class="form-group">
                   <input type="text"  value={this.state.upline_code} name="upline_code" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Refer Code"/>
                   <span class="icon-form"><i class="fa fa-mobile" aria-hidden="true"></i></span>
                 </div>
           
             
              <button type="button" onClick={(e) => { this.onFormSubmit(e) }} class="btn btn-info btn-block btn-round">Sign Up</button>
          
            </form>
           
           </div>
         
         {/* <div class="social-media">
           <p>Or Use Social Media For Login </p>
           <a href="javascript:void(0)" class="faebbok">Facebook <i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="javascript:void(0)" class="google">Google <i class="fa fa-google-plus" aria-hidden="true"></i></a>
          
         </div> */}
         <div class="modal-footer d-flex justify-content-center">
          <div class="signup-section">Already have an account? <a href="javascript:void(0)" onClick={(e) => { this.Login(e) }} class="text-info"> Login Here</a></div>
        </div>
     </Modal.Body>
            </Modal>


            <Modal
          show={this.state.show_otp_modal}
          onHide={() => this.showOtpModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
             <div class="form-title text-center">
               <h4>Enter OTP</h4>
               <h5>Please Enter your 4-digit verification code:{this.state.otp}</h5>
             </div>
             <div class="d-flex flex-column text-center">
             <div class="d-flex flex-column text-center">
              <section>
                <form>
                <div id="divOuter">
                <div id="divInner">
                  <input id="partitioned" disabled value={this.state.otp} name="mobile" onChange={(e) => { this.handleInput(e) }} type="text" maxlength="4" />
                </div>
              </div>
                </form>
                <span class="resend-code">Resend Code</span>
              </section>
              <button type="button" onClick={(e) => { this.VerifyOtp(e) }} class="btn btn-info btn-block btn-round submitblock">Submit</button>
          </div>
           
           </div>
         
         
     </Modal.Body>
            </Modal>

            <Modal
          show={this.state.show_otp_login_modal}
          onHide={() => this.showLoginOtpModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
             <div class="form-title text-center">
               <h4>Enter OTP</h4>
               <h5>Please Enter your 4-digit verification code</h5>
             </div>
             <div class="d-flex flex-column text-center">
             <div class="d-flex flex-column text-center">
              <section>
                <form>
                <div id="divOuter">
                <div id="divInner">
                  <input id="partitioned" name="match_otp" onChange={(e) => { this.handleInput(e) }} type="text" maxlength="4" />
                </div>
              </div>
                </form>
                {/* <span class="resend-code">Resend Code</span> */}
              </section>
              <button type="button" onClick={(e) => { this.VerifyLoginOTP(e) }} class="btn btn-info btn-block btn-round submitblock">Submit</button>
          </div>
           
           </div>
         
         
     </Modal.Body>
            </Modal>
      </>
    
  }
}

export default Exclusive;
