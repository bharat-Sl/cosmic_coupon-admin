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

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allCategories:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            exclusive:"",
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
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Category")) {
            window.location.href = "/admin/login"
         }
        
        this.getCategory();
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.cat_name === "") {
            this.notify("error", "Please enter category name.");
            return false;
        }
        if (this.state.status === "") {
            this.notify("error", "Please select status.");
            return false;
        }
        if (this.state.file === undefined && this.state.edit_mode === false) {
            this.notify("error", "Please select icon.");
            return false;
        }
        if (this.state.banner_image === undefined && this.state.edit_mode === false) {
            this.notify("error", "Please select image.");
            return false;
        }
        if (this.state.type === "") {
            this.notify("error", "Please select type.");
            return false;
        }
        if (this.state.description === "") {
            this.notify("error", "Please enter description.");
            return false;
        }
        // if(localStorage.getItem("width") !== null){
        //     if (localStorage.getItem("width") != 280 && localStorage.getItem("height") != 100) {
        //         this.notify("error", "Please upload minimum 280x100 dimensional image.");
        //         return false
        //     }
        // }
        
        
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('banner_image',this.state.banner_image);
        formData.append('cat_name',this.state.cat_name);
        formData.append('description',this.state.description);
        formData.append('status',this.state.status);
        formData.append('type',this.state.type);
        formData.append('exclusive',this.state.exclusive);
        formData.append("id",this.state.id ? this.state.id : "");
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/category`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getCategory();
                this.notify("success", "Category updated successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
            Axios.post(`${this.state.url}/admin/auth/add/category`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getCategory();
                this.notify("success", "Category created successfully");
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
            if(e.target.name == "image"){
                this.setState({
                    "file":e.target.files[0],
                });
            }else{
                this.setState({
                    "banner_image":e.target.files[0],
                });
            }
        }
        // this.setState({"file":e.target.files[0]});
    }

    

    getCategory = () => {
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
            cat_name:"",
            status:"",
            image:"",
            description:"",
            exclusive:"",
            type:""
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
        var selected = this.state.allCategories[index];
        this.setState({
            id:selected._id,
            cat_name: selected.cat_name,
            status:selected.status,
            description:selected.description,
            image:selected.image,
            banner_image:selected.banner_image,
            type:selected.type,
            exclusive:selected.exclusive,
            edit_mode: true,
            show_list:false
        })
        
    }

    CancelForm = (e) => {
        this.getCategory()
        this.setState({
            show_list:true,
            edit_mode:false,
            cat_name:"",
            description:"",
            image:"",
            exclusive:"",
            status:"",
            type:""
        })
    }
    handelCheckbox = (e) => {
        if (e.target.checked) {
            this.setState({
                [e.target.name]: "yes"
            })
        }else{
            this.setState({
                [e.target.name]: "no"
            })
        }
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
                <CardHeader><h3 className="fd-text"> Category Management</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="3">
                <div className="add-categor-btn top-add-button addbanner-btn">
                    <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Category</a>
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
                   {/* <th>Description</th>*/}
                    <th>Type</th>
                    <th>Icon</th>
                    <th>Image</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allCategories.length > 0 && <>
                        {this.state.allCategories.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td>{index+1}</td>
                                <td>{list.cat_name}</td>
                                {/*<td>{list.description}</td>*/}
                                <td>{list.type}</td>
                                <td><img alt="image" height="5%" src={this.state.image_url+'category/'+list.image}/></td>
                                <td><img alt="image" height="5%" src={this.state.image_url+'category/'+list.banner_image}/></td>
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

                    {this.state.allCategories.length === 0 && <>
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
                                    <h3>Edit Category</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add Category</h3>
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
                                                <label for="name">Category Name:</label>
                                                <input type="text" value={this.state.cat_name} name="cat_name" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Category Name" id="name"></input>
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
                                            <div class="add-images-sec">
                                                <label for="phone">Icon</label> (png,jpg) (70x80px)
                                                <input type="file" name="image" onChange= {this.onChange} class="form-control"></input>
                                                {this.state.edit_mode === true &&
                                                    <img src={this.state.image_url+'category/'+this.state.image} alt=""></img>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="add-images-sec">
                                                <label for="phone">Image</label> (png,jpg) (261x274px)
                                                <input type="file" name="banner_image" onChange= {this.onChange} class="form-control"></input>
                                                {this.state.edit_mode === true &&
                                                    <img src={this.state.image_url+'category/'+this.state.banner_image} alt=""></img>
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

                                                    <option selected={this.state.type === 'travel'} value="travel">Travel</option>  
                                                    <option selected={this.state.type === 'fashion'} value="fashion">Fashion</option> 
                                                    <option selected={this.state.type === 'recharge'} value="recharge">Recharge</option>   
                                                    <option selected={this.state.type === 'food'} value="food">Food</option>  
                                                    <option selected={this.state.type === 'electronics'} value="electronics">Electronics</option>    
                                                    <option selected={this.state.type === 'others'} value="others">Others</option>    
                                                                                         </select>
                                            </div>
                                        </Col>
                                  
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Description </label>
                                                <input type="text" value={this.state.description} name="description" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Description" id="number"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Exclusive </label>
                                                <input type="checkbox" checked={this.state.exclusive === 'yes'} value="yes" name="exclusive" onChange={(e) => { this.handelCheckbox(e) }} class="" id="exnumber"></input>
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

export default Category;
