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
class GiftCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            allStore:[],
            allCategories:[],
            allGiftCard:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[]
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        
        this.getGiftCard()
        this.getAllCoupon()
        this.getAllOffer()
        
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

    


    getGiftCard = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/gift-card`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allGiftCard:res.data.data.category,
                })
                console.log("allGiftCard",this.state.allGiftCard)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllCoupon = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/coupon`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allCoupon:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getAllOffer = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/offer`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allOffers:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    render() {
    return <>
     {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <Header  />
        <div class="allstore-section" id="git-card-sec">
            <div class="container">
                <h1> Coming Soon!!!</h1>
            </div>
           
            {/* <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <sidebar>
                        
                        <div class="searchby-filter">
                            <h1>Filter by Category</h1>
                            <p><i class="fa fa-search" aria-hidden="true"></i>Search by Category</p>
                            <form action="" class="drop-down">
                                <input type="checkbox" id="vehicle1" name="check1"/>
                                <label for="vehicle1"> Men’s Fashion</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle2" name="check2"/>
                                <label for="vehicle2"> Women’s Fashion</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Kids Fashionldren</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Electronics</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Travel</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Food & Drinks</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                            </form>
                        </div>
                    </sidebar>
                    <sidebar>
                        
                        <div class="searchby-filter">
                            <h1>Filter by Category</h1>
                            <p><i class="fa fa-search" aria-hidden="true"></i>Search by Category</p>
                            <form action="/action_page.php" class="drop-down">
                                <input type="checkbox" id="vehicle1" name="check1"/>
                                <label for="vehicle1"> Men’s Fashion</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle2" name="check2"/>
                                <label for="vehicle2"> Women’s Fashion</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Kids Fashionldren</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Electronics</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Travel</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                                <input type="checkbox" id="vehicle3" name="check3"/>
                                <label for="vehicle3">Food & Drinks</label>
                                <i class="fa fa-caret-up" aria-hidden="true"></i><br></br>
                            </form>
                        </div>
                    </sidebar>
                    </div>
                    <div class="col-md-9">
                        <h1 class="allstores">Gift Card Offer</h1> 
                        <div class="row" id="gift-sec-whole">
                        {this.state.allGiftCard.length > 0 && <>
                        {this.state.allGiftCard.map((list, index) => {
                        return <div class="col-md-4">
                                <div class="card-area" id="blue-background">
                                <ul class="inner-card-area">
                                    <li>
                                    <img src={this.state.image_url+'gift/'+list.image} class="d-inline-block align-top"alt=""/>
                                    </li>
                                    <li class="middle-text">
                                    <p>{list.name}</p>
                                    </li>
                                    <li class="last-text">
                                    <p>{list.description}</p>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            })}
                            </>}
  
                        {this.state.allGiftCard.length === 0 && <>
                              <span>No Record Found</span>
                      </>}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
        
            <Footer  />
        </>;
    }
}

export default GiftCard;