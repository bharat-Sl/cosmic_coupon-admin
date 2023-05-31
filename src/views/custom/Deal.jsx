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
import * as moment from "moment";
const $ = window.jQuery;

class Deal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allDeals:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            image:"",
            type:"",
            link:"",
            title:"",
            category_id:"",
            brand_id:"",
            store_id:"",
            exclusive:"",
            hot_deal:"",
            price:"",
            discount:"",
            discount_type:"",
            show_list:true,
            ShowDatatable:true,
            allCategories:[],
            allStore:[],
            allBrandList:[]
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
            this.getAllDeal();
            this.getCategory()
          
        }
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Deal")) {
            window.location.href = "/admin/login"
         }
        
        
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
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.title === "" || this.state.title === undefined) {
            this.notify("error", "Please enter title.");
            return false;
        }
        if (this.state.category_id === "" || this.state.category_id === undefined) {
            this.notify("error", "Please choose category.");
            return false;
        }
        if (this.state.store_id === "" || this.state.store_id === undefined) {
            this.notify("error", "Please choose store.");
            return false;
        }
        if (this.state.brand_id === "" || this.state.brand_id === undefined) {
            this.notify("error", "Please choose brand.");
            return false;
        }
        if (this.state.link === "" || this.state.link === undefined) {
            this.notify("error", "Please enter link.");
            return false;
        }
        if (this.state.start_date === "") {
            this.notify("error", "Please enter start date.");
            return false;
        }
        if (this.state.end_date === "") {
            this.notify("error", "Please enter expiry date.");
            return false;
        }
        if (this.state.price === "") {
            this.notify("error", "Please enter deal price.");
            return false;
        }
        if (this.state.discount === "") {
            this.notify("error", "Please enter deal discount.");
            return false;
        }
        if (this.state.discount_type === "") {
            this.notify("error", "Please choose discount type.");
            return false;
        }
        if (this.state.status === "") {
            this.notify("error", "Please select status.");
            return false;
        }
        if (this.state.file === undefined && this.state.edit_mode === false) {
            this.notify("error", "Please select image.");
            return false;
        }
       
        if (this.state.description === "") {
            this.notify("error", "Please enter description.");
            return false;
        }
        if(localStorage.getItem("width") !== null){
            if (localStorage.getItem("width") < 31 || localStorage.getItem("height") < 35) {
                this.notify("error", "Please upload minimum 31x35 dimensional image.");
                return false
            }
        }
        
        
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('category_id',this.state.category_id);
        formData.append('title',this.state.title);
        formData.append('store_id',this.state.store_id);
        formData.append('brand_id',this.state.brand_id);
        formData.append('link',this.state.link);
        formData.append('start_date',this.state.start_date);
        formData.append('end_date',this.state.end_date);
        formData.append('price',this.state.price);
        formData.append('discount',this.state.discount);
        formData.append('discount_type',this.state.discount_type);
        formData.append('description',this.state.description);
        formData.append('status',this.state.status);
        formData.append('exclusive',this.state.exclusive);
        formData.append('hot_deal',this.state.hot_deal);
        formData.append("id",this.state.id ? this.state.id : "");
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/deal`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getAllDeal();
                this.notify("success", "Deal updated successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
            Axios.post(`${this.state.url}/admin/auth/add/deal`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getAllDeal();
                this.notify("success", "Deal created successfully");
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

    getAllDeal = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/deal`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("res.data.data.category",res.data.data.category)
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allDeals:res.data.data.category
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
        if(e.target.name === 'category_id'){
            this.getStore(e.target.value);
            this.setState({
                brand_id:""
            })
        }
        if(e.target.name === 'store_id'){
            this.getBrand(e.target.value);
            this.setState({
                brand_id:""
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    AddNew = (e) => {
        this.setState({
            edit_mode:false,
            show_list:false,
            description:"",
            link:"",
            price:"",
            title:"",
            start_date:"",
            end_date:"",
            image:"",
            status:"",
            discount:"",
            discount_type:"",
            category_id:"",
            exclusive:"",
            hot_deal:"",
            brand_id:"",
            store_id:""
        })
    }

    BackTo = () => {
        // this.getAllDeal()
        this.setState({
           show_list:true,
           edit_mode:false,
           description:"",
            link:"",
            title:"",
            price:"",
            start_date:"",
            end_date:"",
            image:"",
            status:"",
            discount:"",
            discount_type:"",
            category_id:"",
            brand_id:"",
            exclusive:"",
            hot_deal:"",
            store_id:""
        })
     }

     editType = (e, index, id) => {
        console.log("Adsfasdfsdf");
        e.preventDefault();
        var selected = this.state.allDeals[index];
        this.setState({
            id:selected._id,
            title:selected.title,
            category_id: selected.category_id._id,
            store_id: selected.store_id._id,
            brand_id: selected.brand_id._id,
            exclusive:selected.exclusive,
            hot_deal:selected.hot_deal,
            link:selected.link,
            price:selected.price,
            discount:selected.discount,
            discount_type:selected.discount_type,
            start_date:selected.start_date,
            end_date:selected.end_date,
            status:selected.status,
            description:selected.description,
            image:selected.image,
            edit_mode: true,
            show_list:false
        })
        setTimeout(() => {
            this.getStore(selected.category_id._id);
        this.getBrand(selected.store_id._id);
        }, 100);
        
    }

    CancelForm = (e) => {
        this.getAllDeal()
        this.setState({
            show_list:true,
            edit_mode:false,
            description:"",
            link:"",
            price:"",
            start_date:"",
            end_date:"",
            image:"",
            status:"",
            discount:"",
            discount_type:"",
            category_id:"",
            brand_id:"",
            exclusive:"",
            hot_deal:"",
            store_id:""
        })
    }
    handelDate = (date) => {
        this.setState({
           start_date: date
        })
     }
  
     handelExpDate = (date) => {
        this.setState({
           end_date: date
        })
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
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getStore = (cat_id) => {
        this.setState({
            loading:true
        })
        Axios.post(`${this.state.url}/admin/auth/get/single-store`,{data:cat_id}, {
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
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    getBrand = (store_id) => {
        this.setState({
            loading:true
        })
        var data = {
            store_id:store_id,
            category_id:this.state.category_id
        }
        Axios.post(`${this.state.url}/admin/auth/get/single-brand`,data, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allBrandList:res.data.data.category
                })
            }, 100);
            
        }, err => {
            console.log("error", err.response)
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
                <CardHeader><h3 className="fd-text"> Deal Management</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="3">
                <div className="add-categor-btn top-add-button addbanner-btn">
                    <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Deal</a>
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
                <table class="userslist table tableresponsive" id="myTableTypesMain">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Store</th>
                    <th>Brand</th>
                    <th>Link</th>
                    <th>Icon</th>
                    <th>Price</th>
                    <th>Discount</th>
                   {/* <th>Description</th>*/}
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allDeals.length > 0 && <>
                        {this.state.allDeals.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td>{index+1}</td>
                                <td>{list.title}</td>
                                <td>{list.category_id.cat_name}</td>
                                <td>{list.store_id.name}</td>
                                <td>{list.brand_id.brand_name}</td>
                                <td>{list.link}</td>
                                <td><img height="5%" src={this.state.image_url+'deal/'+list.image}/></td>
                                <td>{list.price}</td>
                                <td>{list.discount} {list.discount_type == 'amount' ? "₹" : "%"}</td>
                               {/* <td>{list.description}</td>*/}
                                <td>{moment(list.start_date).format("YYYY-MM-DD")}</td>
                                <td>{moment(list.end_date).format("YYYY-MM-DD")}</td>
                                {list.status === 'active' && <>
                                    <td><a className="active_status" href="javascript:void()">{list.status}</a></td>
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

                    {this.state.allDeals.length === 0 && <>
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
                                    <h3>Edit Deal</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add Deal</h3>
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
                                            <div class="form-group">
                                                <label for="name"> Category:</label>
                                                <select value={this.state.category_id} className="custom-select" name="category_id" onChange={(e) => { this.handleInput(e) }}>
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
                                            <div class="form-group">
                                                <label for="name"> Store:</label>
                                                <select value={this.state.store_id} className="custom-select" name="store_id" onChange={(e) => { this.handleInput(e) }}>
                                                        <option value="">Select Store</option>
                                                        {this.state.allStore.length > 0 && <>
                                                            {this.state.allStore.map((cr, index) => {
                                                                return <option value={cr._id} data={index}>{cr.name}</option>;
                                                            })}
                                                        </>}
                                                    </select>
                                            </div>
                                        </Col>

                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name"> Brand:</label>
                                                <select value={this.state.brand_id} className="custom-select" name="brand_id" onChange={(e) => { this.handleInput(e) }}>
                                                        <option value="">Select Brand</option>
                                                        {this.state.allBrandList.length > 0 && <>
                                                            {this.state.allBrandList.map((cr, index) => {
                                                                return <option value={cr._id} data={index}>{cr.brand_name}</option>;
                                                            })}
                                                        </>}
                                                    </select>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name"> Link:</label>
                                                <input type="text" value={this.state.link} name="link" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Link" id="link"></input>
                                            </div>
                                        </Col>
                                        
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Start Date<span class="star-text">*</span></label>

                                                <ModernDatepicker
                                                date={this.state.start_date}
                                                format={'YYYY-MM-DD'}
                                                showBorder
                                                onChange={date => this.handelDate(date, 'start_date')}
                                                placeholder={' Start Date'}
                                                />
                                                {/* <span className="icon-input"> <img src={require("assets/img/calendar-img.png")} alt="" /></span> */}


                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">End Date<span class="star-text">*</span></label>
                                                <ModernDatepicker
                                                date={this.state.end_date}
                                                format={'YYYY-MM-DD'}
                                                showBorder
                                                onChange={date => this.handelExpDate(date, 'end_date')}
                                                placeholder={' Expire Date'}
                                                />
                                                {/* <span className="icon-input"> <img src={require("assets/img/calendar-img.png")} alt="" /></span> */}
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name"> Price:</label>
                                                <input type="number" value={this.state.price} name="price" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Price" id="link"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="name"> Discount:</label>
                                                <input type="number" value={this.state.discount} name="discount" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Discount" id="discount"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group">
                                                <label for="phone">Discount Type <span class="star-text">*</span></label>
                                                <select class="form-control" value={this.state.discount_type} onChange={(e) => { this.handleInput(e) }} name="discount_type">
                                                <option value="">Select Type</option>
                                                <option value="amount">Amount</option>
                                                <option value="percent">Percentage</option>
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
                                            <div class="add-images-sec">
                                                <label for="phone">Image</label> (png,jpg) (250X250px)
                                                <input type="file" name="image" onChange= {this.onChange} class="form-control"></input>
                                                {this.state.edit_mode === true &&
                                                    <img src={this.state.image_url+'deal/'+this.state.image} alt=""></img>
                                                }
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
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Hot Deal </label>
                                                <input type="checkbox" checked={this.state.hot_deal === 'yes'} value="yes" name="hot_deal" onChange={(e) => { this.handelCheckbox(e) }} class="" id="exnumber"></input>
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

export default Deal;
