/* eslint-disable array-callback-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import Axios from "axios";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import Header from "components/Navbars/Frontheader";
import Footer from "components/Navbars/Frontfooter";
import { Modal } from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
class BrandDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            allDeal:[],
            allStore:[],
            BrandName:"",
            SingleBrand:[],
            login_otp:"",
            StoreCategory:[],
            days:[],
            stores:[],
            copied: false,
            allCoupon:[]
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getSingleBrand(sessionStorage.getItem("brand_id"))
        this.getBrandDeal(sessionStorage.getItem("brand_id"))
        this.getAllStore()
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }
    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getBrandDeal = (brand_id,category=null, stores=null) => {
        var data = {
            brand_id:brand_id,
            category:category ? category : [],
            stores:stores ? stores : []
        }
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/brand-deal`,{data:data}, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeal:res.data.data.category,
                    allCoupon:res.data.data.CategoryCoupon
                })
                console.log("allstore",this.state.allDeal)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    CheckCategory = (event, id) => {
        let day_list = this.state.days;
        let check = event.target.checked;
        let checked_day = parseInt(event.target.value);
        if(check){
            this.setState({
                days: [...this.state.days, checked_day]
            })
        }else{ 
            var index = day_list.indexOf(checked_day);
            if (index > -1) {
                day_list.splice(index, 1);
                this.setState({
                    days: day_list
                })
            } 
        }
        setTimeout(() => {
            this.getBrandDeal(sessionStorage.getItem("brand_id"), this.state.days, this.state.stores)
        }, 200);
        
        
    }

    CheckStore = (event, id) => {
        let day_list = this.state.stores;
        let check = event.target.checked;
        let checked_day = parseInt(event.target.value);
        if(check){
            this.setState({
                stores: [...this.state.stores, checked_day]
            })
        }else{ 
            var index = day_list.indexOf(checked_day);
            if (index > -1) {
                day_list.splice(index, 1);
                this.setState({
                    stores: day_list
                })
            } 
        }
        setTimeout(() => {
            this.getBrandDeal(sessionStorage.getItem("brand_id"), this.state.days, this.state.stores)
        }, 200);
        
        
    }

    getSingleBrand = (brand_id) => {
        
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/single-brand`,{data:brand_id}, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    SingleBrand:res.data.data.category,
                    BrandName:res.data.data.category.brand_name
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllStore = () => {
        this.setState({
            loading:true
        })
        var StoreCategory=[]
        Axios.get(`${this.state.url}/front/auth/get/all-store`, {
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
                    allStore:res.data.data.category,
                    StoreCategory:result
                    // deal_image:shuffleRecord[0].image
                })
                console.log("StoreCategory",result)
            }, 100);
            
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

    showDealModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            
        }
        this.setState({
          show_deal_modal: show,
        })
      }

    showDeal = (e,index) => {
        if(sessionStorage.getItem('_access')){
            var selected = this.state.allDeal[index]
        this.setState({
            price:selected.price,
            discount:selected.discount,
            discount_type:selected.discount_type,
            image:selected.image,
            link:selected.link,
            title:selected.title,
            description:selected.description
        })
        console.log("selected",selected);
        this.showDealModal(true);
        this.insertViewDeal(selected._id);
        }else{
            this.showLoginModal(true)
        }
    }

    insertViewDeal = (deal_id) => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/add/view-deal`,{deal_id:deal_id}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                })
            }, 100);
            
        }, err => {
        })
        
    }

    showCouponModal = show => {
        console.log(show,"asdfasdf");
        if (show === false) {
            
        }
        this.setState({
          show_coupon_modal: show,
        })
      }

    showCoupon = (e,index) => {
        if(sessionStorage.getItem('_access')){
            var selected = this.state.allCoupon[index]
        this.setState({
            price:selected.price,
            discount:selected.discount,
            code:selected.code,
            image:selected.image,
            link:selected.link,
            title:selected.name,
            description:selected.description
        })
        console.log("selected",selected);
        this.showCouponModal(true);
        this.insertViewCoupon(selected._id)
        }else{
            this.showLoginModal(true)
        }
    }

    insertViewCoupon = (coupon_id) => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/save-coupon`,{coupon_id:coupon_id}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                })
            }, 100);
            
        }, err => {
        })
        
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
        return <>
         {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
            <div className="">
                <NotificationAlert ref={this.notificationAlert} />
                <Header  />
                <div class="coupon-main-section">
                    <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <sidebar>
                            <div class="searchby-filter">
                                <h1>Filter by Category</h1>
                                <p><i class="fa fa-search" aria-hidden="true"></i>Search by Category</p>
                                <form action="" class="drop-down">
                                {this.state.StoreCategory.length > 0 && <>
                                {this.state.StoreCategory.map((list, index) => {
                                return <div>
                                    <input type="checkbox" onClick={(e) => {this.CheckCategory(e,list._id)}} value={list._id} id="vehicle1" name="category_id"/>
                                    <label for="vehicle1"> {list.cat_name}</label>
                                    <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                    </div>
                                    })}
                                    </>}
                                    {this.state.StoreCategory.length === 0 && <>
                                        <span>No Record Found</span>
                                </>} 
                                    </form>
                            </div>
                            
                        <div class="searchby-filter">
                            <h1>Filter by Store Offers</h1>
                            <p><i class="fa fa-search" aria-hidden="true"></i>Search by Store</p>
                            <ul class="filter-by-store">
                            {this.state.allStore.length > 0 && <>
                                {this.state.allStore.map((list, index) => {
                                return <div>
                                 <input type="checkbox" onClick={(e) => {this.CheckStore(e,list._id)}} value={list._id} id="store" name="store"/>
                                    <label for="store"> {list.name}</label>
                                    <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                    </div>
                            })}
                            </>}
                            {this.state.allStore.length === 0 && <>
                                <span>No Record Found</span>
                        </>}
                            </ul>
                        </div>
                        {/* <div class="searchby-filter">
                        <h1>Related Store Offers</h1>
                        <p><i class="fa fa-search" aria-hidden="true"></i>Search by Category</p>
                        <ul class="filter-by-store">
                            <li><a href="#">Mobikwik Offers</a></li>
                            <li><a href="#">Talkcharge Offers</a></li>
                            <li><a href="#">Amazon Offers</a></li>
                            <li><a href="#">Freecharge Offers</a></li>
                        </ul>
                    </div> */}
                    {/* <div class="emailaddress-filter">
                    <div class="searchby-filter">
                        <div class="inner-searchby-filter">
                        <h1>Subscribe to mail</h1>
                        <p class="get-daily-sec">Get our Daily email newsletter
                        with Special Services, Updates,
                        Offers and more!</p>
                        <div class="form-group email-address">
                            <input type="text" id="email" placeholder="email address"/>
                        </div>
                        </div>
                        <div class="sign-up">
                            <a href="javascript:void(0)">SIGN UP</a>
                        </div>
                    </div>
                </div> */}
                </sidebar>
                </div>
                        <div class="col-md-9">
                            <h1 class="filter-text">{this.state.BrandName} </h1> 
                            <ul class="list-alaphabet">
                            <li><a href="javascript:void()">All ({this.state.allDeal.length+this.state.allCoupon.length})</a></li>
                                <li><a href="javascript:void()">Coupons ({this.state.allCoupon.length})</a></li>
                                <li><a href="javascript:void()">Deal ({this.state.allDeal.length})</a></li>
                            </ul>
                                {/* <div class="promo-code-main-section">
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="discount-offer">
                                            <div class="discount">
                                                <p>40%<br></br>Off</p>
                                            </div>
                                            <div class="like-dislike">
                                            <p>77% Success</p>
                                            <p><a href="javascript:void(0)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
                                                <a href="javascript:void(0)"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-10">
                                        <div class="discount-detail">
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <form action="" class="drop-down">
                                                        <input type="checkbox" id="vehicle1" name="check1"/>
                                                        <label for="vehicle1">Verified yesterday</label>
                                                    </form>
                                                    <p>Upto 30% Off on Noodles, Soups & Pasta</p>
                                                </div>
                                                <div class="col-md-4">
                                                <a href="#" class="getdeal-btn">Get deal</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="discount-detail-sec">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <ul class="listing">
                                                <li>Get upto 30% Off on Noodles, soups & pasta.</li>
                                                <li>No coupon code needed.</li>
                                                </ul>
                                                </div>
                                            <div class="col-md-4">
                                            <a href="#" class="comments-btn">4 Comments</a>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="comment-section">
                                                <div class="show-comment">
                                                <h3>4 Comments</h3>
                                                </div>
                                                <div class="cross-icon"><i class="fa fa-times" aria-hidden="true"></i></div>
                                            </div>
                                            <div class="row  main-sec-comm">
                                            <div class="col-md-9">
                                                <div class="user-imag">
                                                <h4>JD</h4>
                                                </div>
                                                <div class="user-text">
                                                <p>Lorem Ipsum is simply dummy text</p>
                                                <span class="name">John Doe</span>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="one-weekago">
                                                    <p>1 Week ago</p>
                                                </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row">
                                        
                                            <div class="row  main-sec-comm">
                                            <div class="col-md-9">
                                                <div class="user-imag">
                                                <h4>JD</h4>
                                                </div>
                                                <div class="user-text">
                                                <p>Lorem Ipsum is simply dummy text</p>
                                                <span class="name">John Doe</span>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="one-weekago">
                                                    <p>1 Week ago</p>
                                                </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="show-all-comments">
                                                <a href="javascript:void(0)">Show More</a>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-md-12 maintextarea">
                                                <form>
                                                <div class="tetarea-sec">
                                                <textarea rows="4"  placeholder="Add a Comment"></textarea>
                                                </div>
                                                <div class="row form-feild">
                                                <div class="col-md-8">
                                                <div class="form-group">
                                                <input type="text" id="name" placeholder="Name"/>
                                                </div>
                                                
                                                </div>
                                            <div class="col-md-4">
                                                <a href="#" class="comments-btn">Post Comments</a>
                                            </div>
                                            </div>
                                            </form>
                                            </div>

                                            </div>
                                    </div>
                                    </div>
                                    
                                        
                                        
                                </div>
                                </div> */}
                            {this.state.allDeal.length > 0 && <>
                                {this.state.allDeal.map((list, index) => {
                            return <div class="promo-code-main-section">
                                <div class="row">
                                    <div class="col-md-2">
                                    <div class="discount-offer">
                                        <div class="discount">
                                            <p>{list.discount} {list.discount_type === 'percent' ? '%' : "₹"}<br></br>>Off</p>
                                        </div>
                                        {/* <div class="like-dislike">
                                            <p>77% Success</p>
                                            <p><a href="javascript:void(0)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
                                            <a href="javascript:void(0)"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a></p>
                                            </div> */}
                                    
                                    </div>
                                    </div>
                                    <div class="col-md-10">
                                    <div class="discount-detail">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <form action="" class="drop-down">
                                                        {/* <input type="checkbox" id="vehicle1" name="check1"/> */}
                                                        <label for="vehicle1">{list.title}</label>
                                                    </form>
                                                    <p>Upto {list.discount} {list.discount_type === 'percent' ? '%' : "₹"} Off on {list.title}</p>
                                                </div>
                                            <div class="col-md-4">
                                                <a href="javascript:void()" onClick={(e) => {this.showDeal(e,index)}} class="getdeal-btn">Get deal</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="discount-detail-sec">
                                        <div class="row">
                                            <div class="col-md-8">
                                            <ul class="listing">
                                                <li>{list.description}</li>
                                                <li>No coupon code needed.</li>
                                            </ul>
                                            </div>
                                            <div class="col-md-4">
                                            {/* <a href="#" class="comments-btn">4 Comments</a> */}
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                             })}
                             </>}

                             {this.state.allCoupon.length > 0 && <>
                                {this.state.allCoupon.map((list, index) => {
                            return <div class="promo-code-main-section">
                                <div class="row">
                                    <div class="col-md-2">
                                    <div class="discount-offer">
                                        <div class="discount">
                                            <p>{list.discount} <br></br>>Off</p>
                                        </div>
                                        {/* <div class="like-dislike">
                                            <p>77% Success</p>
                                            <p><a href="javascript:void(0)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
                                            <a href="javascript:void(0)"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a></p>
                                            </div> */}
                                    
                                    </div>
                                    </div>
                                    <div class="col-md-10">
                                    <div class="discount-detail">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <form action="" class="drop-down">
                                                        {/* <input type="checkbox" id="vehicle1" name="check1"/> */}
                                                        <label for="vehicle1">{list.name}</label>
                                                    </form>
                                                    <p>Upto {list.discount} Off on {list.name}</p>
                                                </div>
                                            <div class="col-md-4">
                                                <a href="javascript:void()" onClick={(e) => {this.showCoupon(e,index)}} class="getdeal-btn">Get coupon</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="discount-detail-sec">
                                        <div class="row">
                                            <div class="col-md-8">
                                            <ul class="listing">
                                                <li>{list.description}</li>
                                                <li>No coupon code needed.</li>
                                            </ul>
                                            </div>
                                            <div class="col-md-4">
                                            {/* <a href="#" class="comments-btn">4 Comments</a> */}
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                             })}
                             </>}

                             {this.state.allDeal.length === 0 && this.state.allCoupon.length === 0 && <>
                                <span>No Record Found</span>
                        </>}
                            
                       
                   
                        </div>
                    </div>
                    </div>
                </div>
                        </div>
                        <Footer  />




        <Modal
          show={this.state.show_deal_modal}
          onHide={() => this.showDealModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
          <div class="whole-trending-deal-sec">
      <div class="container">
         <div class="row">
           <div class="col-md-4">
             <img src={this.state.image_url+'deal/'+this.state.image} alt="logo"/>
           </div>
           <div class="col-md-8">
             <ul class="text-area">
                <li class="money">
                  <p><i class="fa fa-inr" aria-hidden="true"></i> {this.state.price}<span><i class="fa fa-inr" aria-hidden="true"></i> {this.state.discount}</span></p>
                </li>
                <li class="view-btn">
                  <a href={this.state.link} target="_blank">View Detail</a>
                </li>
                <li class="share-url">
                  <p class="heading">Share Url</p>
                  <p class="url-sec"><i class="fa fa-files-o" aria-hidden="true"></i>{this.state.link}<span>
                  <CopyToClipboard  onCopy={this.onCopy} text={this.state.link}>
                        <button>{this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : "Copy"}</button>
                    </CopyToClipboard>
                      </span></p>
                </li>
                <li class="share-social-media">
                  <p class="heading">Share via</p>
                  <p class="email-icon"><img src={require("assets/img/google.png")} alt="facebook-logo"/>Email</p>
                  <p class="facebook"><img src={require("assets/img/facebook.png")} alt="facebook-logo"/>Facebook</p>
                </li>
             </ul>

           </div>
         </div>
      </div>
    </div>
     </Modal.Body>
        </Modal>



        <Modal
          show={this.state.show_coupon_modal}
          onHide={() => this.showCouponModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
          <div class="whole-trending-deal-sec">
      <div class="container">
         <div class="row">
           <div class="col-md-4">
             <img src={this.state.image_url+'coupon/'+this.state.image} alt="logo"/>
           </div>
           <div class="col-md-8">
             <ul class="text-area">
                <li class="money">
                  <p><i class="fa fa-inr" aria-hidden="true"></i> {this.state.price}<span><i class="fa fa-inr" aria-hidden="true"></i> {this.state.discount}</span></p>
                </li>
                <li class="view-btn">
                  <a href={this.state.link} target="_blank">View Detail</a>
                </li>
                <li class="share-url">
                  <p class="heading">Share Url</p>
                  <p class="url-sec"><i class="fa fa-files-o" aria-hidden="true"></i>{this.state.link}</p>
                  <span>
                      Coupon Code: {this.state.code}
                  </span>
                </li>
                <li class="share-social-media">
                  <p class="heading">Share via</p>
                  <p class="email-icon"><img src={require("assets/img/google.png")} alt="facebook-logo"/>Email</p>
                  <p class="facebook"><img src={require("assets/img/facebook.png")} alt="facebook-logo"/>Facebook</p>
                </li>
             </ul>

           </div>
         </div>
      </div>
    </div>
     </Modal.Body>
        </Modal>



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

        </>;
    }
}

export default BrandDetail;