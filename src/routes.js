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
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";

import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import UserPage from "views/User.jsx";
import Category from "views/custom/Category";
import Store from "views/custom/Store";
import Slider from "views/custom/Slider";
import BottomSlider from "views/custom/Bottom-slider";
import ExclusiveSlider from "views/custom/Exclusive-slider";
import Giftcard from "views/custom/Giftcard";
import Coupon from "views/custom/Coupon";
import Offer from "views/custom/Offer";
import User from "views/custom/User";
import Deal from "views/custom/Deal";
import Brand from "views/custom/Brand";
import FrontDeal from "views/custom/frontend/Deal";
import TodayTask from "views/custom/Today-task";
import FeaturedTodayTask from "views/custom/Featured-todayTask";
import UserManagement from "views/custom/User-management";
import UserroleManagement from "views/custom/Userrole-management";
import Subscribe from "views/custom/Subscribe";
import FeaturedDeal from "views/custom/Featured-deal";
import Notification from "views/custom/Notification";


var routes = [
  

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-diamond",
    component: User,
    layout: "/admin"
  },
  {
    path: "/slider",
    name: "Slider",
    icon: "nc-icon nc-diamond",
    component: Slider,
    layout: "/admin"
  },
  {
    path: "/bottom-slider",
    name: "Bottom Slider",
    icon: "nc-icon nc-diamond",
    component: BottomSlider,
    layout: "/admin"
  },
  {
    path: "/exclusive-slider",
    name: "Exclusive Slider",
    icon: "nc-icon nc-diamond",
    component: ExclusiveSlider,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-diamond",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/stores",
    name: "Store",
    icon: "nc-icon nc-pin-3",
    component: Store,
    layout: "/admin"
  },
  {
    path: "/brand",
    name: "Brand",
    icon: "nc-icon nc-pin-3",
    component: Brand,
    layout: "/admin"
  },
  {
    path: "/gift-card",
    name: "Gift Card",
    icon: "nc-icon nc-pin-3",
    component: Giftcard,
    layout: "/admin"
  },
  {
    path: "/coupon",
    name: "Coupon",
    icon: "nc-icon nc-pin-3",
    component: Coupon,
    layout: "/admin"
  },
  {
    path: "/offer",
    name: "Offer",
    icon: "nc-icon nc-pin-3",
    component: Offer,
    layout: "/admin"
  },
  {
    path: "/deal",
    name: "Deal",
    icon: "nc-icon nc-pin-3",
    component: Deal,
    layout: "/admin"
  },
  {
    path: "/today-task",
    name: "Today Task",
    icon: "nc-icon nc-pin-3",
    component: TodayTask,
    layout: "/admin"
  },
  {
    path: "/featured-today-task",
    name: "Featured Today Task",
    icon: "nc-icon nc-pin-3",
    component: FeaturedTodayTask,
    layout: "/admin"
  },
  {
    path: "/featured-deal",
    name: "Featured Deal",
    icon: "nc-icon nc-pin-3",
    component: FeaturedDeal,
    layout: "/admin"
  },
  {
    path: "/subscriber",
    name: "View Subscriber",
    icon: "nc-icon nc-pin-3",
    component: Subscribe,
    layout: "/admin"
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "nc-icon nc-pin-3",
    component: UserManagement,
    layout: "/admin"
  },
  {
    path: "/user-role",
    name: "User Role Management",
    icon: "nc-icon nc-pin-3",
    component: UserroleManagement,
    layout: "/admin"
  },
  {
    path: "/notification",
    name: "Notification",
    icon: "nc-icon nc-pin-3",
    component: Notification,
    layout: "/admin"
  },

  {
    path: "/view-deal",
    // name: "Restaurant History",
    // icon: "nc-icon nc-pin-3",
    component: FrontDeal,
    // layout: "/admin"
  },

 

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];
export default routes;
