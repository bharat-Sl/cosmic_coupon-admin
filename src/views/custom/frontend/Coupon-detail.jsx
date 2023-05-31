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
            
          this.getSingleCoupon()
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

    getSingleCoupon = () => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/single-coupon`,{id:sessionStorage.getItem("coupon_id")}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    CouponDetail:res.data.data.category,
                    value:res.data.data.category.code,
                    description:res.data.data.category.description,
                    discount:res.data.data.category.discount,
                    name:res.data.data.category.name,
                    link:res.data.data.category.link,
                    image:res.data.data.category.image
                })
                console.log("getSingleCoupon",this.state.value)
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

    
  render() {
    return  <>
    {this.state.loading && <>
        <div class="loading">Loading&#8230;</div>
        </> }
      <Header  />
        <div className="">
        <NotificationAlert ref={this.notificationAlert} />
        <div class="Click-popup">
        <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="inner-part-popup">
                            <div class="coupon-img">
                                <img src={this.state.image_url+'coupon/'+this.state.image} class="d-inline-block align-top"alt=""/>
                            </div>
                            
                            <h3>Flat {this.state.discount}% Off on {this.state.name}</h3>
                            <div class="coupon-code-form">
                                <label for="lname">Coupon Code :</label>
                                <input type="text" id="lname" name="lname" value={this.state.value}/>
                                <CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
                                <button>{this.state.copied ? <span style={{color: '#fff'}}>Copied.</span> : "Copy Code"}</button>
                            </CopyToClipboard>
                            </div> 
                            <p class="coupon-text">Paste your code at checkout</p>
                            <p>Description: {this.state.description}</p>
                            <a href={this.state.link}>Visit {this.state.name} Website</a>
                        </div>
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
