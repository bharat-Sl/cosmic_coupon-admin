/* eslint-disable  */
import React from "react";
// import Axios from "axios";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import InnerHeader from "components/Navbars/Innerheader";
import Footer from "components/Navbars/Frontfooter";
import RightSidebar from "components/Navbars/Rightsidebar";
import LeftSidebar from "components/Navbars/Leftsidebar";
import * as moment from "moment";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            allTask:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allTask:[],
            TodayCmpTask:[],
            SingleTask:[],
            TaskName:'',
            CatName:"",
            coin:"",
            link:"",
            CatTask:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getLoginUserDetail()
        this.getTodayTask()
        
        
        
        if(!sessionStorage.getItem("_access")){
          window.location.href="/"
      }
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }

    getTaskDetail = (task_id) => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/single-task`,{data:task_id}, {
            
        }).then(res => {
            setTimeout(() => {
              var kk = res.data.data.category.link.split("aff_sub1");
              var url = kk[0]+'aff_sub1='+this.state.User._id+'&aff_sub2='+res.data.data.category._id;
                this.setState({
                    loading:false,
                    showCat:true,
                    SingleTask:res.data.data.category,
                    link:url,
                    TaskName:res.data.data.category.name,
                    coin:res.data.data.category.point,
                    CatName : res.data.data.category.category_id.cat_name
                })
                console.log("this.state.link",this.state.link)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
    }

    getTaskbyCat = (category_id) => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/front/auth/get/category-task`,{data:category_id}, {
            
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    CatTask:res.data.data.category,
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
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

    getTodayTask = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/task`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allTask:res.data.data.category
                })
                
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getLoginUserDetail = () => {
        this.setState({
            loading:true
        })
        var completedTask=[]
        Axios.get(`${this.state.url}/front/auth/get/login-user`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
          if(res.data.data.compltedTodayTask){
            for(let k of res.data.data.compltedTodayTask){
              completedTask.push(+k.offer_id)
            }
          }
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    User:res.data.data.category,
                    TodayCmpTask:completedTask
                    
                })
                this.getTaskDetail(sessionStorage.getItem("task_id"));
                this.getTaskbyCat(sessionStorage.getItem("cat"));
                console.log("brands",this.state.User)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    // openTask = (e, url) => {
    //   window.open(url, '_blank');
    // }

    openTask = (e, url,task_id,category_id) => {
      sessionStorage.setItem("task_id",task_id)
      sessionStorage.setItem("cat",category_id)
      window.open(url, '_blank');
    }

    openNewTask = (e, task_id,category_id) => {
      sessionStorage.setItem("task_id",task_id)
      sessionStorage.setItem("cat",category_id)
    }
   
    

    render() {
      var coupn_setting = {
        className: "coupon-slider",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
         responsive: [
          {
          breakpoint: 1140,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
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
          breakpoint: 830,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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
      }
        return <>
        {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <InnerHeader  />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
              <div class="app-detail-section-whole">
                <ul class="app-detail-breadcrums">
                  <li>
                    <a href="#">
                     <i class="fa fa-arrow-up" aria-hidden="true"></i> <i class="fa fa-caret-right" aria-hidden="true"></i> 
                    </a>
                  </li>
                  <li><a href="/today-task">Task <i class="fa fa-caret-right" aria-hidden="true"></i></a></li>
                  <li><a href="/today-task">{this.state.CatName} <i class="fa fa-caret-right" aria-hidden="true"></i></a></li>
                  <li><a href="/today-task">{this.state.TaskName}</a></li>
                </ul>
                 <div class="row" id="deatail-main-area">
                   <div class="col-md-3">
                      <div class="image-area">
                        <img src={this.state.image_url+'task/'+this.state.SingleTask.image} alt="dashboard"/>
                      </div>
                   </div>
                   <div class="col-md-9">
                     <h1>{this.state.TaskName}</h1>
                     <p class="text">
                       <span>Description</span> <br />
                       {this.state.SingleTask.description}
                     </p>
                     <p class="text">
                      <span>Get Coin</span> <br />
                      {this.state.coin}
                     </p>
                   </div>
                 </div>
                <div class="app-description-whole">
                  {/*<p class="text">
                    <span>The description</span>
                    {this.state.SingleTask.description}
                  </p>
                  <p class="text">
                    <span>Get Coin</span>
                    {this.state.coin}
        </p>*/}
                  {/* <a href="#" class="btn">Show More<i class="fa fa-chevron-down" aria-hidden="true"></i></a> */}

                  <ul class="proper-description">
                    <li class="right">
                      <p>Category</p>
                      <a href="javascript:void()">{this.state.CatName}</a>
                    </li>
                    {/* <li class="center">
                      <p>Latest Version</p>
                      <p>1.00</p>
                    </li> */}
                    <li class="center">
                      <p>Publish Date</p>
                      <p>{moment(this.state.SingleTask.created_at).format("MM-DD-YYYY")}</p>
                    </li>
                    <li class="left">
                      <p>Get it on</p>
                      <p>{this.state.TaskName}</p>
                    </li>
                    
                    <li class="download-btn"><a onClick={(e) => { this.openTask(e, this.state.link, this.state.SingleTask._id, this.state.SingleTask.category_id._id) }} href="javascript:void()">{this.state.SingleTask.button_name}</a></li>
                  </ul>
                </div>
               <h1 class="sec-heading">Similar</h1>
               <div class="row" id="similar-sec">
               {this.state.CatTask.length > 0 && <>
                    {this.state.CatTask.map((list, index) => {
                return <div class="col-md-3">
                    <ul class="inner-similar-sec">
                    <a href="/task-detail" onClick={(e) => { this.openNewTask(e, list._id, list.category_id._id) }}>
                      <li class="left"><img src={this.state.image_url+'task/'+list.image} alt="dashboard"/></li>
                      <li class="right"><p>{list.name}</p></li>
                      </a>
                    </ul>
                 </div>
                 })}
                 </>}

                 {this.state.CatTask.length === 0 && <>
                    <span>No Record Found</span>
            </>}
               </div>
             
             
              </div>
            </div>
            <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default TaskDetail;