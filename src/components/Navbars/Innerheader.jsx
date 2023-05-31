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

class Innerheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        url: process.env.REACT_APP_API_URL,
        image_url: process.env.REACT_APP_IMAGE_URL,
        email: "",
        password: "",
        allStore:[],
        allCategories:[],
        allSlider:[],
        allCoupon:[],
        allOffers:[],
        lastSegment:""
    }
}
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
  
  var parts = window.location.href.split('/');
var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
console.log("window.location.href",lastSegment)

console.log(lastSegment);
 
  this.setState({
    loggedIn: sessionStorage.getItem("_access") ? sessionStorage.getItem("_access") : "",
    lastSegment:lastSegment
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

getCategory = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/category`, {
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

getStore = () => {
  this.setState({
      loading:true
  })
  Axios.get(`${this.state.url}/front/auth/get/store`, {
      headers: {
          token: sessionStorage.getItem('_access')
      }
  }).then(res => {
      setTimeout(() => {
          this.setState({
              loading:false,
              showCat:true,
              allStore:res.data.data.category
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
            this.notify("error", "Phone number already exist");
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
                  loggedIn:resp.data.data.token
                })
                sessionStorage.setItem("_access", resp.data.data.token);
              this.notify("success", "User logged successfully");
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

VerifyOtp= (e) => {
   e.preventDefault()
   var data = {
    name: this.state.name,
    mobile:this.state.mobile,
    otp:this.state.otp,
    registered_via:"web"
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
  sessionStorage.clear()
  this.setState({
    loggedIn:""
  })
  window.location.href="/"
}
  render() {
    return <>
     <NotificationAlert ref={this.notificationAlert} />
        <header>
        <div class="container-fuild">
            <div class="top-navigation">
                 <nav class="navbar navbar-light bg-light">
                   <a class="navbar-brand" href="/"><img src={require("assets/img/LOGO-original.png")} class="d-inline-block align-top"alt=""/></a>
                   <form class="navbar-form" role="search">
                     <div class="input-group add-on">
                       <input class="form-control" placeholder="What are you looking for..." name="srch-term" id="srch-term" type="text"/>
                       <div class="input-group-btn">
                         <button class="btn btn-default" type="submit"><i class="fa fa-search" aria-hidden="true"></i>Search</button>
                       </div>
                     </div>
                   </form>
                   
                   <div class="icon-sec">
                    <div class="help-desk">
                    {!this.state.loggedIn && <>
                      <a href="javascript:void(0)" onClick={(e) => { this.Login(e) }}>
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                        
                        <span>Sign In <br/>Join Free</span>
                        
                      </a>
                      </>}

                      <a href="/dashboard">
                      {this.state.loggedIn && <>
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
                         <p>INR</p> 
                        
                        <ul class="country-flag">
                          <li>
                            <p><img src={require("assets/img/united-states-of-america-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>USD</p>
                          </li>
                          <li>
                            <p><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>USD</p>
                          </li>
                          <li>
                            <p><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>CNY</p>
                          </li>
                          <li>
                            <p><img src={require("assets/img/canada-flag-icon-32.png")} class="d-inline-block align-top"alt=""/>ITL</p>
                          </li>
                        </ul>
                      
                     </div>
                  </div>

                  </nav>
             </div>
         </div>
     </header>
    
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
           <a href="javascript:void(0)" class="faebbok">Facebook <i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="javascript:void(0)" class="google">Google <i class="fa fa-google-plus" aria-hidden="true"></i></a>
          
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
           
             
              <button type="button" onClick={(e) => { this.onFormSubmit(e) }} class="btn btn-info btn-block btn-round">Sign Up</button>
          
            </form>
           
           </div>
         
         <div class="social-media">
           <p>Or Use Social Media For Login </p>
           <a href="javascript:void(0)" class="faebbok">Facebook <i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="javascript:void(0)" class="google">Google <i class="fa fa-google-plus" aria-hidden="true"></i></a>
          
         </div>
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
     </>;



  }
}


export default Innerheader;
