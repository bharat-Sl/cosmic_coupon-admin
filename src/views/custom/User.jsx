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
import * as moment from "moment";
import { Modal } from "react-bootstrap";
const $ = window.jQuery;

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allCategories:[],
            allUsers:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            amount_type:"",
            amount:"",
            status:"",
            image:"",
            type:"",
            show_list:true,
            ShowDatatable:true,
            show_wallet_btn:false
        }
    }
    notificationAlert = React.createRef();
    componentDidMount = () => {
        localStorage.removeItem("width");
        localStorage.removeItem("height");
        if(!sessionStorage.getItem("_access")){
            window.location.href="/admin/login"
        }
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Users")) {
            window.location.href = "/admin/login"
         }
        
        this.getUsers();
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
                    loading:false,
                    showCat:true,
                    allUsers:res.data.data.category
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
   

    
    changeStatus = (e, status, user_id) => {
        var data = {
            status:status,
            user_id:user_id
        }
        Axios.post(`${this.state.url}/admin/auth/changeUser-status`,{data:data})
        .then((resp) => {
      console.log(resp)
            if (resp.data.success === true) {
                this.getUsers();
            
            this.notify("success", "User status change successfully");
        } else {
            this.notify("error", "Something went wrong");
        }
    }, err => {
        this.setState({
            loading: false
        })
    })
    }
    selectItem = (e) => {
        if (e.target.checked) {
           $('.type_def_chk').prop("checked", false);
           e.target.checked = true;
           this.setState({
              selected_item: e.target.value,
              show_wallet_btn:true
           })
        } else {
           this.setState({
              selected_item: null,
              show_wallet_btn:false
           })
        }
     }
     showWalletModal = show => {
        console.log(show,"asdfasdf");
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
        })
      }
    addAmount = (e) => {
        if(this.state.amount_type === ""){
            this.notify("error", "Please select amount type");
            return false;
        }
        if(this.state.amount === ""){
            this.notify("error", "Please enter amount");
            return false;
        }
        var data = {
            amount_type:this.state.amount_type,
            amount:this.state.amount,
            user_id:this.state.selected_item
        }
        Axios.post(`${this.state.url}/admin/auth/add-wallet-amount`,{data:data})
        .then((resp) => {
      console.log(resp)
            if (resp.data.success === true) {
                this.setState({
                    show_wallet_modal:false
                })
            
            this.notify("success", "Amount added successfully");
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
                    <Col md="4">
                        <div className="main-txt-section">
                        <div className="cateadd-new">
                <CardHeader><h3 className="fd-text"> User Management</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="8">
                <div className="search-form" id="user-search-form">
                    <div className="form-group mr-2">
                        <input type="text" name="search" id="myInputTextField" placeholder="Search Record" className="form-control" />
                        {/* <span><i class="fa fa-search" aria-hidden="true"></i></span> */}
                        {/* <input type="submit" name="submit" className="search_btn" value="" /> */}
                    </div>

                </div>
                <div className="add-categor-btn top-add-button addbanner-btn">
                    {/* <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Slider</a> */}
                </div>
                </Col>
                
            </Row>
                <CardBody>
                <Row>
               
                <Col md="9"></Col>
                <Col md="3">
                {this.state.show_wallet_btn && <><div className="add-categor-btn upload-nw-btn">
                    <a href="javascript::void()" onClick={(e) => { this.showWalletModal(e) }} class="form-control" type="submit">Add Wallet Amount</a>
                    </div> </>}
                </Col>
                </Row>
                <table class="userslist table" id="myTableTypesMain">
                <thead>
                    <tr>
                    <th></th>
                    <th>Sr. No</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Coins</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allUsers.length > 0 && <>
                        {this.state.allUsers.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td><input type="checkbox" className="checkbox type_def_chk" value={list._id} onClick={(e) => { this.selectItem(e) }} /></td>
                                <td>{index+1}</td>
                                <td>{list._id}</td>
                                <td>{list.name}</td>
                                <td>{list.mobile}</td>
                                
                                <td>{list.email ? list.email : "--"}</td>
                                <td>{list.point}</td>
                                {/* <td><img height="5%" src={this.state.image_url+'slider/'+list.image}/></td> */}
                                <td>{moment(list.created_at).format("YYYY-MM-DD")}</td>
                                {list.status === 'active' && <>
                                    <td><a  className="active_status" onClick={(e) => { this.changeStatus(e, list.status, list._id) }} href="javascript:void(0)">{list.status}</a></td>
                                    </>}

                                    {list.status === 'inactive' && <>
                                    <td><a onClick={(e) => { this.changeStatus(e, list.status, list._id) }}className="inactive_status" href="javascript:void(0)">{list.status}</a></td>
                                    </>}

                                    {list.status === 'pending' && <>
                                    <td><a onClick={(e) => { this.changeStatus(e, list.status, list._id) }} className="pending_status" href="javascript:void(0)">{list.status}</a></td>
                                    </>}
                                    

                                {/* <td><a href="javascript:void(0)"><i onClick={(e) => { this.editType(e, index, list._id) }} class="fa fa-edit" aria-hidden="true"></i>
                                </a>
                                </td> */}

                            </tr>
                        })}
                    </>}

                    {this.state.allUsers.length === 0 && <>
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
               <h4>Wallet Amount</h4>
               <h5>Add amount in Wallet</h5>
             </div>
             <div class="d-flex flex-column text-center">
               <form>
                 <div class="form-group">
                    Increase <input type="radio" name="amount_type" value="increase" onChange={(e) => { this.handleInput(e) }}></input>
                    Decrease <input type="radio" name="amount_type" value="decrease" onChange={(e) => { this.handleInput(e) }}></input>
                   <input type="number"  name="amount" onChange={(e) => { this.handleInput(e) }} class="form-control" id="number"placeholder="Enter Amount"/>
                 </div>
                 
                 
                 <button type="button" onClick={(e) => { this.addAmount(e) }} data-toggle="modal" data-target="#enterotpModal"class="btn btn-info btn-block btn-round">Submit</button>
             
               </form>
           
           </div>
         
     </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default User;
