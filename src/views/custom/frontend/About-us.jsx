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

class AboutUs extends React.Component {
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
                    <h2>
                    About us
                    </h2>
                    <p>
                    Coupon Ventures  it's our mission to make life more affordable. For the past decade we've been committed to helping people save more. Some things never change.  Coupon Ventures  Team decided to make finding online coupon codes fast and easy. After three years of researching and testing our ideas, we achieved our goal of building a free coupon code website. We launched Couponventures.in in 2019 so that consumers could find valuable coupons without wasting time or getting frustrated.
                    </p>
                    <p>
                    Our coupon website stands out from competitors with easy navigation, many coupon categories, and accurate and up-to-date promotional offers. Coupon Ventures represents the easy-to-use and free coupon website that we would want for ourselves. We're committed to refining and improving our free coupon website going forward. Our strong enthusiasm for the future of Coupon Ventures motivates us to overcome challenges and build new opportunities. Our mission to help parents, students, and other online shoppers save money on their favorite products and services continues to guide our efforts every day.
                    </p>
                    <p>
                    Working with over 5,000 retailers and restaurants online and in-store, our India based team work hard every day to secure the best exclusive savings for our site 
                    </p>
                    <h3>How does Coupon Ventures work?</h3>
                    <p>
                    It’s all about saving money
                    </p>
                    <p>
                    It all starts pretty innocently. You go to your favourite website that sells clothes, you need to buy a new accessory for your car, you’re seeking a new washer because the old one is leaking, you’re browsing through a vast array of products, you’re one step away from buying and then this little, innocent thought comes across your mind. “Couldn’t it be cheaper?” We’re here to tell you exactly that: YES, it can be cheaper! We’re even going to show you how.
                    </p>
                    <p>
                    Coupon Ventures  is on the bright side of the Internet force. We don’t promise you a carefree and prosperous life, painless liposuction or smoothing out your wrinkles with a touch of a magic wand (or cream in this case). We are giving you something that we truly believe should be accessible to all Internet users around the world - the ability to shop online for less. You may think that high quality of goods and services equals high prices. It may be true that sometimes to get something more valuable we need to pay more.


                    </p>
                    <p>
                    However, we don’t live in the times of monopoly where one company sets up the prices everyone must agree to. Various manufacturers, a multitude of stores, alternative solutions and possibilities are just a few factors that enable us to find places with high quality at the best price. What you understand by “high quality” and “best price” is up to everyone’s own interpretation. What is universal, though, is the fact that a good shop is one that offers its customers the ability to lower cost of shopping. Such are the stores that you will find here at Coupon Ventures. Don’t compromise on quality and save money in the process. It’s a win-win situation!
                    </p>
                    <h3>Online shopping, real savings</h3>
                    <p>
                    You’ve probably already heard about someone who is using cheap airlines and visits new countries for peanuts now and then. Or your friend may have bought a dress you always dreamed of for such a low price that you just can’t believe she was telling the truth. Your family member furnished their kitchen from top to bottom for half of the money you would think kitchen equipment would cost. Add to it free delivery and free professional assembly.


                    </p>
                    <p>
                    How is that possible, you may wonder? And why you’re still missing out on such deals? It’s high time to change it! You’re here finally and what you’re going to find at Coupon Ventures is the unlimited access to cheaper online shopping. Be it front cover magazines fashion from top brands or smaller shops offering niche and unique products hard to find some place else.
                    </p>
                    <h3>
                    What do you get from us?
                    </h3>
                    <p>
                    Simply put, we’re providing you with promotional codes and discount offers. In the case of codes, you need to visit a given store’s website, add the desired product to your shopping cart or bag (it’s different in every store!) and when you finally land yourself at checkout, that’s the place where you apply a coupon code found at Coupon Ventures It can be named differently, sometimes a store is asking for a promo code, sometimes for a voucher code, other times for a coupon or simply a code - feel free to enter the code from Coupon Ventures to get your discount. When it comes to deals and discount offers, all you need to do is click the button with “Get the Deal” sign on it and you will land on the dedicated page with the promotion.

                    </p>
                    <h3>
                    Cheaper shopping from the best site
                    </h3>
                    <p>
                    We’ve engineered best solutions for easy and convenient usage of our website. Categories are intuitive and our user-friendly interface is backed up by clear instructions so you simply can't get lost on your discount-seeking mission! Moreover, we have so many promo codes and promotions that we are extremely eager to share them with as many people as possible. Our deals database is constantly growing. We sincerely hope that the number of users satisfied with our work will also increase at such a pace.
                    </p>
                    <h3>
                    Have it all, and have it in one place

                    </h3>
                    <p>
                    Coupon Ventures’s pretty amazing, we are aware of that :) We won’t bother you to visit us every day, though! You can still have access to the hottest offers and latest coupon codes for your favourite stores. How come? Just leave us your email address and we will send you only the best deals. Don’t miss Trendind Deals section above where only the most best-selling deals land. You can also check our Facebook page where we promote different offers on a daily basis.

                    </p>
                    <h3>
                    What’s the catch?

                    </h3>
                    <p>
                    The only risk you face with Coupon Ventures is that you will eventually buy everything your heart desired and you’ll be left with nothing new to dream of. Such a state is only temporary, though, and can be easily fixed with the next visit to Coupon Ventures!
                    </p>

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

export default AboutUs;
