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
class TodayTask extends React.Component {
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
            TodayCmpTask:[]
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
      setInterval(async () => {
        this.getLoginUserDetail()
      },4000)
        this.getTodayTask()
        
        if(!sessionStorage.getItem("_access")){
          window.location.href="/"
      }
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
        // this.setState({
        //     loading:true
        // })
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
                    // loading:false,
                    showCat:true,
                    User:res.data.data.category,
                    TodayCmpTask:completedTask
                    
                })
                console.log("brands",this.state.TodayCmpTask)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    openTask = (e, task_id,category_id) => {
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
                 <div class="page-heading"> 
                   <h1>Today-Task</h1>
                 </div>
                  <div class="row" id="today-task-block">

                  {this.state.allTask.length > 0 && <>
                    {this.state.allTask.map((list, index) => {
                      // var url = list.link+'&aff_sub1=1&aff_sub2=3';
                      
                    return  <div class="col-md-3">
                       <div class="task-shadow">
                        <ul class="inner-task">
                          <li class="icon"><img src={this.state.image_url+'task/'+list.image} alt="dashboard"/></li>
                          <li class="heading"><p>{list.name}</p></li>
                        </ul>
                        <a href="/task-detail" onClick={(e) => { this.openTask(e, list._id, list.category_id._id) }}>
                        <ul class="downlaod-btn">
            
                        {this.state.TodayCmpTask.includes(list._id) && <>
                          <li><a href="javascript:void()">Completed</a></li>
                          </>}

                          {!this.state.TodayCmpTask.includes(list._id) && <>
                            <li><a href="/task-detail" onClick={(e) => { this.openTask(e, list._id, list.category_id._id) }}>{list.button_name}</a></li>
                          </>}
                         
                
                        </ul>
                        </a>
                      </div>
                     </div>
                      })}
                      </>}
                      {this.state.allTask.length === 0 && <>
                        <span>No Record Found</span>
                    </>}
                      
                   </div>
                   

                 
                {/* <div class="container" id="view-all-sec">
                   <div class="view-all-btn">
                     <a href="#">View All</a>
                   </div>
                </div> */}
            </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default TodayTask;