/* eslint-disable  */
import React from "react";
// import Axios from "axios";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import Header from "components/Navbars/Frontheader";
import Footer from "components/Navbars/Frontfooter";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class ViewStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            allStore:[],
            allFilterStore:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allFilterStore:[],
            allBrand:[]
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getFilterStore()
        this.getAllCoupon()
        this.getBrand()
        this.getAllDeal()
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }
    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
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

    getFilterStore = (type=null) => {
        console.log(type);
        this.setState({
            loading:true
        })
        var data = {
            type:type
        }
        Axios.post(`${this.state.url}/front/auth/get/all-filter-store`,{data:data}, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allFilterStore:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getBrand = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/brand`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allBrand:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }


    openDetailPage = (e, id) => {
        sessionStorage.removeItem("store_id");
        sessionStorage.setItem("brand_id",id)
      }

      OpenStorePage = (e, id) => {
          alert(id)
          sessionStorage.removeItem("brand_id");
          sessionStorage.setItem("store_id",id)
      }

    getAllDeal = (e) => {
        
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/deal`, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeal:res.data.data.category,
                })
                console.log("allstore",this.state.allDeal)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllCoupon = (e) => {
        
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/coupon`, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allCoupon:res.data.data.category,
                })
                console.log("allstore",this.state.allDeal)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getCateDealCount = id => {
        var dealCount = [];
        this.state.allDeal.map((inst, k) => {
            if (inst.category_id._id === id) {
                dealCount.push(inst);
            }
        })
        console.log("dealCount",dealCount)

        return dealCount.length;  
    }

    getCateCouponCount = id => {
        var couponCount = [];
        this.state.allCoupon.map((inst, k) => {
            if (inst.category_id._id === id) {
                couponCount.push(inst);
            }
        })

        return couponCount.length;  
    }

    render() {
        
        return <>
        {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <Header  />
         <div class="category-banner">
          <div class="container">
           <h1 class="allstores">All Stores</h1> 
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
          </div>
         </div>
            <div class="allstore-section" id="allstore-category">
                <div class="container">
                    <div class="row">
                        {/* <div class="col-md-3">
                        <sidebar>
                            <div class="searchby-store">
                            <p><i class="fa fa-search" aria-hidden="true"></i>Search by store</p>
                            </div>
                            <div class="searchby-filter">
                                <h1>Filter by Category</h1>
                                <form action="/action_page.php" class="drop-down">
                                {this.state.allFilterStore.length > 0 && <>
                                        {this.state.allFilterStore.map((list, index) => { 
                                    return <> <input type="checkbox" id="vehicle1" value={list._id} name="check1"/>
                                        <label for="vehicle1"> {list.cat_name}</label>
                                        <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                        </>
                                    })}
                                    </>}
                                </form>
                            </div>
                        </sidebar>
                        </div> */}
                        <div class="col-md-12">
                            <h1 class="allstores">Browse All Stores</h1> 
                              <ul class="list-alaphabet">
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'All') }}>All</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'A') }}>A</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'B') }}>B</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'C') }}>C</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'D') }}>D</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'E') }}>E</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'F') }}>F</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'G') }}>G</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'H') }}>H</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'I') }}>I</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'J') }}>J</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'K') }}>K</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'L') }}>L</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'M') }}>M</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'N') }}>N</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'O') }}>O</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'P') }}>P</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'Q') }}>Q</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'R') }}>R</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'S') }}>S</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'T') }}>T</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'U') }}>U</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'V') }}>V</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'W') }}>W</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'X') }}>X</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'Y') }}>Y</a></li>
                     <li><a href="javascript:void()" onClick={(e) => { this.getFilterStore( 'Z') }}>Z</a></li>
                 </ul>
                            {/* <div class="categories-main-sec">
                            <div class="row">
                                <div class="col-md-8">
                                <div class="categories-img">
                                    <img src="images/long-sleeve.png"/>
                                </div>
                                <div class="categories-text">
                                    <p>Men’s Fashion<span>(200 offers)</span></p>
                                </div>
                                </div>
                                <div class="col-md-4">
                                <div class="view-all-btn">
                                    <a href="#">View All</a>
                                </div>
                                </div>
                            </div>
                            </div> */}
                            {this.state.allFilterStore.length > 0 && <>
                                {this.state.allFilterStore.map((list, index) => { 
                            return <> <div class="listing-area-section categories">
                                <div class="row">
                                    <div class="col-md-12">
                                    <div class="categories-img">
                                        <img height="5%" width="10%" src={this.state.image_url+'store/'+list.image}/>
                                    </div>
                                    <div class="categories-text">
                                        <p>{list.name}<br /><span>({this.getCateDealCount(list._id)} Deal, {this.getCateCouponCount(list._id)} Coupon)</span></p>
                                    </div>
                                    <div class="view-all-btn">
                                        <a href="/store-detail" onClick={(e) => { this.OpenStorePage(e, list._id) }}>View All</a>
                                    </div>
                                    </div>
                                    {/*<div class="col-md-4">
                                    <div class="view-all-btn">
                                        <a href="/store-detail" onClick={(e) => { this.OpenStorePage(e, list._id) }}>View All</a>
                                    </div>
                                    </div>*/}
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="inner-listing">
                                        {this.state.allBrand.length > 0 && <>
                                            {this.state.allBrand.map((brand, index) => {        
                                       return <>
                                       {list._id ==brand.store_id && <>
                                        <li><a href="/brand-detail" onClick={(e) => { this.openDetailPage(e, brand._id) }}>{brand.brand_name}</a></li>
                                        </>}
                                        </>
                                    })}
                                    </>}
                                        </ul>
                                    </div>
                                    {/* <div class="col-md-4">
                                        <ul class="inner-listing">
                                            <li><a href="#">A2 Hosting</a></li>
                                            <li><a href="#">ACT Fibernet Broadband</a></li>
                                            <li><a href="#">APSRTC Bus Booking</a></li>
                                            <li><a href="#">Aaneri</a></li>
                                            <li><a href="#">A2 Hosting</a></li>
                                            <li><a href="#">ACT Fibernet Broadband</a></li>
                                        </ul> 
                                    </div>
                                    <div class="col-md-4">
                                        <ul class="inner-listing">
                                            <li><a href="#">A2 Hosting</a></li>
                                            <li><a href="#">ACT Fibernet Broadband</a></li>
                                            <li><a href="#">APSRTC Bus Booking</a></li>
                                            <li><a href="#">Aaneri</a></li>
                                            <li><a href="#">A2 Hosting</a></li>
                                            <li><a href="#">ACT Fibernet Broadband</a></li>
                                        </ul> 
                                    </div> */}
                                </div>  
                            </div>
                            </>
                                    })}
                                    </>}
                                    {this.state.allFilterStore.length === 0 && <>
                                        <span>No Record Found</span>
                                    </>}
                        </div>
                    </div>
                </div>
            </div>
        
            <Footer  />
        </>;
    }
}

export default ViewStore;