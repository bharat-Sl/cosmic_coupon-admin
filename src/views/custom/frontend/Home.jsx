/* eslint-disable  */
import React from "react";
// import Axios from "axios";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import Header from "components/Navbars/Frontheader";
import Footer from "components/Navbars/Frontfooter";
import { Modal } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";




const rechargeLable = {
  padding: "10px",
  // background: "#00bf9a",
  borderRadius: "5px"
}
const rechargeLableSelected = {
  padding: "15px",
  // background: "#00bf9a",
  color: "#fff",
  borderRadius: "5px"
}
const circles = [{ "code": 1, "circle": "Andhra Pradesh" },
{ "code": 2, "circle": "Assam" },
{ "code": 3, "circle": "Bihar / Jharkhand" },
{ "code": 4, "circle": "Chennai" },
{ "code": 5, "circle": "Delhi" },
{ "code": 26, "circle": "Goa" },
{ "code": 6, "circle": "Gujarat" },
{ "code": 7, "circle": "Haryana" },
{ "code": 8, "circle": "Himachal Pradesh" },
{ "code": 9, "circle": "Jammu and Kashmir" },
{ "code": 10, "circle": "Karnataka" },
{ "code": 11, "circle": "Kerala" },
{ "code": 12, "circle": "Kolkata" },
{ "code": 14, "circle": "Madhya Pradesh / Chhattisgarh" },
{ "code": 13, "circle": "Maharashtra" },
{ "code": 27, "circle": "Manipur" },
{ "code": 15, "circle": "Mumbai" },
{ "code": 16, "circle": "North East" },
{ "code": 17, "circle": "Orissa" },
{ "code": 18, "circle": "Punjab" },
{ "code": 19, "circle": "Rajasthan" },
{ "code": 20, "circle": "Tamil Nadu" },
{ "code": 21, "circle": "Uttar Pradesh (E)" },
{ "code": 22, "circle": "Uttar Pradesh (W)" },
{ "code": 23, "circle": "West Bengal" }];

const operators = [{ "type": 1, "code": "AT", "operator": "Airtel" },
{ "type": 1, "code": "BS", "operator": "BSNL" },
{ "type": 1, "code": "BSS", "operator": "BSNL SPECIAL" },
{ "type": 1, "code": "IDX", "operator": "IDEA" },
{ "type": 1, "code": "MTD", "operator": "MTNL DELHI" },
{ "type": 1, "code": "MTDS", "operator": "MTNL DELHI SPECIAL" },
{ "type": 1, "code": "MTM", "operator": "MTNL MUMBAI" },
{ "type": 1, "code": "MTMS", "operator": "MTNL MUMBAI SPECIAL" },
{ "type": 1, "code": "JO", "operator": "RELIANCE JIO" },
{ "type": 1, "code": "TD", "operator": "TATA DOCOMO" },
{ "type": 1, "code": "VF", "operator": "VODAFONE" },
{ "type": 3, "code": "ATP", "operator": "Airtel PostPaid" },
{ "type": 3, "code": "BPOS", "operator": "BSNL PostPaid" },
{ "type": 3, "code": "IPOS", "operator": "IDEA PostPaid" },
{ "type": 3, "code": "RGPOS", "operator": "RELIANCE JIO PostPaid" },
{ "type": 3, "code": "VPOS", "operator": "VODAFONE PostPaid" },
{ "type": 2, "code": "AD", "operator": "AIRTEL DTH" },
{ "type": 2, "code": "DT", "operator": "DISH TV" },
{ "type": 2, "code": "SD", "operator": "SUN DIRECT DTH" },
{ "type": 2, "code": "TX", "operator": "TATA SKY" },
{ "type": 2, "code": "VT", "operator": "VIDEOCON D2H" }];

const electricity_operators = [{ "type": 1, "code": "ADEM", "operator": "Adani Electricity" },
{ "type": 1, "code": "AVVR", "operator": "Ajmer Vidyut Vitran Nigam Limited" },
{ "type": 1, "code": "APDC", "operator": "APDCL (Non-RAPDR) - ASSAM" },
{ "type": 1, "code": "APDR", "operator": "APDCL (RAPDR) - ASSAM" },
{ "type": 1, "code": "APEP", "operator": "APEPDCL - Andhra Pradesh" },
{ "type": 1, "code": "APSP", "operator": "APSPDCL - Andhra Pradesh" },
{ "type": 1, "code": "BESC", "operator": "Bangalore Electricity supply company Ltd" },
{ "type": 1, "code": "BEUM", "operator": "BEST Undertaking" },
{ "type": 1, "code": "BKEB", "operator": "Bikaner Electricity Supply Limited" },
{ "type": 1, "code": "BSRD", "operator": "BSES Rajdhani Power Limited" },
{ "type": 1, "code": "BSYD", "operator": "BSES Yamuna Power Limited	" },
{ "type": 1, "code": "CESC", "operator": "Calcutta Electric Supply Corporation Limited" },
{ "type": 1, "code": "CESK", "operator": "CESCOM - KARNATAKA" },
{ "type": 1, "code": "CSPD", "operator": "Chhattisgarh State Power Distribution Company Ltd" },
{ "type": 1, "code": "DGVC", "operator": "Dakshin Gujarat Vij Company Limited" },
{ "type": 1, "code": "DHBH", "operator": "Dakshin Haryana Bijli Vitran Nigam" },
{ "type": 1, "code": "DADE", "operator": "Daman And Diu Electricity" },
{ "type": 1, "code": "DNHP", "operator": "DNH Power Distribution Company Limited" },
{ "type": 1, "code": "GOED", "operator": "Goa Electricity Department" },
{ "type": 1, "code": "GESK", "operator": "Gulbarga Electricity Supply Company Limited" },
{ "type": 1, "code": "HPSE", "operator": "Himachal Pradesh State Electricity Board Ltd" },
{ "type": 1, "code": "HESK", "operator": "Hubli Electricity Supply Company Ltd" },
{ "type": 1, "code": "JVVR", "operator": "Jaipur Vidyut Vitran Nigam" },
{ "type": 1, "code": "JKPD", "operator": "Jammu and Kashmir Power Development Department" },
{ "type": 1, "code": "JUSC", "operator": "Jamshedpur Utilities & Services (JUSCO)" },
{ "type": 1, "code": "JBVN", "operator": "Jharkhand Bijli Vitran Nigam Limited" },
{ "type": 1, "code": "JDVR", "operator": "Jodhpur Vidyut Vitran Nigam Limited" },
{ "type": 1, "code": "KESC", "operator": "Kanpur Electricity Supply Company" },
{ "type": 1, "code": "KSEB", "operator": "Kerala State Electricity Board Ltd" },
{ "type": 1, "code": "KEDR", "operator": "Kota Electricity Distribution Limited" },
{ "type": 1, "code": "MGVG", "operator": "Madhya Gujarat Vij Company Limited" },
{ "type": 1, "code": "MKMP", "operator": "Madhya Kshetra Vitaran (Rural) - Madhya Pradesh" },
{ "type": 1, "code": "MKVU", "operator": "Madhya Kshetra Vitaran (Urban) - Madhya Pradesh" },
{ "type": 1, "code": "MPDC", "operator": "Meghalaya Power Dist Corp Ltd" },
{ "type": 1, "code": "MSEM", "operator": "MSEDCL" },
{ "type": 1, "code": "MZVV", "operator": "Muzaffarpur Vidyut Vitran" },
{ "type": 1, "code": "NESO", "operator": "NESCO Utility" },
{ "type": 1, "code": "NDMC", "operator": "New Delhi Municipal Council (NDMC)" },
{ "type": 1, "code": "NOPN", "operator": "Noida Power Copmpany Limited" },
{ "type": 1, "code": "NBBR", "operator": "North Bihar Power Distribution Co. Ltd" },
{ "type": 1, "code": "PGVG", "operator": "Paschim Gujarat Vij Company Limited	" },
{ "type": 1, "code": "PVMP", "operator": "Paschim Kshetra Vidyut Vitaran - Madhya Pradesh" },
{ "type": 1, "code": "PKVU", "operator": "Poorv Kshetra Vitaran (NBG-Urban) - MADHYA PRADESH" },
{ "type": 1, "code": "PKVR", "operator": "Poorv Kshetra Vitaran (Rural) - MADHYA PRADESH" },
{ "type": 1, "code": "SNPN", "operator": "SNDL Power - NAGPUR" },
{ "type": 1, "code": "SBBR", "operator": "South Bihar Power Distribution Co. Ltd" },
{ "type": 1, "code": "SOTO", "operator": "Southern Electricity Supply Company Of Odisha Limited" },
{ "type": 1, "code": "TNEB", "operator": "Tamil Nadu Electricity Board" },
{ "type": 1, "code": "TAPM", "operator": "Tata Power - MUMBAI" },
{ "type": 1, "code": "TPAR", "operator": "Tata Power AJMER - RAJASTHAN" },
{ "type": 1, "code": "TAPD", "operator": "Tata Power Delhi Distribution Limited" },
{ "type": 1, "code": "TESS", "operator": "Telangana Co-Operative Electric Supply Society Ltd" },
{ "type": 1, "code": "TSSP", "operator": "Telangana State Southern Power Distribution Compan" },
{ "type": 1, "code": "TPAG", "operator": "Torrent Power Limited - Agra" },
{ "type": 1, "code": "TPAH", "operator": "Torrent Power Limited - Ahmedabad" },
{ "type": 1, "code": "TPBW", "operator": "Torrent Power Limited - Bhiwandi" },
{ "type": 1, "code": "TPCO", "operator": "TP Central Odisha Distribution Limited (TPCODL)" },
{ "type": 1, "code": "TSTP", "operator": "Tripura Electricity Corp Ltd" },
{ "type": 1, "code": "UGVG", "operator": "Uttar Gujarat Vij Company Limited" },
{ "type": 1, "code": "UHBV", "operator": "Uttar Haryana Bijli Vitran Nigam" },
{ "type": 1, "code": "URUP", "operator": "Uttar Pradesh Power Corporation Ltd (RURAL)" },
{ "type": 1, "code": "UUUP", "operator": "Uttar Pradesh Power Corporation Ltd (Urban - Smart Meter)" },
{ "type": 1, "code": "UPUK", "operator": "Uttarakhand Power Corporation Ltd - UPCL" },
{ "type": 1, "code": "WESO", "operator": "WESCO Utility" },
{ "type": 1, "code": "WBSE", "operator": "West Bengal State Electricity Distribution Company Limited" }
];
import Slider from "react-slick";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            RechargeHistory:[],
            recharge_type: 1,
            plans:[],
            operator: "",
            circle: "",
            phone_number:"",
            allStore:[],
            featureDealLink:"",
            show_value:false,
            allCategories:[],
            customerName:"",
            allSlider:[],
            allCoupon:[],
            allOffers:[],
            allCatCoupn:[],
            rates:[],
            login_otp:"",
            BottomSlider:[],
            allDeal:[],
            deal_image:"",
            CouponCat:[],
            FeatureDeal:[]
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        
        this.getSlider()
        this.getAllStore()
        this.getBottomSlider()
        this.getAllCoupon()
        this.getAllOffer()
        this.getDeal()
        this.changeCurrency()
        this.getFeatureDeal()
        this.setState({
            loggedIn: sessionStorage.getItem("_access") ? sessionStorage.getItem("_access") : ""
          })
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }

    changeCurrency = () => {
      // var baseAmt = 100;
      Axios.get(`https://api.exchangeratesapi.io/latest?base=${sessionStorage.getItem("currency")}`, {
        
    }).then(res => {
            console.log(res)
            this.setState({
              rates: res.data['rates'],
              currencies: Object.keys(res.data['rates']).sort(),
              
            })
         
    }, err => {
        console.log("error", err.response)
    })
    }

  convertAmount(baseAmt){
      return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
  }


    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    
    SubscribeForm = (e) => {
      if(this.state.email === ""){
        this.notify("error", "Please enter email address.", "error");
        return false
      }
      Axios.post(`${this.state.url}/admin/auth/subscribe`, {email:this.state.email}, {
    }).then(result => {
      this.notify("success", "Email successfully sent.");
      this.setState({
        email:""
      })
      }, err => {
          // this.loading(false);
          this.notify("error", "Something went wrong.", "error");
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

    getDeal = () => {
      this.setState({
          loading:true
      })
      var shuffleRecord = []
      Axios.get(`${this.state.url}/front/auth/get/deal`, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(res => {
          setTimeout(() => {
            for (var i = res.data.data.category.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = res.data.data.category[i];
              res.data.data.category[i] = res.data.data.category[j];
              res.data.data.category[j] = temp;
              shuffleRecord.push(res.data.data.category[j])
          }
          console.log("temp54545",shuffleRecord)
              this.setState({
                  loading:false,
                  showCat:true,
                  allDeal:shuffleRecord,
                  deal_image:shuffleRecord[0].image
              })
              console.log("this.state.allDeal",this.state.allDeal[0].image)
          }, 100);
          
      }, err => {
          console.log("error", err.response)
      })
      
  }

  getAllStore = () => {
    this.setState({
        loading:true
    })
    var shuffleRecord = []
    Axios.get(`${this.state.url}/front/auth/get/all-store`, {
        headers: {
            token: sessionStorage.getItem('_access')
        }
    }).then(res => {
        setTimeout(() => {
          for (var i = res.data.data.category.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = res.data.data.category[i];
            res.data.data.category[i] = res.data.data.category[j];
            res.data.data.category[j] = temp;
            shuffleRecord.push(res.data.data.category[j])
        }
        console.log("temp22222",shuffleRecord)
            this.setState({
                loading:false,
                showCat:true,
                allStore:res.data.data.category,
                // deal_image:shuffleRecord[0].image
            })
            // console.log("this.state.allDeal",this.state.allDeal[0].image)
        }, 100);
        
    }, err => {
        console.log("error", err.response)
    })
    
}

 


    getSlider = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/slider`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allSlider:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getFeatureDeal = () => {
      this.setState({
          loading:true
      })
      Axios.get(`${this.state.url}/front/auth/get/feature-deal`, {
          
      }).then(res => {
          setTimeout(() => {
              this.setState({
                  loading:false,
                  showCat:true,
                  FeatureDeal:res.data.data.category,
                  featureDealLink : res.data.data.category.deal_id.link
              })
              console.log("FeatureDeal",this.state.FeatureDeal)
          }, 100);
          
          
      }, err => {
          console.log("error", err.response)
      })
      
  }

    getBottomSlider = () => {
      this.setState({
          loading:true
      })
      Axios.get(`${this.state.url}/front/auth/get/bottom-slider`, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(res => {
          setTimeout(() => {
              this.setState({
                  loading:false,
                  showCat:true,
                  BottomSlider:res.data.data.category
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
                console.log("Coupon Venture Collections",this.state.allCoupon)
                console.log("Coupon Venture Collections",this.state.CouponCat)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllOffer = () => {
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
                    allOffers:res.data.data.category
                })
                console.log("this.state.alloffer",this.state.allOffers)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    openCoupon = (e,id) => {
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

      openDetailPage = (e, id) => {
        sessionStorage.setItem("store_id",id)
      }

      OpenCategoryPage = (e, cat_id) => {
        var newPageUrl = 'category-detail';
        sessionStorage.setItem("cat_id",cat_id)
        window.open(newPageUrl, "_self")
      }

      getCatDeal = (e, id) => {
        console.log('aa')
      }

      getCatDeal = (e, cat_id,category=null, stores=null) => {
        var data = {
            cat_id:cat_id,
            category:category ? category : [],
            stores:stores ? stores : []
        }
        // this.setState({
        //     loading:true
        // })
        Axios.post(`${this.state.url}/front/auth/get/category-deal`,{data:data}, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    // loading:false,
                    showCat:true,
                    // allDeal:res.data.data.category,
                    allCatCoupn:res.data.data.CategoryCoupon
                })
                console.log("allstore",this.state.allCatCoupn)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    openPage = (e, type, type_id, link=null) => {
     if(link != null){
      window.open(link, "_blank")
     }
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

    selectRechargeType = (type) => {
      this.setState({
          recharge_type: type,
          phone_number: "",
          circle: "",
          operator: "",
          amount: "",
          disabled: true,
          plans: []
      })
  }

  handleInputChangeMobile = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    if (this.state.recharge_type === 1) {
        // this.loading(true);
        Axios.post(`${this.state.url}/front/auth/recharge/check-operator`, {phone_number:e.target.value}, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(result => {
            // this.loading(false);
            if (result.data.data) {
                if (result.data.data.operator === "UND") {
                  this.notify("error", "No record available for this number.", "error");
                  return false;
                }
                this.setState({
                    operator: result.data.data.operator,
                    circle: result.data.data.circle,
                    disabled: false,
                    plans: []
                })
                // setTimeout(() => { this.getPlans("TUP") }, 200)
            }
        }, err => {
            // this.loading(false);
            this.notify("error", "No record available for this number.", "error");
        })
    } else {
        this.setState({
            operator: "",
            circle: "",
            disabled: false
        })
    }
}

handleInputChange = (e) => {
  this.setState({
      [e.target.name]: e.target.value,
      disabled: false
  })
  if (this.state.recharge_type === 1) {
      if (e.target.name === "operator") {
          this.setState({
              circle: "",
              plans: []
          })
      }
      if (e.target.name === "circle") {
          if (this.state.operator !== "") {
              setTimeout(() => { this.getPlans("TUP") }, 200);
          }
      }
  }
  console.log(this.state.operator)
  // return false;
  // setTimeout(() => {
    if(this.state.recharge_type === 3 && e.target.name === 'operator'){
      Axios.post(`${this.state.url}/front/auth/check/electricity-bill`, {phone_number:this.state.phone_number, operator:e.target.value}, {
        headers: {
            token: sessionStorage.getItem('_access')
        }
    }).then(result => {
      console.log(result); 
          // this.loading(false);
              if (result.data.data.status === "FAILURE") {
                this.notify("error", result.data.data.message, "error");
                this.setState({
                  show_value:false
                })
                return false;
              }else{
                this.setState({
                  customerName: result.data.data.customerName,
                    amount: result.data.data.dueAmount,
                    show_value:true,
                    disabled: false,
                })
              }
              
              // setTimeout(() => { this.getPlans("TUP") }, 200)
      }, err => {
          // this.loading(false);
          this.notify("error", "No record available for this number.", "error");
      })
    }
  // }, 200);
  
}

getPlans = (plan_type, e = null) => {
 
  if (e) e.preventDefault();
  if (this.state.operator === "" || this.state.operator === undefined) {
    this.notify("error", "Please select operator.", "error");
      return false;
  }
  if (this.state.circle === "" || this.state.circle === undefined) {
    this.notify("error", "Please select circle.", "error");
      return false;
  }
  var data = {
      operator: this.state.operator,
      circle: this.state.circle,
      type: plan_type
  }
  this.setState({
    loading:true
})
  Axios.post(`${this.state.url}/front/auth/recharge/get-plans`, {data:data}, {
    headers: {
        token: sessionStorage.getItem('_access')
    }
}).then(res => {
  setTimeout(() => {
    this.setState({
      loading:false,
      plans: res.data.data.details[0].status !== 'failure' ? res.data.data.details : [],
      show_bank_modal: true,
  })
  
  }, 100);
      
  }, error => {
  })
}


getDTHPlan = (plan_type,e = null) => {
 
  if (e) e.preventDefault();
  if (this.state.operator === "" || this.state.operator === undefined) {
    this.notify("error", "Please select operator.", "error");
      return false;
  }
  if (this.state.circle === "" || this.state.circle === undefined) {
    this.notify("error", "Please select circle.", "error");
      return false;
  }
  var data = {
      operator: this.state.operator,
      circle: this.state.circle,
      type: plan_type
  }
  this.setState({
    loading:true,
})
  Axios.post(`${this.state.url}/front/auth/recharge/get/dth-plans`, {data:data}, {
    headers: {
        token: sessionStorage.getItem('_access')
    }
}).then(res => {
  setTimeout(() => {
    this.setState({
      loading:false,
      plans: res.data.data.details,
      show_bank_modal: true,
  })
  console.log(this.state.plans)
  }, 100);
  
      
  }, error => {
  })
}

setAmount = amount => {
  this.setState({
      amount: amount,
      showAmount:true,
      show_bank_modal: false,
  });
  
}

cancelModal = (e) => {
  this.setState({
     show_bank_modal: false,
  })
}
cancelRecharge = (e) => {
  this.setState({
    showCircle:false,
    phone_number:""
  })
}

rechargeBill = (e) => {
  if (this.state.phone_number === "" || this.state.phone_number === undefined) {
    this.notify("error", "Please Enter Customer ID Number.", "error");
      return false;
  }
  if (this.state.operator === "" || this.state.operator === undefined) {
    this.notify("error", "Please select operator.", "error");
      return false;
  }
  if (this.state.amount === "" || this.state.amount === undefined) {
    this.notify("error", "Please enter amount.", "error");
      return false;
  }
  if(!sessionStorage.getItem("_access")){
    this.setState({
      show_login_modal: true,
    })
    return false
  }
  var data = {
    phone_number: this.state.phone_number,
      operator: this.state.operator,
      type: this.state.recharge_type,
      amount: this.state.amount
  }
  this.setState({
    loading:true
})
  Axios.post(`${this.state.url}/front/auth/electricity-recharge`, {data:data}, {
    headers: {
        token: sessionStorage.getItem('_access')
    }
}).then(res => {
  this.setState({
    loading:false,
  })
    if(res.data.message === 'Insufficent Balance'){
      this.notify("error", "Insufficent Balance")
    }else{
      if (res.data.data.details.status !== "FAILED") {
        this.notify("success", res.data.data.details.resText)
        this.setState({
          amount: "",
          phone_number:"",
          showCircle:false,
          show_bank_modal: false,
      });
      } else {
        this.notify("error", res.data.data.details.resText)
      }
    }
  }, err => {
      if (err) {
          this.notify("error", "Something went wrong");
          return false;
      }
      this.notify("error", "Something went wrong.");
      return false;
  })
}

rechargeAction = (e) => {
  if (this.state.phone_number === "" || this.state.phone_number === undefined) {
    this.notify("error", "Please Enter Mobile Number.", "error");
      return false;
  }
  if (this.state.operator === "" || this.state.operator === undefined) {
    this.notify("error", "Please select operator.", "error");
      return false;
  }
  if (this.state.circle === "" || this.state.circle === undefined) {
    this.notify("error", "Please select circle.", "error");
      return false;
  }
  if (this.state.amount === "" || this.state.amount === undefined) {
    this.notify("error", "Please enter amount.", "error");
      return false;
  }
  if(!sessionStorage.getItem("_access")){
    this.setState({
      show_login_modal: true,
    })
    return false
  }
  var data = {
      phone_number: this.state.phone_number,
      operator: this.state.operator,
      circle: this.state.circle,
      type: this.state.recharge_type,
      amount: this.state.amount
  }
  this.setState({
    loading:true
})
  Axios.post(`${this.state.url}/front/auth/recharge`, {data:data}, {
    headers: {
        token: sessionStorage.getItem('_access')
    }
}).then(res => {
  this.setState({
    loading:false,
  })
    if(res.data.message === 'Insufficent Balance'){
      this.notify("error", "Insufficent Balance")
    }else{
      if (res.data.data.details.status !== "FAILED") {
        this.notify("success", res.data.data.details.resText)
        this.setState({
          amount: "",
          phone_number:"",
          showCircle:false,
          show_bank_modal: false,
      });
      } else {
        this.notify("error", res.data.data.details.resText)
      }
    }
  }, err => {
      if (err) {
          this.notify("error", "Something went wrong");
          return false;
      }
      this.notify("error", "Something went wrong.");
      return false;
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
        var settings = {
        className: "slider coupon",
         dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
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
            dots: true,
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
            slidesToShow: 3,
            slidesToScroll: 3,
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
                
          var take_setting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
             responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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


          var trending_setting = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 3,
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
       slidesToShow: 3,
       slidesToScroll: 3,
       infinite: true,
       dots: true
     }
   },
   {
     breakpoint: 767,
     settings: {
       slidesToShow: 2,
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
       slidesToScroll: 1,
     }
   }

 ]
          };


          var play_setting = {
            dots: true,
            infinite: true,
            speed: 500,
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
            slidesToShow: 3,
            slidesToScroll: 3,
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
            slidesToScroll: 1,
          }
        }

      ]
          };


          var venture_setting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
        return <>
        {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <NotificationAlert ref={this.notificationAlert} />
        <Header  />
        
            <Slider {...settings}>
            

            {this.state.allSlider.map((slide, index) => {
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
            return  <div key={index} className="slider-image">
                <a href={cat_type} onClick={(e) => { this.openPage(e, slide.type, slide.type_id, slide.link) }}><img src={this.state.image_url+'slider/'+slide.image} class="d-inline-block align-top"alt=""></img></a>
                
              </div>
            
          })}
        </Slider>
           
                <div class="coupon-day-sec" id="couponday-sec">
                    <div class="container">
                    <h1>Top Coupons of the Day</h1>
                     <img src={require("assets/img/red.png")} alt="logo" class="line"/>
                    {this.state.loggedIn && <>
                    <Slider {...coupn_setting}>
                    
                        {this.state.allCoupon.map((slide, index) => {
                            return   <a href={slide.link} target="_blank" onClick={(e) => { this.openCoupon(e, slide._id) }}>
                                <div class="col-md-12">
                                <div class="coupon-whole-sec">
                                <div class="upper-sec-coupon">
                                    <img src={this.state.image_url+'coupon/'+slide.image} class="d-inline-block align-top"alt=""/>
                                    <div class="text">
                                        <p>{slide.name}</p>
                                        <p>Grab {slide.discount}% Off</p>
                                    </div>
                                </div>
                                <div class="lower-sec-coupon">
                                    <p><a href="#">{slide.description}</a> </p>
                                </div>
                                </div>
                            </div>
                            </a>
                            
                        })}
                </Slider>
                </>}

                {!this.state.loggedIn && <>
                    <Slider {...coupn_setting}>
                    
                        {this.state.allCoupon.map((slide, index) => {
                            return   <a href="javascript:void(0)" onClick={(e) => { this.Login(e) }}>
                                <div class="col-md-12">
                                <div class="coupon-whole-sec">
                                <div class="upper-sec-coupon">
                                    <img src={this.state.image_url+'coupon/'+slide.image} class="d-inline-block align-top"alt=""/>
                                    <div class="text">
                                        <p>{slide.name}</p>
                                        <p>Grab {slide.discount}% Off</p>
                                    </div>
                                </div>
                                <div class="lower-sec-coupon">
                                    <p><a href="#">{slide.description}</a> </p>
                                </div>
                                </div>
                            </div>
                            </a>
                            
                        })}
                </Slider>
                </>}
                    
                    </div>
                    </div>

                    <div class="two-slider-sec">
                        <div class="container">
                        <Slider {...take_setting}>
                        {this.state.BottomSlider.map((slide, index) => {
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
                        return <div class="col-md-12">
                          <a href={cat_type} onClick={(e) => { this.openPage(e, slide.type, slide.type_id) }}>
                            <div class="earn-slider5">
                            
                            <div class="inner-text">
                            <img src={this.state.image_url+'bottom-slider/'+slide.image}/>
                            <div class="banner-txt">
                            <p class="heading">{slide.description}</p>
                            <span><strong>{slide.discount}</strong> <span class="off-texts">%</span><span class="off-text"> Off</span></span>
                            </div>
                            </div>
                        </div>
                        </a>
                        </div>
                         })}
                        </Slider>
                        
                        </div>
                        
                        </div>

            <div class="popular-offer-area-section">
                <div class="container-fuild">
                    <div class="row">
                    <div class="col-md-5" id="popular-tex-sec">
                    <a href="javascript::void()"><h1>Popular Offers <br/>of the Day</h1> </a>
                        <img src="images/white-line.png" class="d-inline-block align-top" alt=""/>
                      <div class="view-all">
                                {/* <a href="javascript:void(0)">View all <i class="fa fa-caret-right" aria-hidden="true"></i></a> */}
                                </div>
                    </div>
                    <div class="col-md-7" id="popular-img-sec">
                        <div class="offer-second-section">
                        <ul class="main-sec">
                        {this.state.allOffers.map((slide, index) => {
                          if(index <6){
                            return  <a href="javascript:void()" onClick={(e) => { this.OpenOfferDetail(e, slide._id) }}>
                            <li class="big-img">
                                <img src={this.state.image_url+'offer/'+slide.image}></img>
                                <div class="offer-tag">
                                    <p>Up To {slide.discount}% Off</p>
                                </div>
                                <div class="text">
                                <p>{slide.description}</p>
                                </div>
                            </li>
                            </a>
                          }
                            // <div key={index} className="slider-image">
                            //     <img src={this.state.image_url+'slider/'+slide.image} class="d-inline-block align-top"alt=""></img>
                            // </div>
                            
                        })}
                            
                            
                            
                            
                        </ul>
                        
                        </div>
                        </div>
                    </div>
                    </div>
                </div>


        <div class="popular-section">
            <div class="container">
                <h1>Trending Deals</h1>
                 <img src={require("assets/img/red.png")} alt="logo"/>
                <div class="row ">
                <div class="col-md-8 sliderpopular">
                  <div class="whole-store-section">
                <Slider {...trending_setting}>
                    
                    {this.state.allDeal.map((slide, index) => {
                       var discount_type = "";
                       if(sessionStorage.getItem("currency") == 'INR'){
                         discount_type = "₹"
                       }else{
                         discount_type = sessionStorage.getItem("currency");
                       }
                        return   <div class="col-md-12">
                        <a class="trending-deal" href="/store-detail" onClick={(e) => { this.openDetailPage(e, slide.store_id._id) }}>
                            <ul class="whole-popular-section">
                            <li class="img">
                                <img src={this.state.image_url+'deal/'+slide.image} class="d-inline-block align-top"alt=""/>
                            </li>
                            <li class="text">
                                <p class="heading">{slide.store_id.name}</p>
                                {slide.discount_type == 'percent' && <><p class="offer">Flat {slide.discount} % Off</p> </>}

                                {slide.discount_type == 'amount' && <><p class="offer">Flat {discount_type} {this.convertAmount(slide.discount)} Off</p> </>}
                            </li>
                            </ul>
                          </a>  
                        </div>
                        
                    })}
            </Slider>
            </div>
                {/* <Slider {...trending_setting}>
                {this.state.allDeal.map((list, index) => {
                    return <div class="whole-store-section ">
                    <div class="row">
                    {this.state.allDeal.length > 0 && <>
                      {this.state.allDeal.map((slide, index) => { 
                          if(index <10){
                            var discount_type = "";
                            if(sessionStorage.getItem("currency") == 'INR'){
                              discount_type = "₹"
                            }else{
                              discount_type = sessionStorage.getItem("currency");
                            }
                    return  <div class="col-md-4">
                        <a class="trending-deal" href="/store-detail" onClick={(e) => { this.openDetailPage(e, slide.store_id._id) }}>
                            <ul class="whole-popular-section">
                            <li class="img">
                                <img src={this.state.image_url+'deal/'+slide.image} class="d-inline-block align-top"alt=""/>
                            </li>
                            <li class="text">
                                <p class="heading">{slide.store_id.name}</p>
                                {slide.discount_type == 'percent' && <><p class="offer">Flat {slide.discount} % Off</p> </>}

                                {slide.discount_type == 'amount' && <><p class="offer">Flat {discount_type} {this.convertAmount(slide.discount)} Off</p> </>}
                            </li>
                            </ul>
                          </a>  
                        </div>
                         }
                        })}
                        </>}
                        

                        
                    </div>
                    </div>
                    })}
                    
                </Slider> */}

                    
                    
                </div>
                <div class="col-md-4" id="fav-sec">
                    <div class="upper-text-sec">
                    <p> Featured Deal</p>
                    </div>
                    <div class="lower-section">
                    <ul>
                        <li><img src={this.state.image_url+'featured-deal/'+this.state.FeatureDeal.image} class="d-inline-block align-top"alt=""/></li>
                        <li class="btn"><a href={this.state.featureDealLink} class="offer-btn">Offer Available</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div class="coupon-offer-section">
                <div class="container">
                    <h1>Save at all your Favourite Stores</h1>
                    <img src={require("assets/img/red.png")} alt="logo"/>
                    <div class="coupon-navigation">
                        <ul class="nav justify-content-center">
                       
                        {this.state.allStore.length > 0 && <>
                            {this.state.allStore.map((list, index) => {
                              if(index <= 14){
                            return <li>
                               <a class="nav-link" href="/store-detail" onClick={(e) => { this.openDetailPage(e, list._id) }}>{list.name}</a>
                            </li>
                              }
                        })}
                        </>}
                        </ul>
                    </div> 
                    <div class="coupon-section-main">
                        <div class="row">
                        {this.state.allStore.length > 0 && <>
                            {this.state.allStore.map((list, index) => {
                              if(index <= 7){
                            return <div class="col-md-3">
                              <a href="/store-detail" onClick={(e) => { this.openDetailPage(e, list._id) }}>
                            <div class="coupon-whole-sec">
                                <div class="upper-sec-coupon" id="store-section">
                                <img src={this.state.image_url+'store/'+list.image} class="d-inline-block align-top"alt=""/>
                                <div class="text">
                                    <p>{list.name}</p>
                                    <p>{list.description}</p>
                                </div>
                                </div>
                                <div class="lower-sec-coupon">
                                <p>{list.name}</p>
                                </div>
                            </div>
                            </a>
                            </div>
                            
                              }
                        })}
                        </>}
                    </div>
                    </div>
                    <div class="show-btn">
                        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Show More</button> */}
                    </div>
                    

                </div>
                </div>


        <div class="tranding-deal-colllection">
            <div class="container">
            <h1>Play and Earn with Coupon Ventures</h1>
             <img src={require("assets/img/red.png")} alt="logo"/>
            <div class="trend-background">
            {this.state.loggedIn && <>
            <Slider {...coupn_setting}>
                    
              {this.state.allCoupon.map((slide, index) => {
                if(index <= 9){
                  return   <a href={slide.link} target="_blank" onClick={(e) => { this.openCoupon(e, slide._id) }}>
                      <div class="col-md-12">
                      <div class="earn-slider">
                      <div class="background-img-sec-1">
                      <img src={this.state.image_url+'coupon/'+slide.image} class="d-inline-block align-top"alt=""/>
                      </div>
                      <div class="inner-text">
                        <p class="heading">{slide.name}</p>
                        <p class="offer">Flat {slide.discount}% Off</p>
                        <p class="text">{slide.description}</p>
                        </div>
                      </div>
                  </div>
                  </a>
                }
              })}
                </Slider>
                </>}

                {!this.state.loggedIn && <>
            <Slider {...coupn_setting}>
                    
              {this.state.allCoupon.map((slide, index) => {
                if(index <= 9){
                  return   <a href={slide.link} onClick={(e) => { this.Login(e) }}>
                      <div class="col-md-12">
                      <div class="earn-slider">
                      <div class="background-img-sec-1">
                      <img src={this.state.image_url+'coupon/'+slide.image} class="d-inline-block align-top"alt=""/>
                      </div>
                      <div class="inner-text">
                        <p class="heading">{slide.name}</p>
                        <p class="offer">Flat {slide.discount}₹ Off</p>
                        <p class="text">{slide.description}</p>
                        </div>
                      </div>
                  </div>
                  </a>
                }
              })}
                </Slider>
                </>}
            
            </div>
                <div class="show-btn">
                {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Show More</button> */}
                </div>
            </div>
            </div>

            <div class="trending-deal-mobile-heading">
              <h1>Mobile Recharge or Bill Payment</h1>
              <img src={require("assets/img/red.png")} alt="logo"/>
            </div>

            <div class="tranding-deal-colllection" id="recharge-step">
                <div class="container">
                {/*<h1>Recharge in 3 Simple steps</h1>*/}
                <img src="images/red.png" class="d-inline-block align-top"alt=""/>
                  {/*<div class="col-md-12">
                   <div class="row">
                    <div class="col-md-4">
                        <div class="step-section">
                        <a href="javascript:void(0)">
                        <div class="stop-icon">
                            <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                        </div>
                        <div class="text-step add-text-sec">
                            <span>Enter</span>
                            <h3 class="rec-details">Recharge Details</h3>
                        </div>
                        </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="step-section">
                        <a href="javascript:void(0)">
                        <div class="stop-icon">
                            <span><i class="fa fa-credit-card" aria-hidden="true"></i></span>
                        </div>
                        <div class="text-step">  
                            <span><span class="plus">+</span> Make</span>
                            <h3>Payment</h3>
                        </div>
                        </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="step-section">
                        <a href="javascript:void(0)">
                        <div class="stop-icon">
                            <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                        </div>
                        <div class="text-step add-text-sec">
                            <span>Get</span>
                            <h3 class="rec-details">Recharge + Free Coupon</h3>
                        </div>
                        </a>
                        </div>
                    </div>
                    </div>
                    <div class="show-more-details">
                    <a href="javascript:vold(0)">Show More Details</a>
                    </div>
                </div>*/}

                   <ul class="recharge-icon-section">
                      <li class="" >
                        <a href='javascript:void()' style={this.state.recharge_type === 1 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(1) }}>
                        <img class="mobile-icon" src={require("assets/img/mobile-icon.png")}/>
                        <img class="mobile-icon-red" src={require("assets/img/mobile-red.png")}/>
                         <p>Mobile</p>
                         </a>
                      </li>
                      {/*<li>
                      <a href='javascript:void()' style={this.state.recharge_type === 2 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(2) }}>
                        <img class="dth-recharge" src={require("assets/img/inactive_DTH.png")}/>
                        <p>Mobile Prepaid</p>
                        </a>
                      </li>*/}
                      <li>
                      <a href='javascript:void()' style={this.state.recharge_type === 2 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(2) }}>
                         <img class="dth-recharge" src={require("assets/img/dth-white.png")}/>
                         <img class="dth-recharge-red" src={require("assets/img/dth-red.png")}/>
                          <p>Dth Recharge</p>
                          </a>
                      </li>
                       <li>
                      <a href='javascript:void()' style={this.state.recharge_type === 3 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(3) }}>
                         <img src={require("assets/img/electricity.png")}/>
                          <p>Electricity</p>
                          </a>
                      </li>
                       {/*<li>
                      <a href='javascript:void()' style={this.state.recharge_type === 3 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(3) }}>
                         <img src={require("assets/img/dth-icon.png")}/>
                          <p>Dth</p>
                          </a>
                      </li>
                       <li>
                      <a href='javascript:void()' style={this.state.recharge_type === 3 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(3) }}>
                         <img src={require("assets/img/dth-icon.png")}/>
                          <p>Broadband</p>
                          </a>
                      </li>
                       <li>
                      <a href='javascript:void()' style={this.state.recharge_type === 3 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(3) }}>
                         <img src={require("assets/img/dth-icon.png")}/>
                          <p>More</p>
                          </a>
                      </li>*/}
                     
                    </ul>

                  <div class="recharge-form">
                    <h1>Recharge Now</h1>
                    {this.state.recharge_type == 1 && <>
                      <ul class="mobile-radio-btn">
                         <li><input type="radio" id="postpaid" name="mobile" value="postpaid"></input><label>Postpaid</label></li>
                         <li><input type="radio" id="prepaid" name="mobile" value="prepaid"></input><label>Prepaid</label></li>
                       </ul>
                       </>}

                      <ul class="inner-form">
                        <li>
                        {this.state.recharge_type === 1 && <>
                            <input value={this.state.phone_number}
                                placeholder="Enter Mobile Number"
                                name="phone_number"
                                type="number"
                                max="10"
                                onBlur={(e) => this.handleInputChangeMobile(e)}
                                onChange={(e) => this.handleInputChange(e)}></input>
                                </>}
                        {this.state.recharge_type === 2 && <>
                          <input
                              value={this.state.phone_number}
                              placeholder="Enter Customer ID"
                              name="phone_number"
                              type="number"
                              max="10"
                              onChange={(e) => this.handleInputChange(e)}
                          /></>}
                          {this.state.recharge_type === 3 && <>
                          <input
                              value={this.state.phone_number}
                              placeholder="Enter Customer ID"
                              name="phone_number"
                              type="number"
                              onChange={(e) => this.handleInputChange(e)}
                          /></>}
                        </li>
                        <li>
                        {this.state.recharge_type === 1 && 
                        <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                          <option value="">Select Operator</option>
                          {operators.map((ope, key) => {
                              if (ope.type === 1) {
                                  return <option value={ope.code}>{ope.operator}</option>
                              }
                        })}
                        </select>
                        }

                        {this.state.recharge_type === 2 && 
                        <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                          <option value="">Select Operator</option>
                          {operators.map((ope, key) => {
                              if (ope.type === 2) {
                                  return <option value={ope.code}>{ope.operator}</option>
                              }
                        })}
                        </select>
                        }

                        {this.state.recharge_type === 3 && 
                        <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                          <option value="">Select Operator</option>
                          {electricity_operators.map((ope, key) => {
                                  return <option value={ope.code}>{ope.operator}</option>
                              
                        })}
                        </select>
                        }
                        </li>
                        
                        {this.state.recharge_type != 3 &&
                        <li> 
                        <select name="circle" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.circle} disabled={this.state.disabled}>
                            <option value="">Select Circle</option>
                            {circles.map((cr, key) => {
                                return <option value={cr.code} key={"cr" + key}>{cr.circle}</option>;
                            })}
                            </select>
                        </li>
                        }
                       {this.state.recharge_type == 1 && <> <li>
                          <input type="text" name="amount" value={this.state.amount} placeholder="Amount" onChange={(e) => this.handleInputChange(e)}></input><a href="javascript:void()" class="get-plan-sec" onClick={(e) => { this.getPlans('TUP',e) }}>Get Plan</a>
                        </li>
                        </>}

                        {this.state.recharge_type === 2 && <> <li>
                          <input type="text" name="amount" value={this.state.amount} placeholder="Amount" onChange={(e) => this.handleInputChange(e)}></input><a href="javascript:void()" class="get-plan-sec" onClick={(e) => { this.getDTHPlan(2,e) }}>Get Plan</a>
                        </li>
                        </>}

                        {this.state.recharge_type === 3 && this.state.show_value === true && <> <li>
                        <input type="text" name="amount" value={this.state.amount} placeholder="Amount" onChange={(e) => this.handleInputChange(e)}></input>
                          
                        </li>
                        <li>
                        Customer Name: {this.state.customerName}
                        </li>
                        </>}
                        
                      </ul>
                      <ul class="btn-recharge-sec">
                          <li class="recharge-btn">
                          {this.state.recharge_type != 3 && <><input type="submit" class="submit-btn" value="Proceed to Recharge" onClick={(e) => { this.rechargeAction() }}></input></>}

                          {this.state.recharge_type == 3 && <><input type="submit" class="submit-btn" value="Proceed to Recharge" onClick={(e) => { this.rechargeBill() }}></input></>}
                          {/*<input type="submit" class="submit-btn" value="Cancel" onClick={(e) => { this.cancelRecharge() }}></input>*/}                     </li>
                      </ul>
                  </div>

                </div>
                </div>
                <div class="venture-colllection">
                <div class="container">
                <h1>Coupon Venture Collections</h1>
               {/* <Slider {...play_setting}> 
                {this.state.CouponCat.map((slide, index) => {
                  return <div class="col-md-12">
                    <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, slide._id) }}>
                    <div class="earn-slider">
                    <div class="background-img-sec-1">
                    <img alt="image" src={this.state.image_url+'category/'+slide.image}/>
                    <p>{slide.cat_name}</p>
                    </div>
                    </div>
                    </a>
                </div>
                 })}

                </Slider>*/}
                
                </div>
                </div>

        <div class="container">
          <ul class="coupon-venture-collection">
          <Slider {...play_setting}> 
          {this.state.CouponCat.map((slide, index) => {
            return<li>
             
              <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, slide._id) }}>
              <div class="inner-list-area" >
                {/* <p class="main-heading">Trendy Fashion</p> */}
                 <ul class="list-unstyled">
                   <h3>{slide.cat_name}</h3>
                   
                 {this.state.allCoupon.map((sl, index) => {
                   if(sl.category_id._id == slide._id){
                  return <li>
                      <img src={this.state.image_url+'coupon/'+sl.image} alt="amazon-name"/>
                      <p>{sl.name}</p>
                      <p>Discount: {sl.discount}%</p>
                    </li>
                   }
                     })}
                 </ul>
                 <div class="image-overlay-sec">
                   {/* <p>Make Store</p> */}
                   <img src={this.state.image_url+'category/'+slide.banner_image} alt="banner-collection.jpeg"/>
                   <span>{slide.cat_name}</span>
                 </div>
              </div>
              </a>
            </li>
            
            })}
          </Slider>
            
          </ul>
        </div>

          <div class="newsletter-form">
                <div class="container">
                <div class="row">
                    <div class="col-md-6">
                    <h3>Subscribe to Coupon Venture</h3>
                    <p>Subscribe to get the best deals & Offers in your email.</p>
                    </div>
                    <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group mb-2">
                        <input type="email"  value={this.state.email} name="email" onChange={(e) => { this.handleInput(e) }} class="form-control" id="exampleFormControlInput1" placeholder="Enter email address"/>
                        </div>
                        <button type="button" class="btn btn-primary mb-2" onClick={(e) => { this.SubscribeForm(e) }}>Subscribe</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <div class="footer-menu-section">
                <div class="container">
                <div class="row">
                    <div class="col-md-2" id="address-details">
                 
                        <div class="new-footer">
                           <a class="footer-logo" href="/"><img src={require("assets/img/LOGO-original.png")} class="d-inline-block align-top"alt=""/></a>
                        </div>
                        <div class="address-sec">
                          <p>Driving Way For  Fabricating The Planet A Soverign Place to Buy With Wonderful Savings</p>
                        </div>
                        <div class="social-links">
                          <ul>
                            <li><a href="https://www.facebook.com/couponventures.in/"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://www.instagram.com/couponventures/"><i class="fab fa-instagram-i"></i></a></li>
                            <li><a href="https://twitter.com/coupon_ventures"><i class="fab fa-twitter-t"></i></a></li>
                            <li><a href="https://in.pinterest.com/coupon_ventures/"><i class="fab fa-pinterest-p"></i></a></li>
                            <li><a href="https://t.me/couponventures"><i class="far fa-paper-plane"></i></a></li>
                            <li><a href="https://www.linkedin.com/company/couponventures"><i class="fab fa-linkedin-in"></i></a></li>
                          </ul>
                        </div>
                    
                    </div>
                    <div class="col-md-3">
                      <div class="question-se">
                   <h3> Got Question? Call us 24/7</h3>
                   <h2> +91 6366666760</h2>
                   <p>24x7 Available Products</p>       
                   <span class="location"><a href="javascript:void(0)"><i class="fas fa-map-marker-alt"></i> View On Map </a></span>
                        <ul class="footer-nav-list" id="google-play-store">
                            <li><a class="footer-play" href="/"><img src={require("assets/img/g-play.png")} class="d-inline-block align-top"alt=""/></a></li>
                            <li><a href="#"></a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    </div>
                    <div class="col-md-3">
                      <div class="question-se">
                   <h3>We Using</h3>
                   <h2>Safe Payments</h2>
                  <span class="payment-imag"><img src={require("assets/img/skril-1.png")} alt=""/></span>
                  <span class="payment-imag"><img src={require("assets/img/palypal-1.png")} alt=""/></span>
                  <span class="payment-imag"><img src={require("assets/img/american_express-1.png")} alt=""/></span>
                  <div class="secured-by">
                    <h5>Secured by</h5>
                    <span class="payment-imag"><img src={require("assets/img/norton_av_logo1.png")} alt=""/></span>
                    <span class="payment-imag"><img src={require("assets/img/mcAfee_logo1.png")} alt=""/></span>
                  </div>
                        
                    </div>
                    </div>
                     <div class="col-md-2 col-6">
                    <h4>Company</h4>
                        <ul class="footer-nav-list" id="nav-side-sec">
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/term-condition">Terms Of Use</a></li>
                        <li><a href="/refund">Refund Policy</a></li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-6" id="nav-side-sec">
                        <h4>category</h4>
                        <ul class="footer-nav-list">
                        {this.state.CouponCat.map((slide, index) => {
                          if(index <= 6){
                          return <li><a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, slide._id) }}>{slide.cat_name}</a></li>
                          }
                        })}
                            
                            
                        </ul>
                    </div>
                    
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

            <Modal
               show={this.state.show_bank_modal}
               onHide={(e) => this.cancelModal()}
               dialogClassName="modal-90w  poromtio-line"
               size="lg"
               aria-labelledby="example-custom-modal-styling-title"
            >
               <Modal.Header closeButton>

                  <Modal.Title id="example-custom-modal-styling-title">
                     View Promotion Code
                </Modal.Title>

               </Modal.Header>
               <Modal.Body>
              {this.state.recharge_type === 1 && this.state.operator !== "" && this.state.circle !== "" && <Row>
               <Col xs="12">
                  
                      <CardHeader>
                          <Row>
                              <Col className="text-left" md="12">
                                  {/* <h5 className="card-category">Total Income</h5> */}
                                  <CardTitle tag="h2" style={{ color: "#fff" }}>Choose Your Plan</CardTitle>
                              </Col>
                              <Col className="mb-4" md="12" style={{ overflowX: "auto", height: "40px" }}>
                                  <ButtonGroup className="btn-group-toggle" data-toggle="buttons" style={{ width: "930px", float: "none !important" }}>
                                      <Button tag="label" className="btn-simple active" color="info" id="0" size="sm" onClick={(e) => { this.getPlans("TUP", e) }}>
                                          <input defaultChecked className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              Top-up
                                          </span>
                                          <span className="d-block d-sm-none">
                                              Top-up
                                          </span>
                                      </Button>
                                      <Button color="info" id="1" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("FTT", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              Full Talk-time
                                          </span>
                                          <span className="d-block d-sm-none">
                                              Full Talk-time
                                          </span>
                                      </Button>
                                      {/* <Button color="info" id="2" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("2G", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              2G Data
                                          </span>
                                          <span className="d-block d-sm-none">
                                              2G Data
                                          </span>
                                      </Button> */}
                                      <Button color="info" id="3" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("3G", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              3G/4G Data
                                          </span>
                                          <span className="d-block d-sm-none">
                                              3G/4G Data
                                          </span>
                                      </Button>
                                      <Button color="info" id="4" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("SMS", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              SMS Pack
                                          </span>
                                          <span className="d-block d-sm-none">
                                              SMS Pack
                                          </span>
                                      </Button>
                                      <Button color="info" id="5" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("LSC", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              Local/STD/ISD Call
                                          </span>
                                          <span className="d-block d-sm-none">
                                              Local/STD/ISD Call
                                          </span>
                                      </Button>
                                      <Button color="info" id="6" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("RMG", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              National/International Roaming
                                          </span>
                                          <span className="d-block d-sm-none">
                                              National/International Roaming
                                          </span>
                                      </Button>
                                      <Button color="info" id="7" size="sm" tag="label" className="btn-simple" onClick={(e) => { this.getPlans("OTR", e) }}>
                                          <input className="d-none" name="options" type="radio" />
                                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                              Other
                                          </span>
                                          <span className="d-block d-sm-none">
                                              Other
                                          </span>
                                      </Button>
                                  </ButtonGroup>
                              </Col>
                          </Row>
                      </CardHeader>
                      <CardBody>
                          <Table className="tablesorter" responsive>
                              <thead className="text-primary">
                                  <tr>
                                      <th>Details</th>
                                      <th>Validity</th>
                                      <th>Talktime</th>
                                      <th className="text-center">Amount</th>
                                  </tr>
                              </thead>
                              {this.state.plans.length > 0 &&
                                  <tbody>
                                      {this.state.plans.map((pl, k) => {
                                          return <tr key={"plan" + k}>
                                              <td>{pl.detail.replace('&amp;', "&")}</td>
                                              <td>{pl.validity}</td>
                                              <td>{pl.talktime}</td>
                                              <td className="text-center">
                                                <a href='javascript::void()' onClick={() => { this.setAmount(pl.amount) }}>
                                                ₹{pl.amount}
                                                </a>
                                                </td>
                                          </tr>
                                      })}

                                  </tbody>}
                              {this.state.plans.length === 0 &&
                                  <tbody>
                                      <tr>
                                          <td colSpan="100%">No plans found</td>
                                      </tr>
                                  </tbody>
                              }
                          </Table>
                      </CardBody>
                 
              </Col>
              </Row>}


              {this.state.recharge_type === 2 && this.state.operator !== "" && this.state.circle !== "" && <Row>
               <Col xs="12">
                  
                      
                      <CardBody>
                          <Table className="tablesorter" responsive>
                              <thead className="text-primary">
                                  <tr>
                                      <th>Details</th>
                                      <th>Validity</th>
                                      <th>Plan Name</th>
                                      <th>Talktime</th>
                                      <th className="text-center">Amount</th>
                                  </tr>
                              </thead>
                              {this.state.plans.length > 0 &&
                                  <tbody>
                                      {this.state.plans.map((pl, k) => {
                                          return <tr key={"plan" + k}>
                                              <td>{pl.Description}</td>
                                              <td>{pl.Validity}</td>
                                              <td>{pl.PlanName}</td>
                                              <td>{pl.Amount}</td>
                                              <td className="text-center">
                                                <a href='javascript::void()' onClick={() => { this.setAmount(pl.Amount) }}>
                                                ₹{pl.Amount}
                                                </a>
                                                </td>
                                          </tr>
                                      })}

                                  </tbody>}
                              {this.state.plans.length === 0 &&
                                  <tbody>
                                      <tr>
                                          <td colSpan="100%">No plans found</td>
                                      </tr>
                                  </tbody>
                              }
                          </Table>
                      </CardBody>
                 
              </Col>
              </Row>}
               </Modal.Body>
            </Modal>

        </>;
    }
}

export default Login;