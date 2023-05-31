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
import { Modal } from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class InnerDeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            allViewDeal:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allViewDeal:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getViewDeal()
        this.getLoginUserDetail()
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
                    showCat:true,
                    allViewDeal:res.data.data.category
                })
                console.log('allViewDeal',this.state.allViewDeal)
                
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

   
    showDealModal = show => {
      console.log(show,"asdfasdf");
      if (show === false) {
          
      }
      this.setState({
        show_deal_modal: show,
      })
    }

  showDeal = (e,index) => {
          var selected = this.state.allViewDeal[index]
      this.setState({
          price:selected.deal_id.price,
          discount:selected.deal_id.discount,
          discount_type:selected.deal_id.discount_type,
          image:selected.deal_id.image,
          link:selected.deal_id.link,
          title:selected.deal_id.title,
          description:selected.deal_id.description,
          copied:false
      })
      console.log("selected",selected);
      this.showDealModal(true);
      
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
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8 deals-dash" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Deals</h1>
                 </div>
                <p class="heading-date"><a href="#">View Deal</a></p>
                  <div class="row" id="deals-whole-sec">
                  {this.state.allViewDeal.length > 0 && <>
                    {this.state.allViewDeal.map((list, index) => {
                      return <div class="col-md-6">
                       <div class="deal-shadow">
                        <ul class="inner-deals">
                          <li class="icon"><img src={this.state.image_url+'deal/'+list.deal_id.image} alt="dashboard"/></li>
                          <li class="description">
                             <a href="javascript:void()" onClick={(e) => {this.showDeal(e,index)}} class="getdeal-btn">Get deal</a>
                             <div  class="small"><p>{list.deal_id.title}</p></div>
                             <div class="location"><p>{list.deal_id.description}</p></div>
                          </li>
                        </ul>
                        <ul class="money-transfer">
                          <li class="left"><p>₹{list.deal_id.discount}</p></li>
                          <li class="right">
                           <img src={require("assets/img/paymentcard.png")} alt="today-task-icon"/>
                          </li>
                        </ul>
                      </div>
                     </div>
                     })}
                     </>}
    
                     {this.state.allViewDeal.length === 0 && <>
                        <span>No Record Found</span>
                </>}
                      
                   </div>
                    

                    
                   
                  </div>
                <LeftSidebar />
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
                  <p><i class="fa fa-inr" aria-hidden="true"></i> {this.state.discount}<span><i class="fa fa-inr" aria-hidden="true"></i> {this.state.price}</span></p>
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
        </>;
    }
}

export default InnerDeal;