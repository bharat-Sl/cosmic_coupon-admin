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
import InnerHeader from "components/Navbars/Innerheader";
import Footer from "components/Navbars/Frontfooter";
import RightSidebar from "components/Navbars/Rightsidebar";
import LeftSidebar from "components/Navbars/Leftsidebar";
import { Modal } from "react-bootstrap";
import * as moment from "moment";
import Slider from "react-slick";
const rechargeLableSelected = {
  padding: "15px",
  background: "blue",
  color: "#fff",
  borderRadius: "5px"
}
const rechargeLable = {
  padding: "10px",
  background: "blue",
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
class Recharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            operator: "",
            circle: "",
            phone_number:"",
            allDeal:[],
            allCoupon:[],
            show_bank_modal:false,
            allOffers:[],
            showCircle:false,
            storeArr:[],
            RechargeHistory:[],
            show_value:false,
            recharge_type: 1,
            plans:[],
            showAmount:false,
            WalletAmount:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getRechargeHistory()
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

    getRechargeHistory = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/rechage/history`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
              console.log("res.data.data.category",res.data.data.recharge_detail)
                this.setState({
                    loading:false,
                    showCat:true,
                    RechargeHistory:res.data.data.recharge_detail
                })
                console.log("this.state.RechargeHistory",this.state.RechargeHistory)
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

    selectRechargeType = (type) => {
      this.setState({
          recharge_type: type,
          showCircle:false,
          phone_number: "",
          circle: "",
          operator: "",
          amount: "",
          disabled: true,
          plans: []
      })
  }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    })
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
  }
  CheckOPerator = (e) => {
    if (this.state.phone_number === "" || this.state.phone_number === undefined) {
      this.notify("error", "Please enter phone number.", "error");
        return false;
    }
    if (this.state.recharge_type === 1 || this.state.recharge_type === 2 || this.state.recharge_type === 3) {
      this.setState({
        loading:true
    })
        // this.loading(true);
        Axios.post(`${this.state.url}/front/auth/recharge/check-operator`, {phone_number:this.state.phone_number}, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(result => {
        console.log("recharge",result.data.data.circle)
            // this.loading(false);
            if (result.data.data) {
                if (result.data.data.operator === "UND") {
                  this.notify("error", "No record available for this number.", "error");
                    return false;
                }
                this.setState({
                  showCircle:true,
                  loading:false,
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
    console.log("res.data.data[0].details",res.data.data.details)
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
              WalletAmount:total_amount.toFixed()
          })
          console.log("wallet amount",this.state.WalletAmount)
      }, 100);
      
  }, err => {
      console.log("error", err.response)
  })
  
}

    render() {
      var coupn_setting = {
        className: "coupon-slider",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
      }
       

      

        return <>
        {this.state.loading && <>
                <div class="loading">Loading&#8230;</div>
                </> }
        <InnerHeader  />
        <div class="dashboard-background">
        <NotificationAlert ref={this.notificationAlert} />
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="recharge-whole-section">
                 <div class="page-heading"> 
                   <h1>Recharge</h1>
                 </div>
                <div class="row">
                   <div class="col-md-6">
                     <div class="form-sec">
                       <ul class="add-money-sec">
                           <li class="right">
                             <p>Wallet Balance</p>
                             <h1><i class="fa fa-inr" aria-hidden="true"></i>{this.state.WalletAmount}</h1>
                           </li>
                           <li class="left">
                             <p><img src={require("assets/img/white-wallet.png")} alt="dashboard"/></p>
                           </li>
                         </ul>
                            <ul class="payment-sec">

                            <label className="mr-2" style={this.state.recharge_type === 1 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(1) }}>
                            <img src={require("assets/img/recharge-service-white.png")} alt="dashboard" class="recharge-img"/>
                            <p>Prepaid</p>
                            </label>
                            <label className="mr-2" style={this.state.recharge_type === 1 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(1) }}>
                            <img src={require("assets/img/recharge-service-white.png")} alt="dashboard" class="recharge-img"/>
                            <p>Postpaid</p>
                            </label>
                            <label className="mr-2" style={this.state.recharge_type === 2 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(2) }}>
                            <img src={require("assets/img/dth.png")} alt="dashboard" class="recharge-img"/>
                            <p>DTH</p>
                              </label>

                              <label className="mr-2" style={this.state.recharge_type === 3 ? rechargeLableSelected : rechargeLable} onClick={(e) => { this.selectRechargeType(3) }}>
                            <img src={require("assets/img/electricity.png")} alt="dashboard" class="recharge-img"/>
                            <p>Electricity</p>
                              </label>
                           {/* <li>
                             <i class="fa fa-mobile" aria-hidden="true"></i>
                             <p>Prepaid</p>
                           </li>
                           <li>
                             <i class="fa fa-mobile" aria-hidden="true"></i>
                             <p>Postpaid</p>
                           </li>
                           <li>
                            <i class="fa fa-mobile" aria-hidden="true"></i>
                             <p>Dth</p>
                           </li>
                           <li>
                            <i class="fa fa-mobile" aria-hidden="true"></i>
                             <p>Digital Store</p>
                           </li> */}
                         </ul>
                         

                       <ul class="form-area">
                         {/* <li class="paragraph">
                           <h4>Quick & Easy Recharge</h4>
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                         </li> */}
                         <li class="inner-form">
                            <form action="#">
                              <FormGroup>
                              {this.state.recharge_type === 1 && <>
                              <label>Mobile Number</label>
                              <input type="number" maxLength="10" name="phone_number" id="phone_number" onChange={(e) => this.handleInputChange(e)} name="phone_number" value={this.state.phone_number} placeholder="Enter Your Number"/><br></br></>}

                              {this.state.recharge_type === 2 && <>
                              <label>Enter Customer ID</label>
                              <input type="number" maxLength="10" name="phone_number" id="phone_number" onChange={(e) => this.handleInputChange(e)} name="phone_number" value={this.state.phone_number} placeholder="Enter Customer ID"/><br></br></>}

                              {this.state.recharge_type === 3 && <>
                                <label>Enter Customer ID</label>
                              <input type="number" name="phone_number" id="phone_number" onChange={(e) => this.handleInputChange(e)} name="phone_number" value={this.state.phone_number} placeholder="Enter Customer ID"/><br></br>
                              </>}
                              
                              </FormGroup>
                              {this.state.showCircle && <>

                                {this.state.recharge_type === 1 && <Col className="px-md-1" >
                                            <FormGroup>
                                                <label>Select Operator</label>
                                                <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                                                    <option value="">Select Operator</option>
                                                    {operators.map((ope, key) => {
                                                        if (ope.type === 1) {
                                                            return <option value={ope.code}>{ope.operator}</option>
                                                        }
                                                    })}
                                                </select>
                                            </FormGroup>
                                        </Col>}
                                        {this.state.recharge_type === 2 && <Col className="px-md-1">
                                            <FormGroup>
                                                <label>Select Operator</label>
                                                <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                                                    <option value="">Select Operator</option>
                                                    {operators.map((ope, key) => {
                                                        if (ope.type === 2) {
                                                            return <option value={ope.code}>{ope.operator}</option>
                                                        }
                                                    })}
                                                </select>
                                            </FormGroup>
                                        </Col>}
                                        {this.state.recharge_type === 3 && <Col className="px-md-1">
                                            <FormGroup>
                                                <label>Select Operator</label>
                                                <select name="operator" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.operator} disabled={this.state.disabled}>
                                                    <option value="">Select Operator</option>
                                                    {electricity_operators.map((ope, key) => {
                                                            return <option value={ope.code}>{ope.operator}</option>
                                                    })}
                                                </select>
                                            </FormGroup>
                                        </Col>}
                            {this.state.recharge_type != 3 &&
                              <FormGroup>
                              <label>Select Circle</label>
                                <select name="circle" className="form-control" onChange={(e) => this.handleInputChange(e)} value={this.state.circle} disabled={this.state.disabled}>
                                    <option value="">Select Circle</option>
                                    {circles.map((cr, key) => {
                                        return <option value={cr.code} key={"cr" + key}>{cr.circle}</option>;
                                    })}
                                </select>
                              </FormGroup>
                            }
                              {this.state.recharge_type === 1 || this.state.recharge_type === 2 && <> <FormGroup>
                                <label>Amount</label>
                                
                                <input type="number" name="amount" id="amount-sec" onChange={(e) => this.handleInputChange(e)} value={this.state.amount}></input>
                                
                                {this.state.recharge_type === 1 && <> <a href="javascript:void()" class="get-plan-btn" onClick={(e) => { this.getPlans('TUP',e) }}>Get Plan</a></>}


                                {this.state.recharge_type === 2 && <> <a href="javascript:void()" class="get-plan-btn" onClick={(e) => { this.getDTHPlan(2,e) }}>Get Plan</a></>}
                                
                              </FormGroup>
                              </>}
                              {this.state.recharge_type === 3 && this.state.show_value === true && <> <FormGroup>
                                <label>Amount</label>
                                
                                <input type="number" name="amount" id="amount-sec" onChange={(e) => this.handleInputChange(e)} value={this.state.amount}></input>
                                
                                <label>Customer Name: {this.state.customerName}</label>
                                
                              </FormGroup>
                              </>}
                              {this.state.recharge_type != 3 && <> <input type="button" onClick={(e) => { this.rechargeAction() }} value="Recharge" id="Recharge"/> </>}

                              {this.state.recharge_type == 3 && <> <input type="button" onClick={(e) => { this.rechargeBill() }} value="Recharge" id="Recharge"/> </>}
                              
                                <input type="button" onClick={(e) => { this.cancelRecharge() }} value="Cancel" id="Cancel"/>
                                </>}
                                {!this.state.showCircle && <>
                              <input type="button" onClick={(e) => { this.CheckOPerator() }} value="Submit" id="submit"/>
                              </>}
                            </form> 
                          </li>
                      </ul>
                     </div>
                   </div>
                   <div class="col-md-6">
                     <div class="form-detail-sec">
                       <h1 class="heading">Transaction History</h1>
                       {this.state.RechargeHistory.length > 0 && <>
                            {this.state.RechargeHistory.map((list, index) => {
                      return <ul class="detail" id="processing">
                         <li class="left">
                           <p><i class="fa fa-inr" aria-hidden="true"></i>{list.amount}</p>
                         </li>
                         <li class="right">
                          {list.recharge_type === 1 && <>
                         {list.operator == 'VF' || list.operator == 'IDX' && <>
                         <img src={require("assets/img/vodaphone.png")} alt="dashboard"/>
                         </>}

                         {list.operator == 'AT' && <>
                         <img src={require("assets/img/airtel.jpeg")} alt="dashboard"/>
                         </>}

                         {list.operator == 'JO' && <>
                         <img src={require("assets/img/jio.png")} alt="dashboard"/>
                         </>}
                         </>}
                         {list.recharge_type == 2 && <>
                          <img src={require("assets/img/dth-red.png")} alt="dashboard"/>
                         </>}

                         {list.recharge_type == 3 && <>
                          <img src={require("assets/img/electricity.png")} alt="dashboard"/>
                         </>}

                         
                          
                           <p>
                            {list.recharge_type === 1 &&  <> <span class="trans-id">Prepaid: {list.mobile}</span><br></br> </>}
                            {list.recharge_type === 2 &&  <> <span class="trans-id">DTH: {list.mobile}</span><br></br> </>}

                            {list.recharge_type === 3 &&  <> <span class="trans-id">Electricity: {list.mobile}</span><br></br> </>}

                            <span>Status: {list.status}</span><br></br>
                            <span>Mobile: {list.mobile_number}</span><br></br>
                            {moment(list.created_at).format("YYYY-MM-DD")} Transaction Id: {list.transaction_id ? list.transaction_id : "none"}
                           </p>
                         </li>
                       </ul>
                       })}
                       </>}
                        {/* <ul class="detail" id="pending">
                         <li class="left">
                           <p><i class="fa fa-inr" aria-hidden="true"></i>450</p>
                         </li>
                         <li class="right">
                          <img src={require("assets/img/airtel.jpeg")} alt="dashboard"/>
                           <p>
                             <span class="trans-id">Postpaid: 01245789113</span><br></br>
                             Mon, 06 Jul 2020 Transaction Id: 2ghj568lom
                           </p>
                         </li>
                       </ul>
                        <ul class="detail" id="not-suceed">
                         <li class="left">
                           <p><i class="fa fa-inr" aria-hidden="true"></i>399</p>
                         </li>
                         <li class="right">
                           <img src={require("assets/img/vodaphone.png")} alt="dashboard"/>
                           <p>
                             <span class="trans-id">Dth: 01245789113</span><br></br>
                             Mon, 06 Jul 2020 Transaction Id: 2ghj568lom
                           </p>
                         </li>
                       </ul>
                       <ul class="detail" id="suceed">
                         <li class="left">
                           <p><i class="fa fa-inr" aria-hidden="true"></i>149</p>
                         </li>
                         <li class="right">
                           <img src={require("assets/img/jio.png")} alt="dashboard"/>
                           <p>
                             <span class="trans-id">Prepaid: 01245789113</span><br></br>
                            Mon, 06 Jul 2020 Transaction Id: 2ghj568lom
                           </p>
                         </li>
                       </ul> */}

                     </div>
                   </div>
                </div> 
             </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />

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

export default Recharge;