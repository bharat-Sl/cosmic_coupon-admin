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

class ViewOffer extends React.Component {
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
            setTimeout(() => {
              window.open(this.state.link, "_self")
            }, 1200);
            
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


    
  render() {
    return  <>
    {this.state.loading && <>
        <div class="loading">Loading&#8230;</div>
        </> }
      <Header  />
        <div className="">
        <NotificationAlert ref={this.notificationAlert} />
        <div class="coupon-code-inner">
    
        <div class="Click-popup" id="coupon-code-start">
       <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="inner-part-popup">
                        <h3>No Code required </h3>
                        <p class="coupon-text">Carry on Shoping as usual</p>
                        <form class="coupon-code-form">
                          <input type="text" id="lname" placeholder="Offer Activated" value="Offer Activated"/>
                         </form> 
                      <div class="company-url">
                        <a href={this.state.link}>Opening {this.state.name}</a><br></br>
                        <img width="30%" src={require("assets/img/TOWb.gif")} alt="Youtube-logo"/>
                      </div>
                    </div>
                </div>
            </div>
            <a href="/" class="back">Go Back</a>
       </div>
   </div>
</div>
        </div>
        <Footer  />
      </>
    
  }
}

export default ViewOffer;
