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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import Axios from "axios";
import NotificationAlert from "react-notification-alert";
import ModernDatepicker from 'react-modern-datepicker';
import { Modal } from "react-bootstrap";
import * as moment from "moment";
const $ = window.jQuery;

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allNotification:[],
            edit_mode:false,
            cat_name:"",
            deal_id:"",
            start_date:"",
            expire_date:"",
            description:"",
            allUsers:[],
            allDeal:[],
            status:"",
            image:"",
            type:"",
            title:"",
            message:"",
            show_list:true,
            ShowDatatable:true
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    notificationAlert = React.createRef();
    componentDidMount = () => {
        localStorage.removeItem("width");
        localStorage.removeItem("height");
        if(!sessionStorage.getItem("_access")){
            window.location.href="/admin/login"
        }else{
            this.getNotification();
            this.getDeal()
        }
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Featured Deal")) {
            window.location.href = "/admin/login"
         }
        
        
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.title === "") {
            this.notify("error", "Please enter title.");
            return false;
        }
      
        if (this.state.message === "") {
            this.notify("error", "Please enter message.");
            return false;
        }
        var data = {
            title:this.state.title,
            message: this.state.message,
            id:this.state.id ? this.state.id :""

        }
        
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/notitication`,data)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getNotification();
                this.notify("success", "Featured Deal updated successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
            Axios.post(`${this.state.url}/admin/auth/add/notitication`,data)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getNotification();
                this.notify("success", "Notification added successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }
        
       
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

    onChange(e) {
        var file_size = e.target.files[0].size;
        var file_type = e.target.files[0].type;
        if (e.target.files) {
            let file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
               var image = new Image();
               image.src = e.target.result;
               image.onload = function (ev) {
                  console.log(image)
                  const canvas = document.createElement('canvas');
                  canvas.width = image.width;
                  canvas.height = image.height;
                  localStorage.removeItem("width");
                  localStorage.removeItem("height");
                  localStorage.setItem("width", canvas.width);
                  localStorage.setItem("height", canvas.height);
               }
            }
         }
        if(file_type !== "image/png" && file_type !== "image/jpg" &&  file_type !== "image/jpeg"){
            this.notify("error", "Please upload PNG or JPG format only.");
            return false
        }
        else if (file_size > 1e6) {
            this.notify("error", "Please upload a file smaller than 1 MB.");
            // window.alert("Please upload a file smaller than 10 MB");
            return false;
        }
        else{
            this.setState({
                "file":e.target.files[0],
            });
        }
        // this.setState({"file":e.target.files[0]});
    }

    getNotification = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/notification`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allNotification:res.data.data.category
                })
                if(this.state.ShowDatatable){
                    var oTable = $('#myTableTypesMain').DataTable({
                        "aaSorting": [],
                        "columnDefs": [{
                            "targets": [0, 1],
                            "orderable": false,
                            
                        }],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'excel',
                                text: 'Transfer To Excel',
                                extension: '.xlsx',
                                title: 'Category'
                            },
                            {
                                extend: 'pdf',
                                text: 'Transfer To pdf',
                                extension: '.pdf',
                                title: 'Category'
                            }
                        ]
                    });
                    $("#myTableTypesMain_length").hide();
                    $(".dataTables_filter,.dt-buttons").hide();
                    $('#myInputTextField').keyup(function () {
                        oTable.search($(this).val()).draw();
                    })
                    var that = this;
                    $("#SelectPage").on('change', function (e){
                        e.preventDefault();
                        var val = $(this).val();
                        if(val === '10'){
                        oTable.page.len( 10 ).draw();
                        that.openAction();
                        }
                        if(val === '25'){
                        oTable.page.len( 25 ).draw();
                            that.openAction();
                        }
                        if(val === '50'){
                        oTable.page.len( 50 ).draw();
                            that.openAction();
                        }
                        if(val === '100'){
                        oTable.page.len( 50 ).draw();
                            that.openAction();
                        }
                        if(val === 'all'){
                        oTable.page.len( -1 ).draw();
                            that.openAction();
                        }
                        // oTable.page.len( -1 ).draw();
                    })
                    $("#typesTableExport").on("click", function (e) {
                        e.preventDefault();
                        oTable.button('.buttons-excel').trigger();
                        that.openAction();
                    });
                    $("#typesTableExportpdf").on("click", function (e) {
                        e.preventDefault();
                        oTable.button('.buttons-pdf').trigger();
                        that.openAction();
                    });
                }
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    AddNew = (e) => {
        this.setState({
            edit_mode:false,
            show_list:false,
            name:"",
            deal_id:"",
            start_date:"",
            titile:"",
            message:"",
            image:"",
            expire_date:""
        })
    }

    BackTo = () => {
        // this.getNotification()
        this.setState({
           show_list:true,
           edit_mode:false
        })
     }

     editType = (e, index, id) => {
        console.log("Adsfasdfsdf");
        e.preventDefault();
        var selected = this.state.allNotification[index];
        this.setState({
            id:selected._id,
            title: selected.title,
            message:selected.message,
            edit_mode: true,
            show_list:false
        })
        
    }

    CancelForm = (e) => {
        this.getNotification()
        this.setState({
            show_list:true,
            edit_mode:false,
            deal_id:"",
            start_date:"",
            title:"",
            message:"",
            image:"",
            expire_date:"",
            type:""
        })
    }

    getDeal = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/deal`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeal:res.data.data.category,
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }
    handelDate = (date) => {
        this.setState({
           start_date: date
        })
     }
  
     handelExpDate = (date) => {
        this.setState({
           expire_date: date
        })
     }

     swhoModal = show => {
        this.getUsers()
        if (show === false) {
            this.setState({
                name: "",
                profile_picture:"",
                mobile:"",
                created_at:""
            })
        }
        this.setState({
          show_wallet_modal: show,
          id:this.state.id,
        })
      }

      showLoginModal = (e) => {
        $('.type_def_chk').prop("checked", false);
        this.setState({
            show_wallet_modal: false,
        })
      }

      getUsers = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/users`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    allUsers:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    selectItem = (e) => {
        if (e.target.checked) {
           $('.type_def_chk').prop("checked", false);
           e.target.checked = true;
           this.setState({
              id: e.target.value,
           })
        } else {
           this.setState({
              od: null,
           })
        }
     }

     send = (e) => {
        if(this.state.user_id === "" && this.state.type === 'single'){
            this.notify("error", "Please select user");
            return false;
        }
        
        var data = {
            id:this.state.id,
            user_id:this.state.user_id,
            type:this.state.type
        }
        Axios.post(`${this.state.url}/admin/auth/send/notification`,data)
        .then((resp) => {
      console.log(resp)
            if (resp.data.success === true) {
                this.setState({
                    show_wallet_modal:false
                })
            
            this.notify("success", "Notification Send successfully");
        } else {
            this.notify("error", "Something went wrong");
        }
    }, err => {
        this.setState({
            loading: false
        })
    })
    }

      
  render() {
    return (
      <>
        <div className="content">
        <NotificationAlert ref={this.notificationAlert} />
        {this.state.show_list == true && 
          <Row>
            <Col md="12">
              <Card>
              <Row>
                    <Col md="9">
                        <div className="main-txt-section">
                        <div className="cateadd-new">
                <CardHeader><h3 className="fd-text"> Notification</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="3">
                <div className="add-categor-btn top-add-button addbanner-btn">
                    <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Notification</a>
                </div>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                <div className="search-form">
                    <div className="form-group mr-2">
                        <input type="text" name="search" id="myInputTextField" placeholder="Search Record" className="form-control" />
                        {/* <span><i class="fa fa-search" aria-hidden="true"></i></span> */}
                        {/* <input type="submit" name="submit" className="search_btn" value="" /> */}
                    </div>

                </div>
                </Col>
                <Col md="6"></Col>
                </Row>
                <CardBody>
                <table class="userslist table" id="myTableTypesMain">
                <thead>
                    <tr>
                        <th></th>
                    <th>No</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Action</th>
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allNotification.length > 0 && <>
                        {this.state.allNotification.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td><input type="checkbox" className="checkbox type_def_chk" value={list._id} onClick={(e) => { this.selectItem(e) }} /></td>
                                <td>{index+1}</td>
                                <td>{list.title}</td>
                                <td>{list.message}</td>
                                
                                <td><a href="javascript:void(0)">
                                <i class="fa fa-paper-plane" onClick={(e) => { this.swhoModal(e, list._id, list.title, list.message) }} aria-hidden="true"></i> || 
                                    <i onClick={(e) => { this.editType(e, index, list._id) }} class="fa fa-edit" aria-hidden="true"></i>
                                {/* <i class="fa fa-trash bancolr" onClick={(e) => { this.RemoveCategory(e, index, list._id) }} aria-hidden="true"></i> */}
                                </a>
                                </td>

                            </tr>
                        })}
                    </>}

                    {this.state.allNotification.length === 0 && <>
                        <tr>
                            <td colSpan="100%">No Records found</td>
                        </tr>
                    </>}
                </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          }
          {this.state.show_list == false && 
                    <div className="add-restaurent">
                         <Row>
                                <Col md="9">
                                {this.state.edit_mode && <>
                                    <h3>Edit Notificationi</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add Notification</h3>
                                    </>}
                                </Col>
                                <Col md="3">
                                    <div className="back-btn">
                                    <a href="#" onClick={(e) => {this.BackTo(e)}}>Back</a>
                                    </div>
                                </Col>
                            </Row>
                       
                        <Row>
                            <Col md="12">
                            <form onSubmit={this.onFormSubmit}>
                                    <Row>
                                    
                                    <Col md="6">
                                            <div class="form-group">
                                                <label for="name"> Title:</label>
                                                <input type="text" value={this.state.title} name="title" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Title" id="title"></input>
                                            </div>
                                        </Col>
                                       
                                        <Col md="6">
                                            <div class="add-images-sec">
                                                <label for="phone">Message</label>
                                                <input type="text" value={this.state.message} name="message" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Message" id="message"></input>
                                            </div>
                                        </Col>
                                        
                                                                          
                                      
                                    </Row>
                                    <Row>
                                    <Col className="btntadd-new">
                                            <div className="add-categor-btn cancel-new-btn">
                                                <a href="javascript:void(0)" onClick={(e) => { this.CancelForm(e) }}>Cancel</a>
                                            </div>
                                        </Col>
                                        <Col className="btntadd-new">
                                            <div className="add-categor-btn upload-nw-btn">
                                            <button class="form-control" type="submit">Update</button>
                                            </div>
                                        </Col>
                                    </Row>
                                 
                                </form>
                            </Col>
                        </Row>

                        
                    </div>
                    }
        </div>

        <Modal
          show={this.state.show_wallet_modal}
          onHide={() => this.showLoginModal(false)}
          dialogClassName="modal-90w"
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
             <div class="form-title text-center">
               <h4>Send Notification</h4>
             </div>
             <div class="d-flex flex-column text-center">
               <form>
                 <div class="form-group">
                    All Uers <input type="radio" name="type" value="all" onChange={(e) => { this.handleInput(e) }}></input>
                    Single Users <input type="radio" name="type" value="single" onChange={(e) => { this.handleInput(e) }}></input>
                    
                 </div>

                 {this.state.type === 'single' && <> <div class="form-group">
                        <label for="phone">Select Users</label>
                        <select value={this.state.allUsers} className="form-control" name="user_id" onChange={(e) => { this.handleInput(e) }}>
                        <option value="">Select Users</option>
                        {this.state.allUsers.length > 0 && <>
                        {this.state.allUsers.map((cr, index) => {
                            return <option value={cr._id} data={index}>{cr.name}</option>;
                        })}
                        </>}
                    </select>
                    </div>
                    </>}
                 
                 
                 <button type="button" onClick={(e) => { this.send(e) }} data-toggle="modal" data-target="#enterotpModal"class="btn btn-info btn-block btn-round">Send</button>
             
               </form>
           
           </div>
         
     </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Notification;
