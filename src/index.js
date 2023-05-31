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
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/custom/Login";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/css/style.css";
import "assets/css/slick.css";
import "assets/css/slick-theme.css";
import "assets/js/slick.js";
// import "assets/js/slick.min.js";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import FrontLayout from "layouts/Front.jsx";
import Home from "views/custom/frontend/Home.jsx";
import Deal from "views/custom/frontend/Deal.jsx";
import ViewCategories from "views/custom/frontend/View-categories";
import ViewStore from "views/custom/frontend/View-store";
import Dashboard from "views/custom/frontend/Dashboard";
import TodayTask from "views/custom/frontend/Today-task";
import InnerDeal from "views/custom/frontend/Inner-deal";
import Recharge from "views/custom/frontend/Recharge";
import ReferEarn from "views/custom/frontend/Refer-earn";
import ChangePassword from "views/custom/frontend/Change-password";
import WalletHistory from "views/custom/frontend/Wallet-history";
import CouponDetail from "views/custom/frontend/Coupon-detail";
import StoreDetail from "views/custom/frontend/Store-detail";
import CategoryDetail from "views/custom/frontend/Category-detail";
import UserCoupon from "views/custom/frontend/User-coupon";
import TaskDetail from "views/custom/frontend/Task-detail";
import Offer from "views/custom/frontend/Offer";
import IMPS from "views/custom/frontend/Imps-transfer";
import GiftCard from "views/custom/frontend/Gift-card";
import TodayActivity from "views/custom/frontend/Today-activity";
import BrandDetail from "views/custom/frontend/Brand-detail";
import OfferDetail from "views/custom/frontend/Offer-detail";
import ViewOffer from "views/custom/frontend/View-offer";
import Exclusive from "views/custom/frontend/Exclusive";
import PrivacyPolicy from "views/custom/frontend/Privacy-policy"
import AboutUs from "views/custom/frontend/About-us";
import TermCondition from "views/custom/frontend/Term-condition"
import Refund from "views/custom/frontend/Refund"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
    <Route path="/admin/login" render={props => <Login {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      {/* <Redirect to="/" /> */}
      <Route path="/deal" render={props => <Deal {...props} />} />
      <Route path="/privacy-policy" render={props => <PrivacyPolicy {...props} />} />
      <Route path="/term-condition" render={props => <TermCondition {...props} />} />
      <Route path="/refund" render={props => <Refund {...props} />} />
      <Route path="/about-us" render={props => <AboutUs {...props} />} />
      <Route path="/gift-card" render={props => <GiftCard {...props} />} />
      <Route path="/user-deal" render={props => <InnerDeal {...props} />} />
      <Route path="/user-coupon" render={props => <UserCoupon {...props} />} />
      <Route path="/coupon-detail" render={props => <CouponDetail {...props} />} />
      <Route path="/store-detail" render={props => <StoreDetail {...props} />} />
      <Route path="/brand-detail" render={props => <BrandDetail {...props} />} />
      <Route path="/category-detail" render={props => <CategoryDetail {...props} />} />
      <Route path="/recharge" render={props => <Recharge {...props} />} />
      <Route path="/refer-earn" render={props => <ReferEarn {...props} />} />
      <Route path="/change-passwrod" render={props => <ChangePassword {...props} />} />
      <Route path="/wallet-history" render={props => <WalletHistory {...props} />} />
      <Route path="/today-activity" render={props => <TodayActivity {...props} />} />
      <Route path="/dashboard" render={props => <Dashboard {...props} />} />
      <Route path="/today-task" render={props => <TodayTask {...props} />} />
      <Route path="/offer" render={props => <Offer {...props} />} />
      <Route path="/imps-transfer" render={props => <IMPS {...props} />} />
      <Route path="/task-detail" render={props => <TaskDetail {...props} />} />
      <Route path="/offer-detail" render={props => <OfferDetail {...props} />} />
      <Route path="/view-offer" render={props => <ViewOffer {...props} />} />
      <Route path="/view-category" render={props => <ViewCategories {...props} />} />
      <Route path="/view-store" render={props => <ViewStore {...props} />} />
      <Route path="/exclusive" render={props => <Exclusive {...props} />} />
      <Route path="/" render={props => <Home {...props} />} />
     
    </Switch>
   
  </Router>,
  document.getElementById("root")
);
