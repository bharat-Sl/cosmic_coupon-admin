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

class TermCondition extends React.Component {
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
    
       

 <div class="terms-condition">
   <div class="container">
      <h1 class="heading">Terms & Conditions</h1>
      <ol>
        <li><span class="heading">Terms of Use</span>
          <ol class="inner">
            <li>
            By Entering your email, logging into your account, or accepting notifications, you agree to receive personalized Coupon Ventures deals each day. You may unsubscribe at any time.<br />
            <br />
            Welcome to the Coupon Ventures Site (defined below). By using it, you are agreeing to these Terms of Use (defined below). Please read them carefully. If you have any questions,  contact us here.<br />
            <br />
            These Terms of Use were last updated on August'2020
            </li>
          </ol>
        </li>
        <li>Acceptance Of Terms Of Use
          <ol class="inner">
            <li>Coupon Ventures  owns and operates the website, www.couponventures.in, the mobile and touch versions and any sites we have now or in the future that reference these Terms of Use (collectively, " Site "). By (a) using the Site and Coupon Ventures ’s services through the Site, (b) signing up for an account and/or (c) completing a purchase on the Site, you agree to these Terms of Use (defined below) and any additional terms applicable to certain programs in which you may elect to participate. You also agree to our Privacy Statement, incorporated herein by reference and located at  <a href="https://www.couponventures.in /privacy">https://www.couponventures.in /privacy</a>  ( "Privacy Statement" ), and acknowledge that you will regularly visit the Terms of Use (defined below) to familiarize yourself with any updates. The Privacy Statement, together with these terms of use, and any other terms contained herein or incorporated herein by reference, are collectively referred to as the " Terms of Use ." The term "using" also includes any person or entity that accesses or uses the Site with crawlers, robots, data mining, or extraction tools or any other functionality.</li>
            <li>IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE SITE AND DO NOT USE ANY COUPON VENTURES SERVICE, PARTICIPATE IN ANY PROGRAM OR PURCHASE ANY VOUCHER, PRODUCT OR OTHER GOOD OR SERVICE OFFERED THROUGH THE SITE.<br />
            <br />
            PLEASE REVIEW THE FOLLOWING SECTIONS OF THESE TERMS OF USE CAREFULLY: (A)  DISPUTE RESOLUTION/ARBITRATION AGREEMENT,  INCLUDING THE  CLASS ACTION WAIVER  DESCRIBED THEREIN, (B)  LIMITATION OF LIABILITY,  AND (C)  INDEMNIFICATION/RELEASE.</li>
          </ol>
        </li>
      </ol>

      <h1 class="heading">These Terms of Use are organized as follows:</h1>
      <ol>
        <li><span class="heading">Definition :</span>
          <ol class="inner">
            <li>
             Coupon codes and promotional offers supply us with discount sale or refund against product and services which are available on website through online shopping. These coupons are pretend and developed by the support team of E-commerce dealers. Some coupons may have certain time limit, if you can’t use them in proper manner by end of the period they will be expire by given period of time. Main usage of coupon codes or promotional are to produce the income for the organization and extend the understanding between the clients.
            </li>
          </ol>
        </li>
        <li>Privacy Policy :
          <ol class="inner">
            <li>In extension to these Terms, the exercise of the Services is governed to the terms of the Coupon Ventures Privacy Policy, which may be found at <a href="https://couponventures.in">https://couponventures.in/</a>, and is expressly included within by reference.</li>
          </ol>
        </li>
        <li>Card-Linked Cash Back Rewards :
          <ol class="inner">
            <li>In appreciation to these Terms, assistance in Card-Linked Cash Back Rewards sometimes introduced to as “In-store Cash Back Offers” is subjected to the terms of the Card-Linked Cash Back Rewards Advertising Terms, which may be found at <a href="#">https://couponventures.in/privacy-policy</a> and are expressly consolidated included by reference</li>
          </ol>
        </li>
         <li>Online Cash Back Rewards :
          <ol class="inner">
            <li> In appreciation to these Terms, support in Online Cash Back Rewards is subjected to the articles of the Online Cash Back Rewards Advertising Terms, which may be found at <a href="https://couponventures.in/privacy-policy">https://couponventures.in/privacy-policy</a></li>
          </ol>
        </li>
         <li>Terms of Sale :
          <ol class="inner">
            <li>In extension to these Terms, acquisition of gift cards is subject to the Terms of Sale, which may be found at <a href="https://couponventures.in/privacy-policy">https://couponventures.in/privacy-policy</a> and are expressly included herein by reference.</li>
          </ol>
        </li>
        <li>Amendments:
          <ol class="inner">
            <li>Coupon Ventures  may modify these Terms from time to time without any notice and may revise, add or terminate any features, content or focus of the Services, at its individual will. Your extended use or obtaining of the Services following the posting of any such alterations to the Terms establishes your agreement of the revised Terms. To the amount that an arbitrator or tribunal of applicable authority decides that implementing any changes to these Terms would distribute this an imaginary or unenforceable agreement, such modifications shall be relevant on a proposed basis only, with regard to events or conditions occurring after the date of such modifications, to the size required to avoid these Terms being considered false or unenforceable.</li>
          </ol>
        </li>
      </ol>

      <h1 class="heading">Community Participation </h1>
      <ol>
        <li><span class="heading">Registration :</span>
          <ol class="inner">
            <li>
             To use distinct portions of the Services, you may be asked to complete a registration process and set an account with Coupon Ventures ("Account"). You design and guarantee that all data provided by you to Coupon Ventures is prevailing, correct, and perfect and that you will keep the truth and completeness of this knowledge on a timely, prompt basis. For additional information on the terms of participating in our online community, please visit our How to Use a Coupon?<a href="https://couponventures.in"> https://couponventures.in</a>
            </li>
          </ol>
        </li>
        <li>Password Protection :
          <ol class="inner">
            <li>As a recorded user of the Services, you may obtain or authenticate a user handle and one or extra passwords. You are also responsible for keeping the confidentiality and safety of your passwords and Account. You realize and accept that you are personally and fully liable for all activities and postings created from your accounts. Any stories you create are not transferrable. You admit notifying Coupon Ventures instantly if you become conscious of any illegal use of your content.</li>
          </ol>
        </li>
         <li>User Published Content :
          <ol class="inner">
            <li>Coupon Ventures  does not pre-screen or periodically review all user-contributed content. Coupon Ventures  stores the entire right though not the command to edit or withdraw, any Submissions without notice. Coupon Ventures  rejects (i) any guarantee that it will publish, transfer, or continue to disclose any Assents and (ii) any responsibility for editing, extracting, or proceeding to display any entries. Coupon Ventures  does not have a commitment to answer to accusations or review allegations.</li>
             <ul>
               <li>By posting any entries, you serve and justify</li>
               <ul>
                 <li>(a) You own all right, claim, and attention to such posted submissions, including but not restricted to any permission, support, freedom, authorization or consent from any third person imperative for yourself to contribute, publish, upload information or offer the posted content or such posted content which is in the public domain.</li>
                 <li>(b) Your use of such posted submission forms fair value. You additionally serve and justify that publishing such content does not infringe or authorize the invasion of any license, copyright, tag, sale code, right of secrecy, right of distribution, didactic rights, or different learned or established property right known by any appropriate authority of any form or object, or unless establish the violation of any contract with any another person or item.</li>
               </ul>
             </ul>
             You also consent not to publish any of the later types of content to the Applications or Sites:
              <ul>
                <li>Adult content, obscenity, specific explicit photographs, or stripped pictures.</li>
                <li>Content that is obscene, abusive, intimidating, attacking, threatening, rude, or offensive.</li>
                <li>Content encouraging hatred, prejudice, racism, resentment, harassment, hurt, harm or destructive actions.</li>
                <li>Content advertising illegal actions; or fundamentally political, spiritual, mental, or spiritual content.</li>
                <li>Content supporting pirated software.</li>
                <li>Content meaning for phishing or sharing malware.</li>
                <li>Content that is disparaging of any personality or substance</li>
                <li>Content that is in breach of any law or regulation.</li>
                <li>Any other content that is or could be judged unsuitable, inappropriate or vulgar, all as defined by us.</li>
              </ul>
          </ol>
        </li>
         <li>Accuracy of Information :
          <ol class="inner">
            <li>Coupon Ventures  presents no description or guarantee as to the correctness or suitability for employment of any proposals, including, but not restricted to, tokens, discounts, rebates, etc. posted via Coupon Ventures or that any Dealer will accept or approve any such Coupons. Coupon Ventures  is not accountable for contributing any amount for any Coupons in that case. Coupon Ventures  is not effective for the exchange of erudition at Retailers, including; but not restricted to, discount information, pricing, availability or fitness for use. You agree that Coupon Ventures does not and cannot examine all stock made accessible through websites associated or connecting to any portion of the Services.</li>
          </ol>
        </li>
        <li>Property Ownership :
          <ol class="inner">
            <li>All right, claim and stake in the Services, including trade and technology codes incorporated therein and any practice advancements, formed or produced in conjunction with or associated to these Terms, including all patents, trade secrets, copyright, and other exclusive rights, and any plagiarized operations thereof, shall belong individually and solely to Coupon Ventures or its licensors, and you shall have no claims whatsoever in any of the preceding.<br />
<br />
You recognize that the Services frame a precious trade secret and the secret information of Coupon Ventures or its licensors. Nothing in certain Terms or oppositely will be judged to give you an ownership share in the Services, in all or in part.<br />
<br />
All content and elements incorporated as part of the services, such as content, logos, text, pictures, erudition, data, information, qualities, other material, are the property of Coupon Ventures , its licensors, or relevant third party licenses holders such as Traders, and is shielded by trademarks, copyrights, or other exclusive rights and these rights are valid and preserved in all modes, means and technologies surviving now or hereinafter formed.<br />
<br />
All Compositions are copyrighted as original works and as a joint work below copyright laws and global treaty terms, and Coupon Ventures owns a copyright in the collection, coordination, organization, and improvement thereof. You may not utilize copy, change, alter, extract, eliminate, expand, spread, readjust, and associate in the transfer or disposal.<br />
<br />
Publicly present or display, communicate, display, or produce copied works from, or in any form abuse any of the compositions, in whole or in part. Any use other than as examined within, including the generation, alteration, dissemination, modifications, of the Works; besides as especially authorized within, is strictly forbidden.<br />
<br />
You surmise and concede that illegal exposure, use or copying of the exclusive merchandises and services rendered following to these Terms may induce Coupon Ventures and its licensors irreversible injury, which may not be renewed at law, and you consent that Coupon Ventures and its licensors support for violation of these Terms may be in assets by way of injunctive or other impartial aid.</li>
          </ol>
        </li>
        <li>Close of Service :
          <ol class="inner">
            <li>Coupon Ventures denies all liability and responsibility for the availability, opportunity, safety or reliability of the Services. Coupon Ventures stores the right to alter, interrupt, or terminate the Services or entrance to the Services without any notification at any time and without any burden to you.</li>
          </ol>
        </li>
      </ol>
   </div>
 </div>

  <div class="Click-popup" id="coupon-code-start">
       <div class="container">
          {/*  <div class="row">
                <div class="col-md-12">
                    <h2>
                    Terms of Use
                    </h2>
                    <p>
                    By Entering your email, logging into your account, or accepting notifications, you agree to receive personalized Coupon Ventures deals each day. You may unsubscribe at any time.


                    </p>
                    <p>
                    Welcome to the Coupon Ventures Site (defined below). By using it, you are agreeing to these Terms of Use (defined below). Please read them carefully. If you have any questions,  contact us here.


                    </p>
                    <p>
                    These Terms of Use were last updated on August'2020


                    </p>
                    <h3>
                    ACCEPTANCE OF TERMS OF USE
                    </h3>
                    <p>
                    Coupon Ventures  owns and operates the website, www.couponventures.in, the mobile and touch versions and any sites we have now or in the future that reference these Terms of Use (collectively, " Site "). By (a) using the Site and Coupon Ventures ’s services through the Site, (b) signing up for an account and/or (c) completing a purchase on the Site, you agree to these Terms of Use (defined below) and any additional terms applicable to certain programs in which you may elect to participate. You also agree to our Privacy Statement, incorporated herein by reference and located at  https://www.couponventures.in /privacy  ( "Privacy Statement" ), and acknowledge that you will regularly visit the Terms of Use (defined below) to familiarize yourself with any updates. The Privacy Statement, together with these terms of use, and any other terms contained herein or incorporated herein by reference, are collectively referred to as the " Terms of Use ." The term "using" also includes any person or entity that accesses or uses the Site with crawlers, robots, data mining, or extraction tools or any other functionality.
                    </p>
                    <p>
                    IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE SITE AND DO NOT USE ANY COUPON VENTURES SERVICE, PARTICIPATE IN ANY PROGRAM OR PURCHASE ANY VOUCHER, PRODUCT OR OTHER GOOD OR SERVICE OFFERED THROUGH THE SITE.


                    </p>
                    <p>
                    PLEASE REVIEW THE FOLLOWING SECTIONS OF THESE TERMS OF USE CAREFULLY: (A)  DISPUTE RESOLUTION/ARBITRATION AGREEMENT,  INCLUDING THE  CLASS ACTION WAIVER  DESCRIBED THEREIN, (B)  LIMITATION OF LIABILITY,  AND (C)  INDEMNIFICATION/RELEASE.


                    </p>
                    <h3>
                    These Terms of Use are organized as follows:

                    </h3>
                    <p>Definition.</p>
                    <p>
                    Coupon codes and promotional offers supply us with discount sale or refund against product and services which are available on website through online shopping. These coupons are pretend and developed by the support team of E-commerce dealers. Some coupons may have certain time limit, if you can’t use them in proper manner by end of the period they will be expire by given period of time. Main usage of coupon codes or promotional are to produce the income for the organization and extend the understanding between the clients.


                    </p>
                    <p>
                    Privacy Policy: In extension to these Terms, the exercise of the Services is governed to the terms of the Coupon Ventures Privacy Policy, which may be found at https://couponventures.in/, and is expressly included within by reference.
                    </p>
                    <p>
                    Card-Linked Cash Back Rewards: In appreciation to these Terms, assistance in Card-Linked Cash Back Rewards sometimes introduced to as “In-store Cash Back Offers” is subjected to the terms of the Card-Linked Cash Back Rewards Advertising Terms, which may be found at https://couponventures.in/privacy-policy and are expressly consolidated included by reference
                    </p>
                    <p>
                    Online Cash Back Rewards: In appreciation to these Terms, support in Online Cash Back Rewards is subjected to the articles of the Online Cash Back Rewards Advertising Terms, which may be found at https://couponventures.in/privacy-policy
                    </p>
                    <p>
                    Terms of Sale: In extension to these Terms, acquisition of gift cards is subject to the Terms of Sale, which may be found at https://couponventures.in/privacy-policy and are expressly included herein by reference.
                    </p>
                    <p>
                    Amendments: Coupon Ventures  may modify these Terms from time to time without any notice and may revise, add or terminate any features, content or focus of the Services, at its individual will. Your extended use or obtaining of the Services following the posting of any such alterations to the Terms establishes your agreement of the revised Terms. To the amount that an arbitrator or tribunal of applicable authority decides that implementing any changes to these Terms would distribute this an imaginary or unenforceable agreement, such modifications shall be relevant on a proposed basis only, with regard to events or conditions occurring after the date of such modifications, to the size required to avoid these Terms being considered false or unenforceable.


                    </p>
                    <h3>
                    Community Participation 

                    </h3>
                    <h3>
                    Registration
                    </h3>
                    <p>
                    To use distinct portions of the Services, you may be asked to complete a registration process and set an account with Coupon Ventures ("Account"). You design and guarantee that all data provided by you to Coupon Ventures is prevailing, correct, and perfect and that you will keep the truth and completeness of this knowledge on a timely, prompt basis. For additional information on the terms of participating in our online community, please visit our How to Use a Coupon? https://couponventures.in


                    </p>
                    <h3>Password Protection</h3>
                    <p>
                    As a recorded user of the Services, you may obtain or authenticate a user handle and one or extra passwords. You are also responsible for keeping the confidentiality and safety of your passwords and Account. You realize and accept that you are personally and fully liable for all activities and postings created from your accounts. Any stories you create are not transferrable. You admit notifying Coupon Ventures instantly if you become conscious of any illegal use of your content.


                    </p>
                    <h3>
                    User Published Content

                    </h3>
                    <p>
                    Coupon Ventures  does not pre-screen or periodically review all user-contributed content. Coupon Ventures  stores the entire right though not the command to edit or withdraw, any Submissions without notice. Coupon Ventures  rejects (i) any guarantee that it will publish, transfer, or continue to disclose any Assents and (ii) any responsibility for editing, extracting, or proceeding to display any entries. Coupon Ventures  does not have a commitment to answer to accusations or review allegations.


                    </p>
                    <h3>By posting any entries, you serve and justify</h3>
                    <p>
                    (a) You own all right, claim, and attention to such posted submissions, including but not restricted to any permission, support, freedom, authorization or consent from any third person imperative for yourself to contribute, publish, upload information or offer the posted content or such posted content which is in the public domain.
(b) Your use of such posted submission forms fair value. You additionally serve and justify that publishing such content does not infringe or authorize the invasion of any license, copyright, tag, sale code, right of secrecy, right of distribution, didactic rights, or different learned or established property right known by any appropriate authority of any form or object, or unless establish the violation of any contract with any another person or item.

                    </p>
                    <p>You also consent not to publish any of the later types of content to the Applications or Sites:

</p>
                    <p>
                    Adult content, obscenity, specific explicit photographs, or stripped pictures.
                    Content that is obscene, abusive, intimidating, attacking, threatening, rude, or offensive.
                    Content encouraging hatred, prejudice, racism, resentment, harassment, hurt, harm or destructive actions.
                    Content advertising illegal actions; or fundamentally political, spiritual, mental, or spiritual content.
                    Content supporting pirated software.
                    Content meaning for phishing or sharing malware.
                    Content that is disparaging of any personality or substance.
                    Content that is in breach of any law or regulation.
                    Any other content that is or could be judged unsuitable, inappropriate or vulgar, all as defined by us.

                    </p>
                    <h3>Accuracy of Information</h3>
                    <p>
                    Coupon Ventures  presents no description or guarantee as to the correctness or suitability for employment of any proposals, including, but not restricted to, tokens, discounts, rebates, etc. posted via Coupon Ventures or that any Dealer will accept or approve any such Coupons. Coupon Ventures  is not accountable for contributing any amount for any Coupons in that case. Coupon Ventures  is not effective for the exchange of erudition at Retailers, including; but not restricted to, discount information, pricing, availability or fitness for use. You agree that Coupon Ventures does not and cannot examine all stock made accessible through websites associated or connecting to any portion of the Services.


                    </p>
                    <h3>Property Ownership</h3>
                    <p>
                    All right, claim and stake in the Services, including trade and technology codes incorporated therein and any practice advancements, formed or produced in conjunction with or associated to these Terms, including all patents, trade secrets, copyright, and other exclusive rights, and any plagiarized operations thereof, shall belong individually and solely to Coupon Ventures or its licensors, and you shall have no claims whatsoever in any of the preceding.


                    </p>
                    <p>
                    You recognize that the Services frame a precious trade secret and the secret information of Coupon Ventures or its licensors. Nothing in certain Terms or oppositely will be judged to give you an ownership share in the Services, in all or in part.
                    </p>
                    <p>
                    All content and elements incorporated as part of the services, such as content, logos, text, pictures, erudition, data, information, qualities, other material, are the property of Coupon Ventures , its licensors, or relevant third party licenses holders such as Traders, and is shielded by trademarks, copyrights, or other exclusive rights and these rights are valid and preserved in all modes, means and technologies surviving now or hereinafter formed.


                    </p>
                    <p>
                    All Compositions are copyrighted as original works and as a joint work below copyright laws and global treaty terms, and Coupon Ventures owns a copyright in the collection, coordination, organization, and improvement thereof. You may not utilize copy, change, alter, extract, eliminate, expand, spread, readjust, and associate in the transfer or disposal.


                    </p>
                    <p>
                    Publicly present or display, communicate, display, or produce copied works from, or in any form abuse any of the compositions, in whole or in part. Any use other than as examined within, including the generation, alteration, dissemination, modifications, of the Works; besides as especially authorized within, is strictly forbidden.

                    </p>
                    <p>
                    You surmise and concede that illegal exposure, use or copying of the exclusive merchandises and services rendered following to these Terms may induce Coupon Ventures and its licensors irreversible injury, which may not be renewed at law, and you consent that Coupon Ventures and its licensors support for violation of these Terms may be in assets by way of injunctive or other impartial aid.


                    </p>
                    <h3>
                    Close of Service
                    </h3>
                    <p>
                    Coupon Ventures denies all liability and responsibility for the availability, opportunity, safety or reliability of the Services. Coupon Ventures stores the right to alter, interrupt, or terminate the Services or entrance to the Services without any notification at any time and without any burden to you.


                    </p>

                </div>
            </div>*/}
       </div>
   </div>
</div>
        </div>
        <Footer  />
      </>
    
  }
}

export default TermCondition;
