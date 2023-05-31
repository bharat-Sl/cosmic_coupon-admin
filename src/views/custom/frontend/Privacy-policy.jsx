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

class PrivacyPolicy extends React.Component {
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
      <h1 class="heading">Privacy Policy</h1>
     <p>This Privacy Policy ("Privacy Policy") explains how Coupon Ventures ("Coupon Ventures", "us", "our", and "we"), collects and uses information when you interact with us. This Privacy Policy applies to all users of Coupon Ventures website published at <a href="https://www.couponventures.in/">www.couponventures.in</a> (and any other websites with "Coupon Ventures" branding that link to this Privacy Policy, including, without limitation, <a href="https://www.couponventures.in/">www.couponventures.in</a>) and any mobile-device applications we offer, such as our Android applications, that are branded " Coupon Ventures " and link or reference this Privacy Policy (collectively, the "Services").<br/>
<br />
If we change our privacy policy then we will post the changes on this page with immediate effect, and may place notices on other pages of the website. This will help you become aware of the information we collect and how we use it at all times. Continued use of the website will pertain to your agreement to any such changes. If you have any doubts regarding this policy, or on how we use and process your personal information, please contact us by sending us an e-mail at supprt@couponventures.in<br/>
<br/>
We are the sole owner of the data collected on the website. We commit to not sell, share, or rent this information to others in ways different from those disclosed in this statement. We may collect and process the following data about you:<br/>
<br/>
Our privacy policy aims to inform you about how the data you share with us will be used, as well as ensuring the protection of the personal data of customers using the Coupon Ventures services ("Users"), ensuring that any information collected will be maintained in accordance with the best safety standards.<br/>
<br/>
The Privacy Policy set out in this term ("Privacy Policy" or "Policy"), regulates the collection and use of information by the Coupon Ventures web domain (www.couponventures.in) ("Site"), and the Coupon Ventures application ("Application"), explaining to Users what information will be collected, how it will be obtained, used and protected.<br/></p>

<h1>What data do we collect and how is it used?</h1>

      <ol>
        <li><span class="heading">Personal data :</span>
          <ol class="inner">
            <li>E-mail, CPF and / or cell phone are used at the first moment to register in our database and to confirm your purchases made via Coupon Ventures in each of our partners. This data will be shared with the store and / or partner in which the purchase was made, in order to identify you with the purchase and make Discount possible.
            </li>
          </ol>
        </li>
        <li>Bank details :
          <ol class="inner">
            <li>Considering the purpose of providing Coupon Ventures services, set out in the  Terms of Use, it is essential to collect information related to making purchases and shopping websites, such as: store of purchase; date and time; order number, amount spent and product purchased. This information may be shared with the store where the purchases were made and with other business partners and are necessary for the identification of your cashback, in addition to the development of Coupon Ventures services, aiming at improving the Users' experience and improving the Site and Application. In this sense, this data can also be used to identify consumption habits and provide better shopping experiences for you in our partners, through the customization of exclusive offers, always respecting the legal provisions.</li>
          </ol>
        </li>
        <li>Information on purchases made and shopping sites :
          <ol class="inner">
            <li> Considering the purpose of providing Coupon Ventures services, set out in the  Terms of Use, it is essential to collect information related to making purchases and shopping websites, such as: store of purchase; date and time; order number, amount spent and product purchased. This information may be shared with the store where the purchases were made and with other business partners and are necessary for the identification of your cashback, in addition to the development of Coupon Ventures services, aiming at improving the Users' experience and improving the Site and Application. In this sense, this data can also be used to identify consumption habits and provide better shopping experiences for you in our partners, through the customization of exclusive offers, always respecting the legal provisions.</li>
          </ol>
        </li>
        <li>Cookies :
          <ol class="inner">
            <li> Basically, Cookies are small pieces of data sent from a website to the visitor's browser. They are collected by Coupon Ventures to identify Users, by sending information through the Coupon Ventures server to the User's computer. Thus, cookies are used for internal audience and navigation control, and can be used to identify or track User preferences, especially when the user disregards any security rules or performs any activity that is harmful to the proper functioning of the Site and Application, such as attempts to defraud the service. The automatic sending of Cookies can be freely changed and deactivated by the User, accessing the browser or device setting.</li>
          </ol>
        </li>
        <li>Location :
          <ol class="inner">
            <li>By using the App to make purchases and identify promotions and discounts, you authorize the collection of accurate data related to your location, even if the App is in the background. The Application contains the geolocation technology, which may be provided by third parties, which allows the capture of the location and recurrence data of the Application, which are collected and treated, anonymously, so that you can receive personalized Push Notifications in the Application. Among the technologies used, the Application uses the location technology that allows the capture of data from visits to commercial establishments, without directly identifying you, for sending located offers through push.  In the first use of the Application, the User will receive a screen notification ("Push") asking for permission to access the location data. The User must comment on the notification, and may grant access or not. However, considering that this type of information is essential for the proper functioning of the Application, if the User denies access to his location, the services of the Coupon Ventures Application may become inaccessible. The collection of data related to location, may be interrupted, at any time, by the User, through the settings of the device used to run the Application.  In the first use of the Application, the User will receive a screen notification ("Push") asking for permission to access the location data. The User must comment on the notification, and may grant access or not. However, considering that this type of information is essential for the proper functioning of the Application, if the User denies access to his location, the services of the Coupon Ventures Application may become inaccessible. The collection of data related to location, may be interrupted, at any time, by the User, through the settings of the device used to run the Application</li>
          </ol>
        </li>
        <li>Device information :
          <ol class="inner">
            <li>Information may be collected about the device used to run the Application, such as: device model (hardware), operating system, software version, serial number, advertising identifiers, network information, among others.</li>
          </ol>
        </li>
         <li>Other information :
          <ol class="inner">
            <li>For the purpose of providing an even better user experience for Users, in exceptional cases, we may share other information with partners, of whom it will always be required, by contract, that the data be processed according to our instructions , safeguarding the necessary security and confidentiality.<br />
<br />
<h4>Information Security</h4>
<br />
Coupon Ventures adopts effective security mechanisms for the treatment of Users' data, ensuring the privacy, authenticity and inviolability of information.
<br />
All data collected by the registration, as well as the use of the Site and Application, are stored in a reserved database and with restricted access to some qualified employees, who are contractually obliged to maintain the confidentiality of the information and not use improperly.
<br />
Our database is equipped with authentication mechanisms for accessing records, allowing detailed cataloguing of these accesses. Thus, it is possible to carry out the subsequent verification, indicating the time, duration, file and identity of the authorized employee who made said access to the records.
<br />
Although this mechanism guarantees the inviolability of the collected data, it is important that the User performs basic security procedures on his cell phone and / or computer, using tools such as antivirus, in addition to not providing or informing his password to any third parties.
<br />
</li>
          </ol>
        </li>
          <h1>Our communication</h1>
          <li>Newsletter and Push notifications :
          <ol class="inner">
            <li> By agreeing to the terms of use, the User accepts to receive notifications by email, SMS, Push, among other mechanisms, with content of an informative or promotional nature strictly related to Coupon Ventures services. Notifications may be canceled at any time by the User, on the Coupon Ventures website. In addition, if you no longer wish to receive our e-mails, you can at any time click on the "unsubscribe" links that accompany the footer of all our e-mails. Notifications in the Application can be blocked through the settings of the mobile device itself.</li>
          </ol>
        </li>
         <li>Browser Notifications :
          <ol class="inner">
            <li>The User may be invited to enable browser notifications, in order to start receiving alerts about their Coupon Ventures deals and offers in the browser they are using. At any time, the User can activate or deactivate Notifications in the browser, through the settings of his account.
<br/>
Suspension of communications: The User may, at any time, activate or deactivate any of the forms of communication of Coupon Ventures mentioned above, through the settings of his account, in the item manage notifications. If you have difficulty canceling notifications, e-mail, push or any other form of communication, just make a request by email or addressed to the email<a href="mailto:help@couponvetures.in"> help@couponvetures.in</a>, stating your personal identification and your intention to block the receiving notifications.
<br />
</li>

          </ol>
          
        </li>
        <h1>General conditions</h1>
          <li>Changes to this Privacy Policy: :
          <ol class="inner">
            <li> From time to time, Coupon Ventures may update and modify this Privacy Policy. Users, in turn, will have a period of 30 (thirty) days to express their agreement with the new Policy. If the manifestation is not carried out during this period, Coupon Ventures may legitimately consider the tacit agreement with the new Privacy Policy.

Accordingly, we recommend that you review this Policy from time to time to keep yourself informed of any changes to it.</li>
          </ol>
        </li>
      </ol>
   </div>
 </div>

</div>




        <div class="coupon-code-inner">
    
        <div class="Click-popup" id="coupon-code-start">
       <div class="container">
            {/*<div class="row">
                <div class="col-md-12">
                    <h2>
                    Privacy Policy
                    </h2>
                    <p>
                    This Privacy Policy ("Privacy Policy") explains how Coupon Ventures ("Coupon Ventures", "us", "our", and "we"), collects and uses information when you interact with us. This Privacy Policy applies to all users of Coupon Ventures website published at www.couponventures.in (and any other websites with "Coupon Ventures" branding that link to this Privacy Policy, including, without limitation, www. couponventures.in) and any mobile-device applications we offer, such as our Android applications, that are branded " Coupon Ventures " and link or reference this Privacy Policy (collectively, the "Services").
                    </p>
                    <p>
                    If we change our privacy policy then we will post the changes on this page with immediate effect, and may place notices on other pages of the website. This will help you become aware of the information we collect and how we use it at all times. Continued use of the website will pertain to your agreement to any such changes. If you have any doubts regarding this policy, or on how we use and process your personal information, please contact us by sending us an e-mail at supprt@couponventures.in
                    </p>
                    <p>
                    We are the sole owner of the data collected on the website. We commit to not sell, share, or rent this information to others in ways different from those disclosed in this statement. We may collect and process the following data about you:
                    </p>
                    <p>
                    Our privacy policy aims to inform you about how the data you share with us will be used, as well as ensuring the protection of the personal data of customers using the Coupon Ventures services ("Users"), ensuring that any information collected will be maintained in accordance with the best safety standards.
                    </p>
                    <p>
                    The Privacy Policy set out in this term ("Privacy Policy" or "Policy"), regulates the collection and use of information by the Coupon Ventures web domain (www.couponventures.in) ("Site"), and the Coupon Ventures application ("Application"), explaining to Users what information will be collected, how it will be obtained, used and protected.
                    </p>
                    <h3>What data do we collect and how is it used?</h3>
                    <p>
                    Personal data:  E-mail, CPF and / or cell phone are used at the first moment to register in our database and to confirm your purchases made via Coupon Ventures in each of our partners. This data will be shared with the store and / or partner in which the purchase was made, in order to identify you with the purchase and make Discount possible.
                    </p>
                    <p>
                    Bank details:  information related to your financial institution, such as Bank, Branch and bank account number, is collected at the time of registration or redemption request. We made the bank transfer of the requested amount as a redemption based on the information passed in the registration. These data are used strictly for the purpose of paying the redemption of the Users' Earning Coins balance, and are not shared for commercial purposes by any third party.
                    </p>
                    <p>
                    Information on purchases made and shopping sites: Considering the purpose of providing Coupon Ventures services, set out in the  Terms of Use, it is essential to collect information related to making purchases and shopping websites, such as: store of purchase; date and time; order number, amount spent and product purchased. This information may be shared with the store where the purchases were made and with other business partners and are necessary for the identification of your cashback, in addition to the development of Coupon Ventures services, aiming at improving the Users' experience and improving the Site and Application. In this sense, this data can also be used to identify consumption habits and provide better shopping experiences for you in our partners, through the customization of exclusive offers, always respecting the legal provisions.

                    </p>
                    <p>
                    Cookies: Basically, Cookies are small pieces of data sent from a website to the visitor's browser. They are collected by Coupon Ventures to identify Users, by sending information through the Coupon Ventures server to the User's computer. Thus, cookies are used for internal audience and navigation control, and can be used to identify or track User preferences, especially when the user disregards any security rules or performs any activity that is harmful to the proper functioning of the Site and Application, such as attempts to defraud the service. The automatic sending of Cookies can be freely changed and deactivated by the User, accessing the browser or device settings.
                    </p>
                    <p>
                    Location:By using the App to make purchases and identify promotions and discounts, you authorize the collection of accurate data related to your location, even if the App is in the background. The Application contains the geolocation technology, which may be provided by third parties, which allows the capture of the location and recurrence data of the Application, which are collected and treated, anonymously, so that you can receive personalized Push Notifications in the Application. Among the technologies used, the Application uses the location technology that allows the capture of data from visits to commercial establishments, without directly identifying you, for sending located offers through push.  In the first use of the Application, the User will receive a screen notification ("Push") asking for permission to access the location data. The User must comment on the notification, and may grant access or not. However, considering that this type of information is essential for the proper functioning of the Application, if the User denies access to his location, the services of the Coupon Ventures Application may become inaccessible. The collection of data related to location, may be interrupted, at any time, by the User, through the settings of the device used to run the Application.  In the first use of the Application, the User will receive a screen notification ("Push") asking for permission to access the location data. The User must comment on the notification, and may grant access or not. However, considering that this type of information is essential for the proper functioning of the Application, if the User denies access to his location, the services of the Coupon Ventures Application may become inaccessible. The collection of data related to location, may be interrupted, at any time, by the User, through the settings of the device used to run the Application


                    </p>
                    <p>
                    Device information: Information may be collected about the device used to run the Application, such as: device model (hardware), operating system, software version, serial number, advertising identifiers, network information, among others.
                    </p>
                    <p>
                    Other information: For the purpose of providing an even better user experience for Users, in exceptional cases, we may share other information with partners, of whom it will always be required, by contract, that the data be processed according to our instructions , safeguarding the necessary security and confidentiality.
                    </p>
                    <h3>Information Security</h3>
                    <p>
                    Coupon Ventures adopts effective security mechanisms for the treatment of Users' data, ensuring the privacy, authenticity and inviolability of information.
                    </p>
                    <p>
                    All data collected by the registration, as well as the use of the Site and Application, are stored in a reserved database and with restricted access to some qualified employees, who are contractually obliged to maintain the confidentiality of the information and not use improperly.


                    </p>
                    <p>
                    Our database is equipped with authentication mechanisms for accessing records, allowing detailed cataloguing of these accesses. Thus, it is possible to carry out the subsequent verification, indicating the time, duration, file and identity of the authorized employee who made said access to the records.
                    </p>
                    <p>
                    Although this mechanism guarantees the inviolability of the collected data, it is important that the User performs basic security procedures on his cell phone and / or computer, using tools such as antivirus, in addition to not providing or informing his password to any third parties.
                    </p>
                    <p>
                    Our communication
                    </p>
                    <p>
                    Newsletter and Push notifications:  By agreeing to the terms of use, the User accepts to receive notifications by email, SMS, Push, among other mechanisms, with content of an informative or promotional nature strictly related to Coupon Ventures services. Notifications may be canceled at any time by the User, on the Coupon Ventures website. In addition, if you no longer wish to receive our e-mails, you can at any time click on the "unsubscribe" links that accompany the footer of all our e-mails. Notifications in the Application can be blocked through the settings of the mobile device itself.
                    </p>
                    <p>
                    Browser Notifications: The User may be invited to enable browser notifications, in order to start receiving alerts about their Coupon Ventures deals and offers in the browser they are using. At any time, the User can activate or deactivate Notifications in the browser, through the settings of his account.
                    </p>
                    <p>
                    Suspension of communications: The User may, at any time, activate or deactivate any of the forms of communication of Coupon Ventures mentioned above, through the settings of his account, in the item manage notifications. If you have difficulty canceling notifications, e-mail, push or any other form of communication, just make a request by email or addressed to the email help@couponvetures.in, stating your personal identification and your intention to block the receiving notifications


                    </p>
                    <p>General conditions</p>
                    <p>
                    Changes to this Privacy Policy:  From time to time, Coupon Ventures may update and modify this Privacy Policy. Users, in turn, will have a period of 30 (thirty) days to express their agreement with the new Policy. If the manifestation is not carried out during this period, Coupon Ventures may legitimately consider the tacit agreement with the new Privacy Policy.
                    </p>
                    <p>
                    Accordingly, we recommend that you review this Policy from time to time to keep yourself informed of any changes to it.
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

export default PrivacyPolicy;
