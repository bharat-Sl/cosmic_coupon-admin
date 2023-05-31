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

class Frontfooter extends React.Component {
  render() {
    return (
        <footer>
            {/* <div class="newsletter-form">
                <div class="container">
                <div class="row">
                    <div class="col-md-6">
                    <h3>Subscribe to Coupon Venture</h3>
                    <p>Subscribe to get the best deals & Offers in your email.</p>
                    </div>
                    <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group mb-2">
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter email address"/>
                        </div>
                        <button type="submit" class="btn btn-primary mb-2">Subscribe</button>
                    </form>
                    </div>
                </div>
                </div>
            </div> */}
           {/*  <div class="footer-menu-section">
                <div class="container">
                <div class="row">
                    <div class="col-md-3 col-6">
                    <h4>Company</h4>
                        <ul class="footer-nav-list">
                        <li><a href="http://mygws.in/works/coupon/coupon_deatail_page.html">About Us</a></li>
                        <li><a href="http://mygws.in/works/coupon/all_categories_page.html">Privacy Policy</a></li>
                        <li><a href="#">Terms Of Use</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">GrabOn Indulge</a></li>
                        <li><a href="#">Branding</a></li>
                        <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-6">
                        <h4>GENERAL</h4>
                        <ul class="footer-nav-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms Of Use</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">GrabOn Indulge</a></li>
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-6">
                        <h4>SPECIALITY PAGES</h4>
                        <ul class="footer-nav-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms Of Use</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">GrabOn Indulge</a></li>
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-6">
                        <h4>MORE...</h4>
                        <ul class="footer-nav-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms Of Use</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">GrabOn Indulge</a></li>
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>*/}
            <div class="footer-social-icon-section">
                <div class="container">
                    <div class="row">
                    {/* <div class="col-md-4">
                   <ul class="social-icon-list">
                        <li><a href="https://www.facebook.com/couponventures.in/" class="fa fa-facebook">
                          <img src={require("assets/img/facebook.png")} alt="facebook-logo"/>
                        </a></li>
                        <li><a href="https://www.instagram.com/couponventures/" class="fa fa-instagram">
                          <img src={require("assets/img/inst.png")} alt="Insta-logo"/>
                        </a></li>
                        <li><a href="https://twitter.com/coupon_ventures" class="fa fa-twitter">
                          <img src={require("assets/img/twitter.png")} alt="Twitter-logo"/>
                        </a></li>
                        <li><a href="https://in.pinterest.com/coupon_ventures/" class="fa fa-google">
                          <img src={require("assets/img/pintrest.png")} alt="Google-logo"/>
                         </a></li>
                        <li><a href="https://t.me/couponventures" class="fa fa-youtube">
                          <img src={require("assets/img/telegram.png")} alt="Youtube-logo"/>
                        </a></li>
                         <li><a href="https://www.linkedin.com/company/couponventures" class="fa fa-youtube">
                          <img src={require("assets/img/linked.png")} alt="Youtube-logo"/>
                        </a></li>
                    </ul> 
                    </div> */}
                <div class="col-md-6">
                    <p class="right-reserved">© 2020. All Rights Reserved.</p>
                </div>
                <div class="col-md-6">
                    <div class="copy-right-section right-side-sec">
                    
                    <p>Design &amp; Development By <a href="https://www.ganeshawebtech.com/" target="_blank" rel="noopener noreferrer"><img src={require("assets/img/Logo.png")} alt="logo"/></a></p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* </div> */}
            </footer>
    );
  }
}


export default Frontfooter;
