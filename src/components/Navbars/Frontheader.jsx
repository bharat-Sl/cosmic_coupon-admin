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
import Axios from "axios";
import { Modal } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import GoogleLogin from 'react-google-login';
import Autosuggest from 'react-autosuggest';
import MetaTags from 'react-meta-tags';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
];
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};


class Frontheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        url: process.env.REACT_APP_API_URL,
        image_url: process.env.REACT_APP_IMAGE_URL,
        email: "",
        password: "",
        searchCat:[],
        searchStore:[],
        LatestStore:[],
        allCategories:[],
        allSlider:[],
        allCoupon:[],
        allOffers:[],
        lastSegment:"",
        LatestCat:[],
        featuredCat:[],
        popularCat:[],
        travelCat:[],
        electroCat:[],
        otherCat:[],
        login_otp:"",
        foodCat:[],
        rechargeCat:[],
        fashionCat:[],
        trendingCat:[],
        FeaturedStore:[],
        PopularStore:[],
        TrendingStore:[],
        module:[],
        LatestStore:[],
        sugData:[],
        value: '',
      suggestions: []
        
    }
}
onChange = (event, { newValue }) => {
  this.setState({
    value: newValue
  });
};
onSuggestionsFetchRequested = e => {
  var val = e.target.value;
      console.log(val, e.keyCode)
      if (val.length > 2 || (e.keyCode === 8 && val.length === 0) || e.keyCode === 13) {
         this.setState({
            keyword: val,
            page: 1
         })
         setTimeout(() => {
            console.log(this.state.keyword)
            if(this.state.keyword != ""){
              Axios.post(`${this.state.url}/front/auth/get/search-data`,{data:this.state.keyword}, {
                headers: {
                    token: sessionStorage.getItem('_access')
                }
            }).then(res => {
                setTimeout(() => {
                    this.setState({
                        loading:false,
                        type:val,
                        showCat:true,
                        allCategories:res.data.data.category,
                        searchStore: res.data.data.store,
                        searchCat: res.data.data.category,
                        // suggestions: res.data.data.category.concat(res.data.data.store)
                    })
                    
                }, 200);
                
            }, err => {
                console.log("error", err.response)
            })
          }
         }, 100);
      }

//   setTimeout(() => {
//     console.log(this.state.keyword)
//     // this.setState({
//     //   suggestions:[]
//     // })
//         Axios.post(`${this.state.url}/front/auth/get/search-data`,{data:this.state.keyword}, {
//             headers: {
//                 token: sessionStorage.getItem('_access')
//             }
//         }).then(res => {
//             setTimeout(() => {
//                 this.setState({
//                     loading:false,
//                     type:value,
//                     showCat:true,
//                     allCategories:res.data.data.category,
//                     suggestions: res.data.data.category.concat(res.data.data.store)
//                 })
                
//             }, 100);
            
//         }, err => {
//             console.log("error", err.response)
//         })
//   }, 100);

//   var data = {
//     type:value
// }

    

  // this.setState({
  //   suggestions: getSuggestions(value)
  // });
};
onSuggestionsClearRequested = () => {
  this.setState({
    suggestions: [],
    sugData:[]
  });
};
notificationAlert = React.createRef();
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

componentDidMount = () => {
  if(!sessionStorage.getItem("currency")){
    sessionStorage.setItem("currency","INR")
    this.setState({
      selectedCurr:"INR"
    })
  }else{
    this.setState({
      selectedCurr:sessionStorage.getItem("currency")
    })
  }
  // sessionStorage.getItem("currency") 
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5f3fa3251e7ade5df442c648/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

  var parts = window.location.href.split('/');
var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
console.log("window.location.href",lastSegment)

console.log(lastSegment);
  this.getLatestCategory()
  this.getFeaturedCategory()
  this.getTrendingCategory()
  this.getPopularCategory()
  this.getTravelCategory()
  this.getFashionCategory()
  this.getRechargeCategory()
  this.getElectronicsCagegory()
  this.getOthersCategory()
  this.getFoodCategory()
  this.getLatestStore()
  this.getPopularStore()
  this.getTrendingStore()
  this.getFeaturedStore()
  this.setState({
    loggedIn: sessionStorage.getItem("_access") ? sessionStorage.getItem("_access") : "",
    lastSegment:lastSegment,
    module: sessionStorage.getItem("module") ? sessionStorage.getItem("module") : ""
  })
}
Login = (e) => {
  this.showLoginModal(true);
  this.showSignupModal(false);
}

handleInput = (e) => {
  this.setState({
      [e.target.name]: e.target.value
  })
}

getPopularCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/popular`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              popularCat:res.data.data.category
          })
          console.log("allCategories",this.state.allCategories)
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getTravelCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/travel`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              travelCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}
getFoodCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/food`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              foodCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}
getRechargeCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/recharge`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              rechargeCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getElectronicsCagegory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/electronics`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              electroCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getOthersCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/others`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              otherCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getFashionCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/fashion`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              fashionCat:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getTrendingCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/trending`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              trendingCat:res.data.data.category
          })
          console.log("allCategories",this.state.allCategories)
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getFeaturedCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/featured`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              featuredCat:res.data.data.category
          })
          console.log("allCategories",this.state.allCategories)
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getLatestCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category/latest`, {
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
          console.log("allCategories",this.state.allCategories)
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getLatestStore = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/latest-store`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              LatestStore:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getPopularStore = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/popular-store`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              PopularStore:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getTrendingStore = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/trending-store`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              TrendingStore:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

getFeaturedStore = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/featured-store`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              FeaturedStore:res.data.data.category
          })
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
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

openDealPage = (e) => {
  var newPageUrl = 'view-deal';
  window.open(newPageUrl, "_self")
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

logout = (e) => {
  e.preventDefault()
  this.showLoginModal(false)
  this.notify("success", "User logout");
  // sessionStorage.removeItem('_access');
  sessionStorage.clear()
  this.setState({
    loggedIn:""
  })
  window.location.href = '/';

}

OpenStorePage = (e, store_id) => {
  var newPageUrl = 'store-detail';
  sessionStorage.setItem("store_id",store_id)
  window.open(newPageUrl, "_self")
}

OpenCategoryPage = (e, cat_id) => {
  var newPageUrl = 'category-detail';
  sessionStorage.setItem("cat_id",cat_id)
  window.open(newPageUrl, "_self")
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

changeCurrency = (e, value) => {
  var baseAmt = 100;
  sessionStorage.setItem("currency",value)
  Axios.get(`https://api.exchangeratesapi.io/latest?base=${sessionStorage.getItem("currency")}`, {
    
}).then(res => {
    setTimeout(() => {
        console.log(res)
        this.setState({
          rates: res.data['rates'],
          currencies: Object.keys(res.data['rates']).sort(),
          selectedCurr:value
          
        })
        window.location.reload()
        return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
       console.log(this.state.convertedAmt) 
    }, 100);
    
}, err => {
    console.log("error", err.response)
})

  
}
showSearchModal = show => {
  console.log(show,"asdfasdf");
  if (show === false) {
      this.setState({
          name: "",
          profile_picture:"",
          mobile:"",
          created_at:"",
          keyword:"",
          searchCat:[],
          searchStore:[]
      })
  }
  this.setState({
    show_search_modal: show,

  })
}
OpenSearch = (e) => {
  this.showSearchModal(true)
}
renderSuggestion = (data) => {
  var newData = [];
  console.log("Data",data)
  if(data){
    setTimeout(() => {
      
      this.setState({ 
        sugData: this.state.sugData.concat([data])
      }) 
      console.log("sugdata",this.state.sugData)
    }, 200);
    
  }
  // setTimeout(() => {
  //   this.setState({
  //     sugData:newData
  //   })
  //   console.log("sugdata",this.state.sugData)
  // }, 200);
  
}
  render() {

    const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
  <div>
   {suggestion.cat_name && <> <h1 class="top-heading">"{this.state.type}" In Category</h1> </>}
    {suggestion.name && <> <h1 class="top-heading">"{this.state.type}" In Store</h1> </>}

    

    <div class="serach-block-sec">
    
        <div class="row" id="store-sec">
        {suggestion.cat_name && <> <div class="col-md-2">
            <div class="inner-box">
              <img src={this.state.image_url+'category/'+suggestion.image} class="d-inline-block align-top"alt=""/>
              <p class="heading"><a href="/category-detail" onClick={(e) => { this.OpenCategoryPage(e, suggestion._id) }}>{suggestion.cat_name}>{suggestion.cat_name}</a></p>
              <p class="paragraph"><a href="#">0 Coupon | 605 Offers</a></p>
            </div>
          </div>
          </>}
          </div>
         

          <div class="row" id="store-sec">
          {suggestion.name && <> <div class="col-md-2">
            <div class="inner-box">
              <img src={this.state.image_url+'store/'+suggestion.image} class="d-inline-block align-top"alt=""/>
              <p class="heading"><a href="/store-detail" onClick={(e) => { this.OpenStorePage(e, suggestion._id) }}>{suggestion.name}>{suggestion.name}</a></p>
              <p class="paragraph"><a href="#">0 Coupon | 605 Offers</a></p>
            </div>
          </div>
          </>}
        </div>
       
      </div>

    
     
  </div>

  
);

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    };
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
     <NotificationAlert ref={this.notificationAlert} />
        <header>
        <MetaTags>
            <title>Coupon Ventures </title>
            <meta name="description" content="World's Best Platform which Saves your Wallet! Get Exclusive Coupons, Best Deals, Offers, Promo codes & Assured Earning from Coupon Ventures." />
            <meta property="og:title" content="coupon venture : Get Exclusive Coupons, Best Deals, Offers & Promo codes" />
            <meta property="og:image" content={require("assets/img/LOGO-original.png")} />
          </MetaTags>
        <div class="container-fuild">
            <div class="top-navigation">
                 <nav class="navbar navbar-light bg-light">
                   <a class="navbar-brand" href="/"><img src={require("assets/img/LOGO-original.png")} class="d-inline-block align-top"alt=""/></a>
                   <form class="navbar-form" role="search">
                     <div class="input-group add-on">
                     {/* <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                      /> */}
                       <input class="form-control" placeholder="What are you looking for..." name="srch-term" id="srch-term" type="text" onClick={(e) => { this.OpenSearch(e) }} />
                       <div class="input-group-btn">
                         <button class="btn btn-default" type="submit"><i class="fa fa-search" aria-hidden="true"></i>Search</button>
                       </div>
                     </div>
                   </form>
                   
                   <div class="icon-sec">
                    <div class="help-desk">
                    {!this.state.loggedIn && <>
                      <a href="javascript:void(0)" onClick={(e) => { this.Login(e) }}>
                        <img src={require("assets/img/user-navigation-icon.png")} class="user-icon"/>
                        
                        <span>Sign In <br/>Join Free</span>
                        
                      </a>
                      </>}

                      <a href="/dashboard" class="logout-area">
                      {this.state.loggedIn && !this.state.module && <>
                         <img src={require("assets/img/user-navigation-icon.png")} class="user-logout-sec"/>
                        <span>My Account | </span>
                        </>}
                      </a>
                      <a href="javascript:void(0)" onClick={(e) => { this.logout(e) }}>
                      {this.state.loggedIn && <>
                        <span> Logout</span>
                        </>}
                      </a>
                     </div>
                     <div class="help-desk-sec">
                      
                        
                        <img src={require("assets/img/india-flag-icon-16.png")} class="d-inline-block align-top"alt=""/>
                         <p> {this.state.selectedCurr}</p> 
                         
                        
                        <ul class="country-flag">
                        <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e,'INR') }}><img src={require("assets/img/inr.png")} class="d-inline-block align-top"alt=""/>INR</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e,'USD') }}><img src={require("assets/img/usa.png")} class="d-inline-block align-top"alt=""/>USD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'CAD') }}><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>CAD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'NZD') }}><img src={require("assets/img/nza.png")} class="d-inline-block align-top"alt=""/>NZD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'GBP') }}><img src={require("assets/img/gbp.png")} class="d-inline-block align-top"alt=""/>GBP</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'CHF') }}><img src={require("assets/img/cfh.png")} class="d-inline-block align-top"alt=""/>CHF</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'JPY') }}><img src={require("assets/img/jpy.png")} class="d-inline-block align-top"alt=""/>JPY</a>
                          </li>
                          {/* <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'UK') }}><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>UK</a>
                          </li> */}
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'AUD') }}><img src={require("assets/img/aud.png")} class="d-inline-block align-top"alt=""/>AUD</a>
                          </li>
                        </ul>
                      
                     </div>
                  </div>

                  </nav>
             </div>
         </div>
     </header>
    
     <div class="navigation-second"  id="myHeader">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" href="javascript:void()" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Stores</a>
                        <div id="drop-down-navigation" class="dropdown-menu store" aria-labelledby="navbarDropdown">
                            <div class="row">
                            {this.state.LatestStore.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Latest </h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.LatestStore.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenStorePage(e, list._id) }}>{list.name}</a>
                                        </li>
                                })}
                                
                                </ul>
                            </div>
                            </>}
                            {this.state.TrendingStore.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Trending</h1>
                                <ul class="inner-drop-down">
                               
                                        {this.state.TrendingStore.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenStorePage(e, list._id) }}>{list.name}</a>
                                        </li>
                                })}
                               
                            </ul>
                            </div>
                            </>}
                            {this.state.FeaturedStore.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Featured</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.FeaturedStore.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenStorePage(e, list._id) }}>{list.name}</a>
                                        </li>
                                })}
                               
                                </ul>
                            </div>
                            </>}
                            {this.state.PopularStore.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Popular</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.PopularStore.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenStorePage(e, list._id) }}>{list.name}</a>
                                        </li>
                                })}
                                
                                </ul>
                            </div>
                            </>}
                            </div>
                             <div class="view-btn-navigation">
                               <a className="view_categorie" href="/view-store">View all Stores</a>
                             </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </a>
                        
                        <div id="drop-down-navigation" class="dropdown-menu categories" aria-labelledby="navbarDropdown">
                            <div class="row">
                            {this.state.allCategories.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Latest</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.allCategories.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                               
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.featuredCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Featured</h1>
                                <ul class="inner-drop-down">
                               
                                        {this.state.featuredCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                            </ul>
                            </div>
                            </>}
                            {this.state.trendingCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Trending</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.trendingCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                            </div>
                            </>}
                            {this.state.popularCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Popular</h1>
                                <ul class="inner-drop-down">
                               
                                        {this.state.popularCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                               
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.travelCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Travel</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.travelCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.fashionCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Fashion</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.fashionCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                               
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.rechargeCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Recharge</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.rechargeCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.foodCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Food</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.foodCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.electroCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Electronics</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.electroCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                                
                            </div>
                            </>}
                            {this.state.otherCat.length > 0 && <>
                            <div class="col-md-3">
                                <h1>Others</h1>
                                <ul class="inner-drop-down">
                                
                                        {this.state.otherCat.map((list, index) => {
                                        return <li>
                                            <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}>{list.cat_name}</a>
                                        </li>
                                })}
                                
                                </ul>
                                
                            </div>
                            </>}
                            </div>
                              <div class="view-btn-navigation">
                                <a className="view_categorie" href="/view-category">View all Categories</a>
                              </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/deal">Deal of the day</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/gift-card">Giftcard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/exclusive">Exclusive Offer</a>
                    </li>

                    <li class="nav-item">
                    {!this.state.loggedIn && <>
                        <a class="nav-link" href="javascript:void(0)" onClick={(e) => { this.Login(e) }}>Recharge & Bill Payment</a>
                    </>}
                    {this.state.loggedIn && <>
                        <a class="nav-link" href="#recharge-step">Recharge & Bill Payment</a>
                    </>}
                    </li>

                    <li class="nav-item-btn">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                            <span>Help</span>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            
                        </button>
                    </li>
                        

                    
                     <li class="nav-item" id="responsive-nav">
                       <div class="help-desk">
                    {!this.state.loggedIn && <>
                      <a href="javascript:void(0)" onClick={(e) => { this.Login(e) }}>
                        
                        <span>Sign In / Join Free</span>
                        
                      </a>
                      </>}

                      <a href="/dashboard">
                      {this.state.loggedIn && <>

                        <span>My Account | </span>
                        </>}
                      </a>
                      <a href="javascript:void(0)" onClick={(e) => { this.logout(e) }}>
                      {this.state.loggedIn && <>
                        <span>  Logout</span>
                        </>}
                      </a>
                      </div>
                    
                     </li>
                     <li class="nav-item" id="responsive-nav">
                        <div class="help-desk-sec">
                      
                        
                        <img src={require("assets/img/india-flag-icon-16.png")} class="d-inline-block align-top"alt=""/>
                         <p>INR</p> 
                        
                        <ul class="country-flag">
                        <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e,'INR') }}><img src={require("assets/img/inr.png")} class="d-inline-block align-top"alt=""/>INR</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e,'USD') }}><img src={require("assets/img/usa.png")} class="d-inline-block align-top"alt=""/>USD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'CAD') }}><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>CAD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'NZD') }}><img src={require("assets/img/nza.png")} class="d-inline-block align-top"alt=""/>NZD</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'GBP') }}><img src={require("assets/img/gbp.png")} class="d-inline-block align-top"alt=""/>GBP</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'CHF') }}><img src={require("assets/img/cfh.png")} class="d-inline-block align-top"alt=""/>CHF</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'JPY') }}><img src={require("assets/img/jpy.png")} class="d-inline-block align-top"alt=""/>JPY</a>
                          </li>
                          {/* <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'UK') }}><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>UK</a>
                          </li> */}
                          <li>
                            <a href="javascript:void(0)" onClick={(e) => { this.changeCurrency(e, 'AUD') }}><img src={require("assets/img/aud.png")} class="d-inline-block align-top"alt=""/>AUD</a>
                          </li>
                        </ul>
                      
                     </div>
                     </li>
                    </ul>
                </div>
                <a class="navbar-brand" href="/"><img src={require("assets/img/LOGO-original.png")} class="d-inline-block align-top"alt=""/></a>
                 
                    <form class="navbar-form" role="search">
                     <div class="input-group add-on">
                       <input class="form-control"  name="srch-term" id="srch-term" type="text"/>
                       <div class="input-group-btn">
                         <button class="btn btn-default" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                       </div>
                     </div>
                   </form>
                </nav>
            </div>
            </div>
            
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
                   <span class="icon-form"><img src={require("assets/img/mobileimg.png")}/></span>
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
                <span class="icon-form"><img src={require("assets/img/mobileimg.png")}/></span>
              </div>
              <div class="form-group">
                   <input type="text"  value={this.state.upline_code} name="upline_code" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Refer Code"/>
                   <span class="icon-form"><img src={require("assets/img/mobileimg.png")}/></span>
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
               <h5>Please Enter your 4-digit verification code</h5>
             </div>
             <div class="d-flex flex-column text-center">
             <div class="d-flex flex-column text-center">
              <section>
                <form>
                <div id="divOuter">
                <div id="divInner">
                  <input id="partitioned" name="otp" onChange={(e) => { this.handleInput(e) }} type="text" maxlength="4" />
                </div>
              </div>
                </form>
                {/* <span class="resend-code">Resend Code</span> */}
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


            <Modal
          show={this.state.show_search_modal}
          onHide={() => this.showSearchModal(false)}
          // dialogClassName="modal-90w"
          // size="lg"
          aria-labelledby="example-custom-modal-styling-title"
       id="search-bar-sec-modal">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
    <div class="search-bar-whole-sec">
     <div class="container">
      <div class="serach-form">
      <input type="text" name="search" id="myInputTextField" placeholder="Search Record" className="form-control" onKeyUp={(e) => { this.onSuggestionsFetchRequested(e) }} />
                                          <span><i class="fa fa-search" aria-hidden="true"></i></span>
        {/* <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        /> */}
        {/* <input type="text" placeholder="Search for stores, coupons offers..."/><span>X</span> */}
        <p>What do you want to serach today?</p>
      </div>
      {this.state.searchCat.length > 0 && <>
      <div class="serach-block-sec">
     <h1 class="top-heading">"{this.state.keyword}" In Category</h1>
      <div class="row" id="store-sec">
     
      {this.state.searchCat.map((list, index) => {
        if(list.cat_name){
       return  <div class="col-md-2">
              <div class="inner-box">
              <a href="/category-detail" onClick={(e) => { this.OpenCategoryPage(e, list._id) }}><img src={this.state.image_url+'category/'+list.image} class="d-inline-block align-top"alt=""/>
                <p class="heading">{list.cat_name}</p></a>
                {/* <p class="paragraph"><a href="#">0 Coupon | 605 Offers</a></p> */}
              </div>
          </div>
     
        
      }
      })}
      
       </div>
       </div>
       </>}
       {this.state.searchStore.length > 0 && <>
       <div class="serach-block-sec">
       <h1 class="top-heading">"{this.state.keyword}" In Store</h1>
      <div class="row" id="store-sec">
     
      {this.state.searchStore.map((list, index) => {
        if(list.name){
       return  <div class="col-md-2">
              <div class="inner-box">
              <a href="/store-detail" onClick={(e) => { this.OpenStorePage(e, list._id) }}><img src={this.state.image_url+'store/'+list.image} class="d-inline-block align-top"alt=""/>
                <p class="heading">{list.name}</p></a>
                {/* <p class="paragraph"><a href="#">0 Coupon | 605 Offers</a></p> */}
              </div>
          </div>
        
      }
      })}
      
       </div>
       </div>
       </>}
     </div>
    </div>
         
         
     </Modal.Body>
            </Modal>
     </>;



  }
}


export default Frontheader;
