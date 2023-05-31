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

import ModernDatepicker from 'react-modern-datepicker';
import * as moment from "moment";
import Header from "components/Navbars/Frontheader";
import Footer from "components/Navbars/Frontfooter";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const $ = window.jQuery;

class CoupnDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allDeals:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            image:"",
            type:"",
            link:"",
            title:"",
            category_id:"",
            brand_id:"",
            store_id:"",
            price:"",
            discount:"",
            discount_type:"",
            show_list:true,
            ShowDatatable:true,
            allCategories:[],
            allStore:[],
            allBrandList:[],
            CouponCode:'',
            allOffers:[],
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
       
        if(!sessionStorage.getItem("_access")){
            window.location.href="/login"
        }else{
            
          this.getSingleOffer()
          this.insertViewOffer(sessionStorage.getItem("offer_id"))
          this.getAllOffer()
        }
        
        
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

    getSingleOffer = () => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/single-offer`,{id:sessionStorage.getItem("offer_id")}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("getSingleCoupon",res)
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    OfferDetail:res.data.data.category,
                    description:res.data.data.category.description,
                    discount:res.data.data.category.discount,
                    name:res.data.data.category.name,
                    link:res.data.data.category.link,
                    image:res.data.data.category.image
                })
                
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

    OpenOfferDetail = (e, id, cat_id) => {
     
        sessionStorage.removeItem("store_id")
          sessionStorage.removeItem("brand_id")
        sessionStorage.setItem("offer_id",id)
        sessionStorage.setItem("cat_id",cat_id)
        window.open("/category-detail", "_self")
        window.open("/view-offer", "_blank")
      }

      insertViewOffer = (offer_id) => {
        this.setState({
            loading:true
        })
       
        Axios.post(`${this.state.url}/front/auth/add/view-offer`,{offer_id:offer_id}, {
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
      

    
  render() {
    return  <>
    {this.state.loading && <>
        <div class="loading">Loading&#8230;</div>
        </> }
      <Header  />
        <div className="">
        <NotificationAlert ref={this.notificationAlert} />
        <div class="coupon-code-inner">
    <div class="code-description-sec">
      <a href="/" class="back">Go Back</a>
      <div class="row">
        <div class="col-md-8">
          <div class="row" id="text-description">
            <div class="col-md-8">
              <h1>{this.state.discount}% OFF</h1>
              <p>{this.state.name} Prime Day Sale - Up to {this.state.discount}% OFF</p>
            </div>
            <div class="col-md-4">
              <img src={this.state.image_url+'offer/'+this.state.image} class="d-inline-block align-top"alt=""/>
            </div>
          </div>
          <ul class="text-description-para">
            <li>
              <p>Your Offer Has Been Activated On The Website Already</p>
            </li>
            <li class="form-area">
              <form class="coupon-code-form">
                  <input type="text" id="lname" placeholder="Offer Activated" value="Offer Activated"/>
                </form> 
              </li>
            <li class="button">
              <a href={this.state.link}> Go To {this.state.name} Website</a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <div class="para-text">
            <ol class="number-listing">
              <li>
                <p>Amazon is running Prime Day Sale in India once again</p>
              </li>
              <li>
                <p>This Prime Day sale which will last for 36 hours from August 6th to August 7th is available only to Amazon Prime Users</p>
              </li>
              <li>
                <p>Shop here for 1000+ New Product Launches from top brands like OnePlus, Intel, Samsung, Amazon Basics, Home Centre, Philips, Whirlpool and many more</p>
              </li>
              <li>
                <p>Get 10% Instant Discount using HDFC Credit, Debit Cards & EMI also available</p>
              </li>
              <li>
                <p>Shop here for 1000+ New Product Launches from top brands like OnePlus, Intel, Samsung, Amazon Basics, Home Centre, Philips, Whirlpool and many more</p>
              </li>
              <li>
                <p>Shop here for 1000+ New Product Launches from top brands like OnePlus, Intel, Samsung, Amazon Basics, Home Centre, Philips, Whirlpool and many more</p>
              </li>
              <li>
                <p>Get 10% Instant Discount using HDFC Credit, Debit Cards & EMI also available</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  <div class="container">
    <div class="related-coupon">
      <div class="row">
      {this.state.allOffers.map((slide, index) => {
        if(index <2){
        return <div class="col-md-4">
            <a href="javascript:void()"  onClick={(e) => { this.OpenOfferDetail(e, slide._id, slide.category_id._id) }}>
          <div class="inner-colun">
            <img src={this.state.image_url+'offer/'+slide.image} class="d-inline-block align-top"alt=""/>
            <h3>{slide.discount}% OFF</h3>
            <p>Get {slide.discount}% Instant Discount</p>
            <a href="#" class="view-btn">View All {slide.name} Offer</a>
          </div>
          </a>
        </div>
       
        }
    })}
      </div>
    </div>
  </div>
</div>
        </div>
        <Footer  />
      </>
    
  }
}

export default CoupnDetail;
