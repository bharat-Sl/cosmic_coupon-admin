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
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class UserCoupon extends React.Component {
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
            copied: false,
            copiedInd:""
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getBrand()
        this.getLoginUserDetail()
        this.getUserCoupon()
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
    onChange = ({target: {value}}) => {
        this.setState({value, copied: false});
      };
    
      onClick = ({target: {innerHTML}}) => {
        console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
      };

    onCopy = () => {
        this.setState({copied: true});
      };
   
      CopyCode = (e, index) => {
        this.setState({copiedInd: index});
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
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8 deals-dash" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Coupon</h1>
                 </div>
                <p class="heading-date"><a href="#">Today</a></p>
                  <div class="row" id="deals-whole-sec">
                  {this.state.allCoupon.length > 0 && <>
                        {this.state.allCoupon.map((list, index) => {
                    return <div class="col-md-4">
                       <div class="deal-shadow">
                        <ul class="inner-deals" id="coupon-sec">
                          <li class="icon"><img src={this.state.image_url+'coupon/'+list.usedcoupon.image} alt="dashboard"/></li>
                          <li class="heading"><p><a href={list.usedcoupon.link} target="_blank">{list.usedcoupon.name}</a></p></li>
                          {/* <li class="small"><p>Amazon</p></li> */}
                          <li class="location"><p>Grab {list.usedcoupon.discount}% Off </p></li>
                        </ul>
                        <ul class="money-transfer">
                        <div class="coupon-code-form">
                            <label for="lname">Coupon Code :</label>
                            <input type="text" id="lname" name="lname" value={list.usedcoupon.code}/>
                            <CopyToClipboard  onCopy={this.onCopy} text={list.usedcoupon.code}>
                            <button onClick={(e) => {this.CopyCode(e,index)}}>{this.state.copied && (this.state.copiedInd == index) ? <span style={{color: 'red'}}>Copied.</span> : "Copy Code"}</button>
                        </CopyToClipboard>
                        </div> 
                        <p class="coupon-text">Paste your code at checkout</p>
                        </ul>
                      </div>
                     </div>
                      })}
                      </>}

                      {this.state.allCoupon.length === 0 && <>
                            <span>No Record Found</span>
                    </>}
                      
                   </div>
                   

                   
                    
                   
                  </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default UserCoupon;