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

class Rightsidebar extends React.Component {
  render() {
    return (
        <div class="col-md-2" id="sidebar-sec">
          
            <div id="inner-sidebar">
            {/* <a href="#" class="logo"><img src={require("assets/img/logo-original.png")} alt="logo"/></a> */}
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="sidebar-nav">
                {/*<li class="logo-dash"><img src={require("assets/img/LOGO-original.png")} alt="LOGO"/></li>*/}
                <a href="/dashboard"><li class="active"><img src={require("assets/img/dashboard_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/dashboard_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/dashboard">Dashboard</a></li></a>
                <a href="/today-task"><li><img src={require("assets/img/today_task_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/today_task_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/today-task">Today's Task</a></li></a>
                <a href="/today-activity"><li><img src={require("assets/img/today_activity_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/today_activity_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/today-activity">Today's Activity</a></li></a>
                <a href="/user-deal"><li><img src={require("assets/img/deals_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/deals_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/user-deal">Deals</a></li></a>
                <a href="/user-coupon"><li><img src={require("assets/img/coupon_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/coupon_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/user-coupon">Coupons</a></li></a>
                <a href="/offer"><li><img src={require("assets/img/offer_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/offer_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/offer">Offers</a></li></a>
                <a href="/recharge"><li><img src={require("assets/img/recharge_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/recharge_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/recharge">Bill Payments</a></li></a>
                <a href="/wallet-history"><li><img src={require("assets/img/wallet_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/wallet_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/wallet-history">Wallet History</a></li></a>
                <a href="/refer-earn"><li><img src={require("assets/img/referearn_inactive@2x.png")} alt="dashboard" class="black-img"/><img src={require("assets/img/referearn_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/refer-earn">Refer & Earn</a></li></a>
                <a href="/imps-transfer"><li><img src={require("assets/img/imps_transfer_inactive@2x.png")} alt="dashboard"class="black-img"/><img src={require("assets/img/imps_transfer_active@2x.png")} alt="dashboard" class="hover-image"/><a href="/imps-transfer">Bank Transfer</a></li></a>
                {/* <li><img src={require("assets/img/setting.png")} alt="dashboard"/><a href="/change-passwrod">Change Password</a></li> */}
                </ul>
                </div>
                <ul class="responsive-header">
                    <li class="image"><img src={require("assets/img/wallet-blue@2x.png")} alt="wallet"/></li>
                    <li class="image"><img src={require("assets/img/coin.png")} alt="logout"/></li>
                    <li><img src={require("assets/img/notification.png")} alt="Notification"/></li>
                    <li class="user-image"><img src={require("assets/img/girl2.png")} alt="User"/></li>
                    <li><img src={require("assets/img/logout-btn.png")} alt="logout"/></li>
                </ul>
            </div>
             
            </div>
    );
  }
}


export default Rightsidebar;
