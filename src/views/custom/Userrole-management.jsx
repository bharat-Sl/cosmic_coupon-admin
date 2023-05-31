import React from "react";
// react plugin used to create charts
import Axios from "axios";
// reactstrap components
import {
    Card,
    CardHeader,
    Row,
    Col
} from "reactstrap";
// core components
import NotificationAlert from "react-notification-alert";
import * as moment from "moment";
const $ = window.jQuery;


class UserroleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            allRestaurant:[],
            AdminUsers:[],
            edit_mode:false,
            gift_name:"",
            description:"",
            status:"",
            show_list:true,
            show_all:true,
            chooseRest:[],
            ShowDatatable:true,
            GroupData:[],
            GroupPageName:[],
            group_nameArr:[],
            groupArr:"",
            groupDataArr:[],
            newData:[],
            pageArr:["Dashboard","Users","Slider","Bottom Slider","Exclusive Slider","Category","Store","Brand","Gift Card", "Coupon", "Offer", "Deal", "Today Task", "Report", "User Management","User Role Management", "Featured Today Task", "Featured Deal","View Subscriber", "Notification"],
            addUser:false,
            viewGroup:false
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        if(!sessionStorage.getItem("_access")){
            window.location.href="/admin/login"
        }
        if(!JSON.parse(sessionStorage.getItem("module")).includes("User Role Management")){
            window.location.href="/admin/login"
        }
        // this.getAdminUsers();
        this.getGroupData();
    }
    inputChange = e => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handelCheckbox = (e, name, value) => {
        if (e.target.checked) {
            var data = {
                name:name,
                value:value,
                type:"add"
            }
        }else{
            var data = {
                name:name,
                value:value,
                type:"remove"
            }
        }
    Axios.post(`${this.state.url}/admin/auth/add/user-permission`,{data:data})
            .then((resp) => {
                    if (resp.data.success === true) {
                    // this.setState({
                    //     show_list:true
                    // })
                    this.getGroupData();
                    this.notify("success", "Module assigned successfully");
                } else {
                    this.notify("error", "Something went wrong");
                }
            }, err => {
                this.setState({
                    loading: false
                })
            })
        
    }
    
    

    getGroupData = () => {
        Axios.get(`${this.state.url}/admin/auth/get/user-group`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("promo",res);
            setTimeout(() => {
                if(res.data.success === true){
                    this.setState({
                        showCat:true,
                        GroupData:res.data.data.billing,
                    GroupPageName:res.data.data.billing ? res.data.data.billing[0].page_name : []
                    })
                }else{
                    this.setState({
                        showCat:true,
                        GroupData:[]
                    })
                }
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
                                title: 'Banner'
                            },
                            {
                                extend: 'pdf',
                                text: 'Transfer To pdf',
                                extension: '.pdf',
                                title: 'Banner'
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

    

    AddNew = (e) => {
        this.setState({
            show_list:false,
            edit_mode:false,
            viewGroup:false
        })
    }

    viewGroup = (e) => {
        this.setState({
            edit_mode:false,
            show_list:false,
            viewGroup:true
        })
    }

    CancelForm = (e) => {
        this.getGroupData()
        this.setState({
            show_list:true,
            addUser:false,
            edit_mode:false,
            gift_name:"",
            description:"",
            status:""
            
        })
    }

    

    

    handleInput = (e) => {
        var group = []
        if(e.target.name === 'group_name'){
            group=this.state.GroupPageName.concat(e.target.value)
            this.setState({
               group_nameArr:e.target.value 
            })
            console.log("this.state.group_nameArr",this.state.group_nameArr);
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   

    chaneStatus = (e, index, id) => {
        var data ={
            id:id
        }
        Axios.post(`${this.state.url}/admin/auth/change/user-group/status`, { data: data }).then(resp => {
            if (resp.data.success === true) {
               this.getGroupData();
               this.notify("success", "Updated Succesfully");
            } else {
               this.notify("error", "Something went wrong");
            }
         }, err => {
            this.setState({
               loading: false
            })
         })
    }

    
    editType = (e, index, id) => {
        e.preventDefault();
        var selected = this.state.GroupData[index];
            this.setState({
                id:selected._id,
                group_name: selected.group_name,
                description:selected.description,
                status:selected.status,
                edit_mode: true,
                show_list:false
            })
        console.log("this.state.edit_mode",this.state.edit_mode);
    }

    BackTo = () => {
        this.getGroupData()
        this.setState({
           show_list:true,
           edit_mode:false,
           viewGroup:false
        })
     }

     AddUser = () => {
         this.setState({
             addUser:true
         })
     }

     AddPermission = (e) => {
         e.preventDefault();
         var data = {
            groupDataArr:this.state.groupDataArr
         }
         Axios.post(`${this.state.url}/admin/auth/add/user-permission`,{data:data})
            .then((resp) => {
                    if (resp.data.success === true) {
                    this.setState({
                        show_list:true
                    })
                    this.getGroupData();
                    this.notify("success", "Gift type added successfully");
                } else {
                    this.notify("error", "Something went wrong");
                }
            }, err => {
                this.setState({
                    loading: false
                })
            })
     }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.group_name === "" || this.state.group_name === undefined) {
            this.notify("error", "Please enter group name.");
            return false;
        }
        if (this.state.description === "" || this.state.description === undefined) {
            this.notify("error", "Please enter description.");
            return false;
        }
        if (this.state.status === "" || this.state.status == undefined) {
            this.notify("error", "Please select status.");
            return false;
        }
        var data = {
            group_name: this.state.group_nameArr,
            description:this.state.description,
            status:this.state.status,
            id:this.state.id ? this.state.id: ""

        }
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/user-group`,{data:data}) 
                .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    showDataTable:false,
                    group_name:"",
                    description:"",
                    status:"",
                })
                this.getGroupData();
                this.notify("success", "Group update successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
        
            Axios.post(`${this.state.url}/admin/auth/add/user-group`,{data:data})
            .then((resp) => {
                    if (resp.data.success === true) {
                    this.setState({
                        show_list:true,
                        group_name:"",
                        description:"",
                        status:"",
                    })
                    this.getGroupData();
                    this.notify("success", "Group added successfully");
                } else if(resp.data.success === false){
                    this.notify("error", "Group name already exist");
                } 
                else {
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
    render() {
        return (
            <>
                <div className="content">
                <NotificationAlert ref={this.notificationAlert} />

                {this.state.show_list == true && 
                    <div className="product-sell">
                     <Row>
                    <Col md="12">
                        <Card>
                         <Row>
                             <Col md="6" className="addusers">
                             <div className="main-txt-section">
                                 {/* <div className="images-restlogo">  <img src={require("assets/img/plan.png")} alt="logo" /></div> */}
                                 <div className="cateadd-new">
                            <CardHeader><h3 className="fd-text">User Role Management</h3></CardHeader></div>
                            </div>
                         
                            </Col>
                            <Col md="6">
                            <div className="add-categor-btn top-add-button addbanner-btn userrole">
                                <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add User Group</a>
                                <a href="javascript:void(0)" onClick={(e) => { this.viewGroup(e) }}>View Group</a>
                            </div>
                            </Col>
                        </Row>
                        
                
                <div className="order-main-sec">
                
                    <Row>
                    
                        <div className="col-md-12">
                            <div className="table-section userrole">

                            <div class="table-responsive">
                                <table class="userslist table" id="myTableTypesMain">
                                <thead>
                                    <tr>
                                    <th>No</th>
                                    <th> Name</th>
                                    <th>Description</th>
                                    <th>Pages</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.GroupData.length > 0 && <>
                                        {this.state.GroupData.map((list, index) => {
                                            
                                            return <tr key={"trry" + index}>
                                                {list.group_name !== 'Admin' && <>
                                                    <td>{list._id}</td>
                                                    <td>{list.group_name}</td>
                                                    <td>{list.description}</td>
                                                    <td>{list.assign_module ? list.assign_module.length : "0"+" pages"}</td>
                                                    <td>{moment(list.created_at).format("YYYY-MM-DD")}</td>
                                                    <td><a href="javascript:void()" onClick={(e) => { this.chaneStatus(e, index, list._id) }}>{list.status}</a></td>
                                                    <td><a href="javascript:void(0)">
                                                    <i onClick={(e) => { this.editType(e, index, list._id) }} class="fa fa-edit" aria-hidden="true"></i>
                                                    {/* <i class="fa fa-edit" onClick={(e) => { this.removePromocode(e, index, list._id) }} aria-hidden="true"></i> */}
                                                    </a></td>
                                                </>}

                                            </tr>
                                            
                                        })}
                                    </>}

                                    {this.state.GroupData.length === 0 && <>
                                        <tr>
                                            <td colSpan="100%">No Records found</td>
                                        </tr>
                                    </>}
                                </tbody>
                                <div className="table-footer-sec"> </div>
                             </table>
  </div>
                            </div>
                        </div>
                    
                    </Row>
                    </div>
                    </Card>
                    </Col>
                </Row>
                    </div>
                    
                }
                    
                    
                    {this.state.show_list == false && this.state.addUser === false && this.state.viewGroup === false &&
                    <div className="add-restaurent">
                         <Row>
                                <Col md="9">
                                {this.state.edit_mode && <>
                                    <h3>Add User Group</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add User Group</h3>
                                    </>}
                                </Col>
                                <Col md="3">
                                    <div className="back-btn">
                                    <a href="#" onClick={(e) => {this.BackTo(e)}}>Back</a>
                                    {/* <a href="#" onClick={(e) => {this.AddUser(e)}}>Add User</a> */}
                                    </div>
                                </Col>
                            </Row>
                        <Row>
                            <Col md="12">
                                    <Row>
                                    
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name">Group Name  <span class="star-text">*</span></label>
                                                <input type="text" value={this.state.group_name} name="group_name" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Group Name" id="group_name"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name">Description <span class="star-text">*</span></label>
                                                <input type="text" value={this.state.description} name="description" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Description" id="description"></input>
                                            </div>
                                        </Col>
                                       
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Status<span class="star-text">*</span></label>
                                                <select value={this.state.status} class="custom-select" onChange={(e) => { this.handleInput(e) }} name="status">
                                                <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </Col> 
                                        
                                       
                                    </Row>

                                    <Row>
                                               
                                               <Col md="12 add-promecode-btn">
                                                       <div className="add-categor-btn">
                                                       <a href="javascript:void(0)" onClick={(e) => { this.CancelForm(e) }} className="cancel-new-btn">Cancel</a>
                                                       <a href="javascript:void(0)" onClick={(e) => { this.onFormSubmit(e) }} className="addusers-btn">{this.state.edit_mode === true ? "Update" : "Add"}</a>
                                                         
                                                       </div>
           
                                                    
                                                   </Col>
                                                   
                                                  
                                               </Row>

                                               <Row>
                    
                    
                
                </Row>
                            </Col>
                        </Row>

                        
                    </div>
                    }

                    {this.state.GroupData.length > 0 && this.state.viewGroup === true && <> <div className="col-md-12">
                    <div className="add-restaurent">
                        <Row>
                                <Col md="9">
                                {this.state.edit_mode && <>
                                    <h3>View User</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>View User</h3>
                                    </>}
                                </Col>
                                <Col md="3">
                                    <div className="back-btn">
                                    <a href="#" onClick={(e) => {this.BackTo(e)}}>Back</a>
                                    {/* <a href="#" onClick={(e) => {this.AddUser(e)}}>Add User</a> */}
                                    </div>
                                </Col>
                            </Row>
                            <div className="rolemagement-feild">
                            <Row>
                                 
                            <Col md="6">
                                            <div class="form-group">
                                                <label for="name">Group Name </label>
                                                <input type="text" value={this.state.group_name} name="group_name" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Category Name" id="group_name"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name">Description</label>
                                                <input type="text" value={this.state.description} name="description" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Description" id="description"></input>
                                            </div>
                                        </Col>
                                       
                            </Row>
                            </div>
                            <div className="table-section">

                        <div class="table-responsive">
                            <table class="userslist table" id="rolemanagementtable">
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Page Name</th>
                                {this.state.GroupData.map((list, index) => {
                                    return <th>  {list.group_name !== "Admin" && <> {list.group_name} </>}</th>
                                })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.GroupData.length > 0 && <>
                                    {this.state.pageArr.map((list, index) => {
                                        return <tr key={"trry" + index}>
                                            <td>{index+1}</td>
                                            <td>{list}</td>
                                            {this.state.GroupData.map((kk, index) => {
                                                // if(list == 'Dashboard'){
                                                    return <td>
                                                        {kk.group_name !== "Admin" && <><input checked={kk.assign_module != null &&kk.assign_module.includes(list)}
                                                    onChange={(e) => { this.handelCheckbox(e, kk.group_name,list) }} name={kk.group_name} value={list} type="checkbox"></input>
                                                    </>}
                                                    </td>
                                                // }
                                                
                                            })}
                                            
                                            

                                        </tr>
                                    })}
                                </>}

                                {this.state.GroupData.length === 0 && <>
                                    <tr>
                                        <td colSpan="100%">No Records found</td>
                                    </tr>
                                </>}
                            </tbody>
                            <div className="table-footer-sec"> </div>
                         </table>
</div>
                        </div>
                        
                    </div>
                    </div>
                    </>}



                
                </div>
            </>
        );
    }
}

export default UserroleManagement;
