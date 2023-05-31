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
class Deal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            allStore:[],
            allCategories:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allBrand:[]
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        
        this.getDeal()
        this.getBrand()
        this.getAllCoupon()
        this.getAllCategory()
        this.getAllOffer()
        this.changeCurrency()
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

    getBrand = () => {
      this.setState({
          loading:true
      })
      var store=[]
      Axios.get(`${this.state.url}/front/auth/get/all-brand`, {
          headers: {
              token: sessionStorage.getItem('_access')
          }
      }).then(res => {
          
          console.log("sotre",store)
          setTimeout(() => {
              this.setState({
                  loading:false,
                  showCat:true,
                  allBrand:res.data.data.category,
              })
          }, 100);
          
      }, err => {
          console.log("error", err.response)
      })
      
  }


    getDeal = () => {
        this.setState({
            loading:true
        })
        var store=[]
        Axios.get(`${this.state.url}/front/auth/get/deal`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            if(res.data.data.category.length >0){
                for(let k of res.data.data.category){
                    store.push(k.store_id)
                }
            }
            console.log("sotre",store)
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeal:res.data.data.category,
                    storeArr:store
                })
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

    getAllCategory = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/all-category`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allCategories:res.data.data.category
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

    openDetailPage = (e, id) => {
      sessionStorage.setItem("store_id",id)
    }

    OpenCategoryPage = (e, cat_id) => {
      var newPageUrl = 'category-detail';
      sessionStorage.setItem("cat_id",cat_id)
      window.open(newPageUrl, "_self")
    }

    openBrandDetail = (e, id) => {
      sessionStorage.setItem("brand_id",id)
    }

    changeCurrency = () => {
        // var baseAmt = 100;
        Axios.get(`https://api.exchangeratesapi.io/latest?base=${sessionStorage.getItem("currency")}`, {
          
      }).then(res => {
        //   setTimeout(() => {
              console.log(res)
              this.setState({
                rates: res.data['rates'],
                currencies: Object.keys(res.data['rates']).sort(),
                
              })
            //   window.location.reload();
            //   console.log("Number.parseFloat(baseAmt",Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)) 
            //   return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
            
        //   }, 100);
          
      }, err => {
          console.log("error", err.response)
      })
      }

    convertAmount(baseAmt){
        return Number.parseFloat(baseAmt / this.state.rates["INR"]).toFixed(2)
    }

    render() {
        var deal = {    
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
                   responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
         {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
          };
          var brand = {
            dots: true,
            infinite: true,
            speed: 600,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
                        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
         {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
         {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]

          };
          
          var trending_setting = {
            dots: true,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
          };
          
        return <>
        {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <Header  />
        
        <div class="coupon-day-sec toady-trending-deals" id="toady-trending-deals-section">
            <div class="container"> 
            <h1>Today's Trending Deals</h1>
           <img src={require("assets/img/red.png")} alt="logo"/>
            {/* <div class="row slidercoupon2"> */}
            <Slider {...deal}>
                   
                {this.state.allDeal.map((slide, index) => {
                     var discount_type = "";
                     if(sessionStorage.getItem("currency") == 'INR'){
                       discount_type = "₹"
                     }else{
                       discount_type = sessionStorage.getItem("currency");
                     }
                   return <a class="nav-link" href="/store-detail" onClick={(e) => { this.openDetailPage(e, slide.store_id._id) }}>
                   <div class="col-md-12">
                        <div class="coupon-whole-section">
                        <div class="upper-sec-block">
                        <img src={this.state.image_url+'deal/'+slide.image} class="d-inline-block align-top"alt=""/>
                            <div class="text">
                                <p>{slide.title}</p>
                               {slide.discount_type == 'percent' && <> <h3>Flat {slide.discount} % Off</h3> </>}

                               {slide.discount_type == 'amount' && <> <h3>Flat {this.convertAmount(slide.discount)} {discount_type} Off</h3> </>}

                                <h4>{slide.description}</h4>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    </a>
                     })}
            </Slider>
                
            {/* </div> */}
            </div>
            </div>


            <div class="popular-offer-section">
                <div class="container">
                    <div class="row">
                    <div class="col-md-3 main-populer-sec">
                        <div class="popular-sec">
                        <img src={require("assets/img/red-bg.png")}/>
                            <div class="populer-text">
                            <h1>Popular<br></br>
                                Categories</h1>
                                <div class="view-all">
                                {/* <a href="javascript:void(0)">View all <i class="fa fa-caret-right" aria-hidden="true"></i></a> */}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-md-9 all-product-sec">
                    {this.state.allCategories.length > 0 && <>
                        {this.state.allCategories.map((slide, index) => {
                            if(index <9){
                       return <a href="javascript:void()" onClick={(e) => { this.OpenCategoryPage(e, slide._id) }}>
                        <div class="product-main-sec">
                            <div class="product-image">
                            <img src={this.state.image_url+'category/'+slide.image} class="d-inline-block align-top"alt=""/>
                                </div>
                            <div class="product-text">
                                <h2>{slide.cat_name}</h2>
                            </div>
                            
                        </div>
                        </a>
                            }
                         })}
                         </>}
                        </div>
                    </div>
                    </div>
                </div>

            <div class="deal-of-the-day-sec">
                  <div class="whole-deal-of-the-section">
                  <h1>Deals of the Day</h1>
                  <p><img src={require("assets/img/red.png")} alt="logo"/> </p>
                   <div class="container">
                    <div class="row">
                    {this.state.allDeal.length > 0 && <>
                        {this.state.allDeal.map((slide, index) => {
                            var discount_type = "";
                            if(sessionStorage.getItem("currency") == 'INR'){
                                discount_type = "₹"
                            }else{
                                discount_type = sessionStorage.getItem("currency");
                            }
                        if(index <11){
                            var Amtprice = slide.price-slide.discount;
                            var Perprice = slide.price-slide.price*slide.discount/100;

                       return <div class="col-md-3">
                       <a class="nav-link" href="/store-detail" onClick={(e) => { this.openDetailPage(e, slide.store_id._id) }}>
                        <ul class="inner-deal-sec">
                          <li class="discount">
                            {slide.discount_type == 'amount' && <>
                            <span>{discount_type} {this.convertAmount(slide.discount)} off</span>
                            </>}
                            {slide.discount_type == 'percent' && <>
                            <span>{slide.discount}% off</span>
                            </>}
                          </li>
                          <li class="img">
                            <img src={this.state.image_url+'deal/'+slide.image} alt="logo"/>
                          </li>
                          <li class="company">
                            <h3>{slide.store_id.name}</h3>
                          </li>
                          <li class="text">
                            <p>{slide.description}</p>
                          </li> 
                          <li class="left">
                            {slide.discount_type == 'amount' && <>
                            <p>{discount_type} {this.convertAmount(Amtprice)}</p>
                            </>}
                            {slide.discount_type == 'percent' && <>
                            <p>{discount_type} {this.convertAmount(Perprice)}</p>
                            </>}
                            <span>{discount_type} {this.convertAmount(slide.price)}</span>
                          </li>  
                          <li class="right">
                            <a href="#" class="buy-now-btn">Buy Now</a>
                          </li>                   
                        </ul> 
                         </a>
                      </div>
                     
                    }
                  })}
                  </>}
                      

                     </div>
                    </div>
                  </div>

                  

                  
            </div>  


                <div class="popular-section new-popular-store">
                    <div class="container">
                        <h1>Trending Stores</h1>
                        <img src={require("assets/img/red.png")} alt="logo"/>
                        <div class="row">
                        <div class="col-md-9 mx-auto sliderpopular add-populer-section">
                        <Slider {...trending_setting}>
                        {this.state.allDeal.map((slide, index) => {
                          return  <div class="whole-store-section " id="whole-deal-store">
                            <div class="row">
                            {this.state.storeArr.length > 0 && <>
                                {this.state.storeArr.map((list, index) => { 
                                    if(index <9){
                              return <div class="col-md-4">
                                <a class="nav-link" href="/store-detail" onClick={(e) => { this.openDetailPage(e, list._id) }}>
                                    <ul class="whole-popular-section">
                                    <li class="img">
                                    <img src={this.state.image_url+'store/'+list.image} class="d-inline-block align-top"alt=""/>
                                    </li>
                                    <li class="text">
                                        <p class="heading">{list.name}</p>
                                        <p class="offer">{list.description}</p>
                                    </li>
                                    </ul>
                                    
                                   </a> 
                                </div>
                                
                                    }
                                })}
                                </>}
                            </div>
                            </div>
                            })}
                        
                        </Slider>
                        </div>
                        
                        </div>
                    </div>
                    </div>


                    <div class="fashion-deals-section">
                        <div class="container">
                            <div class="main-slider-section">
                        <h1>Popular Brand</h1>
                         <img src={require("assets/img/red.png")} alt="logo"/>
                        <Slider {...deal}>
                   
                        {this.state.allDeal.map((slide, index) => {
                        return <a class="nav-link" href="/brand-detail" onClick={(e) => { this.openBrandDetail(e, slide.brand_id._id) }}>
                        <div class="col-md-12">
                                <div class="coupon-whole-section">
                                <div class="upper-sec-block">
                                <img src={this.state.image_url+'brand/'+slide.brand_id.image} class="d-inline-block align-top"alt=""/>
                                    <div class="text">
                                        <p>{slide.brand_id.brand_name}</p>
                                        {/* <h3>Flat {slide.discount} {slide.discount_type == 'percent' ? "%" : "₹"} Off</h3> */}
                                        <h4>{slide.brand_id.description}</h4>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                            </a>
                            })}
                    </Slider>
                        </div>
                        {/* <div class="main-slider-section win-deals win-slider">
                            <h1>The Wine Deals</h1>
                            <img src="images/red-line.png" class="d-inline-block align-top"alt=""/>
                            <div class="row slider">
                            <Slider {...deal}>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                <div class="deals-blocks">
                                    <img src="images/wine.png"/>
                                    <div class="deals-content">
                                    <p>Personalised Wine</p>
                                    <div class="text-sec">
                                
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 599</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 1299</del></h4>
                                </div>
                                <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                </Slider>
                            </div>
                            </div>
                            <div class="main-slider-section win-deals">
                            <h1>Electronic Deals</h1>
                            <img src="images/red-line.png" class="d-inline-block align-top"alt=""/>
                            <div class="row slider">
                            <Slider {...deal}>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="deals-blocks">
                                    <img src="images/laptop.png"/>
                                    <div class="deals-content">
                                        <p>Razer Blade</p>
                                        <div class="text-sec">
                                    
                                    <h3 class="price"><i class="fa fa-inr" aria-hidden="true"></i> 30,999</h3>
                                    <h4 class="cut-price"><del><i class="fa fa-inr" aria-hidden="true"></i> 38,000</del></h4>
                                    </div>
                                    <div class="off-price">
                                    <a href="javascript:void(0)">70% Off</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </Slider>
                            </div>
                            </div> */}
                            <div class="main-slider-section win-deals">
                                <h1>Popular Electronic Brands</h1>
                                 <img src={require("assets/img/red.png")} alt="logo"/>
                                {/* <div class="row slider-brands"> */}
                                <Slider {...brand}>
                                {this.state.allBrand.map((slide, index) => {
                                  return  <a class="nav-link" href="/brand-detail" onClick={(e) => { this.openBrandDetail(e, slide._id) }}>
                                  <div class="col-md-12">
                                    <div class="brands-sec">
                                    <img src={this.state.image_url+'brand/'+slide.image} class="d-inline-block align-top"alt=""/>
                                    
                                    </div>
                                    </div>
                                    </a>
                                  })}   
                                
                                </Slider>
                                
                                {/* </div> */}
                                </div>
                        </div>
                        </div>
            <Footer  />
        </>;
    }
}

export default Deal;