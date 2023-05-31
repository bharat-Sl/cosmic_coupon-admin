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

class BottomSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            allRestaurant:[],
            allCategories:[],
            discount:"",
            allSlider:[],
            edit_mode:false,
            cat_name:"",
            description:"",
            status:"",
            image:"",
            link:"",
            type:"",
            type_id:"",
            show_list:true,
            ShowDatatable:true,
            allBrands:[]
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
        if (!JSON.parse(sessionStorage.getItem("module")).includes("Bottom Slider")) {
            window.location.href = "/loadmin/logingin"
         }
        
        this.getSlider();
        this.getCategory();
        this.getStore()
        this.getBrand()
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === "") {
            this.notify("error", "Please enter text.");
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
            if (localStorage.getItem("width") < 525 || localStorage.getItem("height") < 214) {
                this.notify("error", "Please upload minimum 525x214 dimensional image.");
                return false
            }
        }
        
        
        
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('text',this.state.text);
        formData.append('discount',this.state.discount);
        formData.append('description',this.state.description);
        formData.append('status',this.state.status);
        formData.append('type',this.state.type);
        formData.append('type_id',this.state.type_id);
        formData.append('link',this.state.link);
        formData.append("id",this.state.id ? this.state.id : "");
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if(this.state.edit_mode){
            Axios.post(`${this.state.url}/admin/auth/update/bottom-slider`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getSlider();
                this.notify("success", "Slider updated successfully");
            } else {
                this.notify("error", "Something went wrong");
            }
        }, err => {
            this.setState({
                loading: false
            })
        })
        }else{
            Axios.post(`${this.state.url}/admin/auth/add/bottom-slider`,formData,config)
        .then((resp) => {
                if (resp.data.success === true) {
                this.setState({
                    show_list:true,
                    // ShowDatatable:false
                })
                this.getSlider();
                this.notify("success", "Slider created successfully");
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
    

    getSlider = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/admin/auth/get/bottom-slider`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allSlider:res.data.data.category
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
            text:"",
            image:"",
            description:"",
            status:"",
            type:"",
            type_id:"",
            link:"",
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
        var selected = this.state.allSlider[index];
        this.setState({
            id:selected._id,
            text: selected.text,
            discount:selected.discount,
            status:selected.status,
            description:selected.description,
            image:selected.image,
            type:selected.type,
            type_id:selected.type_id,
            link:selected.link,
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
            status:"",
            type:"",
            type_id:"",
            link:""
        })
    }

    handleRadio = (e) => {
        if (e.target.checked) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    getCategory = () => {
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

    getStore = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/all-store`, {
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

    getBrand = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/brand`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    allBrands:res.data.data.category
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
                <CardHeader><h3 className="fd-text"> Bottom Slider Management</h3></CardHeader></div>
                </div>
                </Col>
                <Col md="3">
                <div className="add-categor-btn top-add-button addbanner-btn">
                    <a href="javascript:void(0)" onClick={(e) => { this.AddNew(e) }}>Add Slider</a>
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
                    <th>Text</th>
                    <th>Discount</th>
                   {/*<th>Description</th>*/}
                    <th>Image</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.allSlider.length > 0 && <>
                        {this.state.allSlider.map((list, index) => {
                            return <tr key={"trry" + index}>
                                <td>{index+1}</td>
                                <td>{list.text}</td>
                                <td>{list.discount}%</td>
                                {/*<td>{list.description}</td>*/}
                                <td><img height="5%" src={this.state.image_url+'bottom-slider/'+list.image}/></td>
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

                    {this.state.allSlider.length === 0 && <>
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
                                    <h3>Edit Slider</h3>
                                    </>
                                    }
                                    {!this.state.edit_mode && <>
                                    <h3>Add Slider</h3>
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
                                                <label for="name"> Text:</label>
                                                <input type="text" value={this.state.text} name="text" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Text" id="text"></input>
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
                                                <label for="phone">Image</label> (png,jpg) (525x214px)
                                                <input type="file" name="image" onChange= {this.onChange} class="form-control"></input>
                                                {this.state.edit_mode === true &&
                                                    <img src={this.state.image_url+'slider/'+this.state.image} alt=""></img>
                                                }
                                            </div>
                                        </Col>
                                       
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Discount </label>
                                                <input type="number" value={this.state.discount} name="discount" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter Discount" id="number2"></input>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div class="form-group description-sec">
                                                <label for="phone">Link </label>
                                                <input type="text" value={this.state.link} name="link" onChange={(e) => { this.handleInput(e) }} class="form-control" placeholder="Enter link" id="numb54er2"></input>
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
                                                Category<input type="radio" checked={this.state.type === 'category'} value="category" name="type" onClick={(e) => { this.handleRadio(e) }} class="" ></input>

                                                Brand
                                                <input type="radio" checked={this.state.type === 'brand'} value="brand" name="type" onClick={(e) => { this.handleRadio(e) }} class="" ></input>

                                                Store
                                                <input type="radio" checked={this.state.type === 'store'} value="store" name="type" onClick={(e) => { this.handleRadio(e) }} class="" ></input>

                                            </div>
                                        </Col>
                                        <Col md="6">
                                            {this.state.type === 'category' && <>
                                                <div className="form-group">
                                                    <label>Select Category</label>
                                                    <select value={this.state.type_id} className="custom-select" name="type_id" onChange={(e) => { this.handleInput(e) }}>
                                                        <option value="">Select Category</option>
                                                        {this.state.allCategories.length > 0 && <>
                                                            {this.state.allCategories.map((cr, index) => {
                                                                return <option value={cr._id} data={index}>{cr.cat_name}</option>;
                                                            })}
                                                        </>}
                                                    </select>
                                                </div>
                                                </>}

                                                {this.state.type === 'brand' && <>
                                                <div className="form-group">
                                                    <label>Select Brand</label>
                                                    <select value={this.state.type_id} className="custom-select" name="type_id" onChange={(e) => { this.handleInput(e) }}>
                                                        <option value="">Select Brand</option>
                                                        {this.state.allBrands.length > 0 && <>
                                                            {this.state.allBrands.map((cr, index) => {
                                                                return <option value={cr._id} data={index}>{cr.brand_name}</option>;
                                                            })}
                                                        </>}
                                                    </select>
                                                </div>
                                                </>}

                                                {this.state.type === 'store' && <>
                                                <div className="form-group">
                                                    <label>Select Store</label>
                                                    <select value={this.state.type_id} className="custom-select" name="type_id" onChange={(e) => { this.handleInput(e) }}>
                                                        <option value="">Select Store</option>
                                                        {this.state.allStore.length > 0 && <>
                                                            {this.state.allStore.map((cr, index) => {
                                                                return <option value={cr._id} data={index}>{cr.name}</option>;
                                                            })}
                                                        </>}
                                                    </select>
                                                </div>
                                                </>}
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

export default BottomSlider;
