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
const $ = window.jQuery;

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allCategories:[],
            allStore:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            image:"",
            type:"",
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
        }
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Store")) {
            window.location.href = "/admin/login"
         }
        
        this.getStore();
        this.getAllCategory()
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
            this.notify("error", "Please enter category name.");
            return false;
        }
        if (this.state.category_id === "" || this.state.category_id === undefined) {
            this.notify("error", "Please select category.");
            return false;
        }
        
        if (this.state.file === undefined && this.state.edit_mode === false) {
            this.notify("error", "Please select image.");
            return false;
        }
        if (this.state.type === "") {
            this.notify("error", "Please select type.");
            return false;
        }
        if (this.state.status === "") {
            this.notify("error", "Please select status.");
            return false;
        }
        if (this.state.description === "") {
            this.notify("error", "Please enter description.");
            return false;
        }
        if(localStorage.getItem("width") !== null){
            if (localStorage.getItem("width") < 102 || localStorage.getItem("height") < 49) {
                this.notify("error", "Please upload minimum 102x49 dimensional image.");
                return false
            }
        }
        
        
        
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.name);
        formData.append('description',this.state.description);
        formData.append('status',this.state.status);
        formData.append('category_id',this.state.category_id);
        formData.append('type',this.state.type);
        formData.append("id",this.state.id ? this.state.id : "");
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/store`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getStore();
                this.notify("success", "Store updated successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
            Axios.post(`${this.state.url}/admin/auth/add/store`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getStore();
                this.notify("success", "Store created successfully");
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
    getAllCategory = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/category`, {
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
            })
        })
    }

    getStore = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/store`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allStore:res.data.data.category
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
            show_list:false,
            name:"",
            type:"",
            status:"",
            description:"",
            category_id:""
        })
    }

    BackTo = () => {
        // this.getCategory()
        this.setState({
           show_list:true,
           edit_mode:false
        })
     }

     editType = (e, index, id) => {
        console.log("Adsfasdfsdf");
        e.preventDefault();
        var selected = this.state.allStore[index];
        this.setState({
            id:selected._id,
            name: selected.name,
            status:selected.status,
            description:selected.description,
            image:selected.image,
            type:selected.type,
            category_id:selected.category_id._id,
            edit_mode: true,
            show_list:false
        })
        
    }

    CancelForm = (e) => {
        // this.getCategory()
        this.setState({
            show_list:true,
            edit_mode:false,
            cat_name:"",
            description:"",
            image:"",
            status:"",
            type:""
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
                <CardHeader><h3 className="fd-text"> Store Management</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="3">
                <div className="add-categor-btn top-add-button addbanner-btn">
                    <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Store</a>
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
                    <th>No</th>
                    <th>Name</th>
                    {/*<th>Description</th>*/}
                    <th>Type</th>
                    <th>Category</th>
                    <th>Icon</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allStore.length > 0 && <>
                        {this.state.allStore.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td>{index+1}</td>
                                <td>{list.name}</td>
                               {/*<td>{list.description}</td>*/}
                                <td>{list.type}</td>
                                <td>{list.category_id.cat_name}</td>
                                <td><img height="5%" src={this.state.image_url+'store/'+list.image}/></td>
                                <td>{moment(list.created_at).format("YYYY-MM-DD")}</td>
                                {list.status === 'active' && <>
                                    <td><a href="javascript:void()">{list.status}</a></td>
                                    </>}

                                    {list.status === 'inactive' && <>
                                    <td><a className="inactive_status" href="javascript:void()">{list.status}</a></td>
                                    </>}

                                <td><a href="javascript:void(0)"><i onClick={(e) => { this.editType(e, index, list._id) }} class="fa fa-edit" aria-hidden="true"></i>
                                {/* <i class="fa fa-trash bancolr" onClick={(e) => { this.RemoveCategory(e, index, list._id) }} aria-hidden="true"></i> */}
                                </a>
                                </td>

                            </tr>
                        })}
                    </>}

                    {this.state.allStore.length === 0 && <>
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
                                    <h3>Edit Store</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add Store</h3>
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
                                                <label for="name"> Name:</label>
                                                <input type="text" value={this.state.name} name="name" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Store Name" id="name"></input>
                                            </div>
                                        </Col>
                                        
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Category</label>
                                                <select value={this.state.category_id} className="form-control" name="category_id" onChange={(e) => { this.handleInput(e) }}>
                                                <option value="">Select Category</option>
                                                {this.state.allCategories.length > 0 && <>
                                                {this.state.allCategories.map((cr, index) => {
                                                    return <option value={cr._id} data={index}>{cr.cat_name}</option>;
                                                })}
                                                </>}
                                            </select>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="add-images-sec">
                                                <label for="phone">Image</label> (png,jpg)(250X250px)
                                                <input type="file" name="image" onChange= {this.onChange} class="form-control"></input>
                                                {this.state.edit_mode === true &&
                                                    <img src={this.state.image_url+'store/'+this.state.image} alt=""></img>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Type</label>
                                                <select class="custom-select" onChange={(e) => { this.handleInput(e) }} name="type">
                                                <option value="">Select Type</option>
                                                    <option selected={this.state.type === 'latest'} value="latest">Latest</option>
                                                    <option selected={this.state.type === 'trending'} value="trending">Trending</option>
                                                    <option selected={this.state.type === 'featured'} value="featured">Featured</option>
                                                    <option selected={this.state.type === 'popular'} value="popular">Popular</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Status</label>
                                                <select class="custom-select" onChange={(e) => { this.handleInput(e) }} name="status">
                                                <option value="">Select Status</option>
                                                    <option selected={this.state.status === 'active' || this.state.status === 'Active'} value="active">Active</option>
                                                    <option selected={this.state.status === 'inactive' || this.state.status === 'Inactive'} value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </Col>
                                        
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Description </label>
                                                <input type="text" value={this.state.description} name="description" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Description" id="number"></input>
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
      </>
    );
  }
}

export default Store;
