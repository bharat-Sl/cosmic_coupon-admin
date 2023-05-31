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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "assets/img/admin/LOGO-original.png";
import Axios from "axios";
var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    this.state ={
      AdminUsers:[],
      url: process.env.REACT_APP_API_URL,
      AssigModule:[]
    }
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    this.getUserData()
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  getUserData = () => {
    this.setState({
        loading: true
    })
    Axios.get(`${this.state.url}/admin/auth/get/single-staff`, {
        headers: {
            token: sessionStorage.getItem('_access')
        }
    }).then(res => {
        console.log("sidebar", res.data);
        if (res.data.success === true) {
            this.setState({
                loading: false,
                AdminUsers:res.data.data.billing,
                AssigModule:res.data.data.billing.role.assign_module ? res.data.data.billing.role.assign_module : ""
            })
            console.log("AssigModule",this.state.AssigModule)
        } else {
            this.setState({
                showCat: true,
                AdminUsers: []
            })
        }
    }, err => {
        console.log("error", err.response)
    })
}
  render() {
    return (
      <div
        className="sidebar"
        data-color="white"
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="javascript::void()"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          {/* <a
            href="javascript::void()"
            className="simple-text logo-normal"
          >
            Coupon Adventure
          </a> */}
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  {this.state.AssigModule.includes(prop.name) && <> 
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {prop.name === 'Dashboard' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/dashboard-white.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/dashboard-white.png")}/>
                      </>}
                      </>} 
                      {/* {this.state.AssigModule.indexOf("dispatcher")} */}

                      {prop.name === 'Users' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/users.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/users.png")}/>
                      </>}
                      </>}
                      {prop.name === 'Slider' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/sliders.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/sliders.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Bottom Slider' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/bottom-slider.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/bottom-slider.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Exclusive Slider' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/exlusive-sliders.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/exlusive-sliders.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Category' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/categories.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/categories.png")}/>
                      </>}
                      </>}
                      {prop.name === 'Store' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/store-whites.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/store-whites.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Brand' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/brands.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/brands.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Gift Card' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/gift.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/gift.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Coupon' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/coupons.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/coupons.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Offer' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/offers.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/offers.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Deal' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/dealer.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/dealer.png")}/>
                      </>}
                      </>}

                      {prop.name === 'Today Task' && <>
                    {this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/today-task-whites.png")}/>
                    </>}
                    {!this.activeRoute(prop.path) && <>
                      <img src={require("assets/img/today-task-whites.png")}/>
                      </>}
                      </>}

                    <p>{prop.name}</p>
                  </NavLink>
                  </>}
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
