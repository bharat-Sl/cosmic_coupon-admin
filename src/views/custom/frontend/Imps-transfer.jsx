/* eslint-disable  */
import React from "react";
// import Axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    FormGroup,
    Form,
    Input,
    Table,
    Row,
    Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
import InnerHeader from "components/Navbars/Innerheader";
import Footer from "components/Navbars/Frontfooter";
import RightSidebar from "components/Navbars/Rightsidebar";
import LeftSidebar from "components/Navbars/Leftsidebar";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class ImpsTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            image_url: process.env.REACT_APP_IMAGE_URL,
            email: "",
            password: "",
            User:[],
            allBrands:[],
            allDeal:[],
            allCoupon:[],
            allOffers:[],
            storeArr:[],
            allBrands:[],
            bene_name: "",
            bene_mobile: "",
            name:"",
            bene_account_number: "",
            bene_ifsc: "",
            otp: "",
            BenifList:[],
            amount:0
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        this.getBrand()
        this.getLoginUserDetail()
        this.getBeneficiaryList()
        // setInterval(() => {
            this.checkAccess();
        // }, 5000);
        if(!sessionStorage.getItem("_access")){
            window.location.href="/"
        }
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }

    checkAccess = () => {
        Axios.get(`${this.state.url}/front/auth/check/access`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            if (res.data.data.category.imps_access === 0) {
                this.notify("error", "IMPS Temporarily unavailable. Please try again later");
                this.setState({
                    IMPS:"pending",
                    mobile_number:res.data.data.category.mobile
                })
            }
        }, err => {
            this.setState({
                session: "expired"
            })
            console.log("error check access", err)
        })
    }

    registerMoneyTransfer = e => {
        e.preventDefault();
        if (this.state.mobile_number === "") {
            this.notify("error", "Please enter mobile number");
            return false;
        }
        if (this.state.name === "") {
            this.notify("error", "Please enter name");
            return false;
        }
        this.setState({
            loading: true
        })
        var data = {
            name: this.state.name,
            mobile_number: this.state.mobile_number,
            zip_code: this.state.zip_code
        }

        Axios.post(`${this.state.url}/front/auth/transfer/register`, data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            if (res.data.data.status === "SUCCESS") {
                this.setState({
                    customer_registration_otp: true
                })
                this.notify("success",res.data.data.msg)
            }
            this.setState({
                loading: false
            })
        }, err => {
            this.setState({
                loading: false
            })
            this.notify("error", "Something went wrong.");
        })
    }

    verifyRegistrationOtp = (e) => {
        e.preventDefault();
        if (this.state.regotp === "") {
            this.notify("error", "Please enter OTP");
            return false;
        }
        this.setState({
            loading: true
        })
        Axios.post(`${this.state.url}/front/auth/transfer/verify/registration/otp`, {otp: this.state.regotp, mobile_number: this.state.mobile_number},{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            if (res.data.data.status === "SUCCESS") {
                this.notify("success", res.data.data.msg);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
            else {
                this.notify("error", res.data.data.msg);
            }
            this.setState({
                loading: false
            })
        }, err => {
            this.setState({
                loading: false
            })
            window.location.reload();
            console.log("verify otp error", err)
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

    getLoginUserDetail = () => {
        this.setState({
            loading:true
        })
        Axios.get(`${this.state.url}/front/auth/get/login-user`, {
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    showCat:true,
                    User:res.data.data.category
                })
                console.log("brands",this.state.User)
            }, 100);
            
        }, err => {
            console.log("error", err.response)
        })
        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addBeneficiary = () => {
        if (this.state.bene_name === "") {
            this.notify("error", "Please enter Beneficiary Name.", "error");
            return false;
        }
        if (this.state.bene_mobile === "") {
            this.notify("error", "Please enter Beneficiary Mobile Number.", "error");
            return false;
        }
        if (this.state.bene_account_number === "") {
            this.notify("error", "Please enter Beneficiary Accouont Number.", "error");
            return false;
        }
        if (this.state.bene_ifsc === "") {
            this.notify("error", "Please enter IFSC Code.", "error");
            return false;
        }
        this.setState({
            loading: true
        })
        var data = {
            bene_name: this.state.bene_name,
            bene_mobile: this.state.bene_mobile,
            bene_account_number: this.state.bene_account_number,
            bene_ifsc: this.state.bene_ifsc
        }

        Axios.post(`${this.state.url}/front/auth/add/beneficiary`, data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            this.setState({
                loading: false
            })
            console.log("add beneficiary response", res)
            if (res.data.status === "FAILED") {
                this.notify("error", res.data.message);
            } else {
                this.notify("success", res.data.message);
                this.setState({
                    otp_verfy: true,
                    bene_id: res.data.data.bene_id
                })
            }
        }, err => {
            this.setState({
                loading: false
            })
            console.log("add beneficiary error", err)
        })
    }

    verifyOTP = (e) => {
        e.preventDefault();

        if (this.state.otp === "") {
            this.notify("error", "Please enter OTP");
            return false;
        } else {
            if (this.state.otp.length < 6) {
                this.notify("error", "OTP must be 6 digits long.");
                return false;
            }
        }
        this.setState({
            loading: true
        })
        var data = {
            bene_id: this.state.bene_id,
            otp: this.state.otp
        }
        Axios.post(`${this.state.url}/front/auth/transfer/verify/otp`, data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("verify otp", res);
            this.setState({
                loading: false
            })
            if (res.data.status === "failed") {
                this.notify("error", res.data.message);
            } else {
                this.notify("success", res.data.message);
                this.setState({
                    otp_verfy: false,
                    bene_id: "",
                    add_bene: false
                })
                // this.checkRegister();
            }
        }, err => {
            this.setState({
                loading: false
            })
            console.log("verify error", err);
        })
    }

    getBeneficiaryList = () => {
        var data={}
        Axios.post(`${this.state.url}/front/auth/transfer/get/beneficiary/list`,data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            this.setState({
                BenifList: res.data.data.data
            })
            console.log("benelist response", this.state.BenifList);
        }, err => {
            console.log("benelist error", err.resposne)
            this.setState({
                bene_list: []
            })
        })
    }

    resendOTPBene = (e, bene_id) => {
        e.preventDefault();
        var data = {
            bene_id: bene_id,
        }
        Axios.post(`${this.state.url}/front/auth/transfer/resend/bene/otp`,data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("resend otp response", res);
            if(res.data.data.status === "SUCCESS"){
                this.setState({
                    otp_verfy: true,
                    bene_id: bene_id
                })
                this.getBeneficiaryList()
            }
        }, err => {
            console.log("resend otp error response", err)

        })
    }

    sendMoneyForm = (e, index) => {
        e.preventDefault();
        var beneficiary = this.state.BenifList[index];
        console.log(beneficiary);
        this.setState({
            selected_beneficiary: beneficiary,
            bene_name: beneficiary.BeneficiaryName,
            account_number: beneficiary.AccountNumber,
            ifsc: beneficiary.IfscCode,
            send_money_tab: true
        })
    }

    CancelTransfer = (e) => {
        this.setState({
            send_money_tab:false
        })
    }

    transferAmount = (e) => {
        // alert(uniqid())
        if (this.state.amount === 0) {
            this.notify("error", "Please enter amount.");
            return false;
        } else {
            // if (this.state.amount < 200) {
            //     this.notify("error", "Minimum transfer amount is 1.");
            //     return false;
            // }
            if (this.state.amount > 5000) {
                this.notify("error", "Maximum transfer amount is 5000.");
                return false;
            }
        }
        this.setState({
            loading: true
        })
        var data = {
            amount: this.state.amount,
            bene_id: this.state.selected_beneficiary.beneficiaryId,
            AccountNumber:this.state.selected_beneficiary.AccountNumber,
            BeneficiaryName:this.state.selected_beneficiary.BeneficiaryName
        }

        Axios.post(`${this.state.url}/front/auth/transfer/send/amount`,data,{
            headers: {
                token: sessionStorage.getItem('_access')
            }
        }).then(res => {
            console.log("money transfer", res);
            this.setState({
                loading: false,
                amount: 0,
                selected_beneficiary: null,
            })
            if (res.data.data.data.status === "FAILED") {
                this.notify("error", res.data.data.data.resText);
            } else {
                this.notify("success", res.data.data.data.resText);
                setTimeout(() => {
                    window.location.reload()
                }, 4000);
            }
        }, err => {
            this.setState({
                loading: false
            })
            console.log(err)
            this.notify("", "Something went wrong", "error");
        })
    }
    

    render() {
        return <>
        {this.state.loading && <>
          <div class="loading">Loading&#8230;</div>
            </> }
        <InnerHeader  />
        <NotificationAlert ref={this.notificationAlert} />
        <div class="dashboard-background">
            <div class="row" id="main-part">
            
            <RightSidebar />
            <div class="col-md-8" id="middle-sec">
                 <div class="page-heading"> 
                   <h1>Add Beneficier</h1>
                   <p>Transaction Fee: Rs10-Rs10000 = -Rs5.00+GST And Rs10001-50000 = -Rs0.30%+GST</p>
                 </div>
                
                 {this.state.IMPS === 'pending' && !this.state.customer_registration_otp && <>
                 <div class="imps-form">
                     <p>Register Mobile Number</p>
                     <label>Mobile Number</label>
                  <input type="text" name="bene_name" value={this.state.mobile_number} readOnly onChange={(e) => this.handleInputChange(e)}/>

                  <label> Name</label>
                  <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)}/>
                  <input type="button" class="submit" name="submit" value="Register Mobile" onClick={(e) => this.registerMoneyTransfer(e)}/>
                 </div>
                 </>}

                 {this.state.customer_registration_otp && <>
                   <div class="otp-form">
                    <label>Enter OTP</label>
                  <input type="text" name="regotp" value={this.state.regotp} onChange={(e) => this.handleInputChange(e)}/>
                  <input type="button" class="submit" name="submit" value="Verify OTP" onClick={(e) => this.verifyRegistrationOtp(e)}/>
                  </div>
                 </>}

                 {!this.state.send_money_tab && this.state.IMPS !== 'pending' && !this.state.otp_verfy && <>
                  <div class="refer-main-block">
                  <label>Beneficiary Name</label>
                  <input type="text" name="bene_name" value={this.state.bene_name} onChange={(e) => this.handleInputChange(e)}/>

                  <label>Beneficiary Mobile</label>
                  <input type="text" name="bene_mobile" value={this.state.bene_mobile} onChange={(e) => this.handleInputChange(e)}/>

                  <label>Beneficiary Account Number</label>
                  <input type="text" name="bene_account_number" value={this.state.bene_account_number} onChange={(e) => this.handleInputChange(e)}/>

                  <label>IFSC</label>
                  <input type="text" name="bene_ifsc" value={this.state.bene_ifsc} onChange={(e) => this.handleInputChange(e)}/>

                  
                  <input type="button" class="submit" name="submit" value="Add Beneficiry" onClick={(e) => this.addBeneficiary(e)}/>
                  </div>
                  </>}

                  {this.state.otp_verfy && <>
                   <div class="otp-form">
                    <label>Enter OTP</label>
                  <input type="text" name="otp" value={this.state.otp} onChange={(e) => this.handleInputChange(e)}/>
                  <input type="button" class="submit" name="submit" value="Verify OTP" onClick={(e) => this.verifyOTP(e)}/>
                  </div>
                 </>}



                 {this.state.send_money_tab && <Card>
                            <CardHeader>
                                <h5 className="title">Send Money</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Beneficiary Name</label>
                                                <Input defaultValue={this.state.bene_name} placeholder="Beneficiary Name" name="bene_name" type="text" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Account Number</label>
                                                <Input defaultValue={this.state.account_number} placeholder="Account number" name="account_number" type="text" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>IFSC Code</label>
                                                <Input defaultValue={this.state.ifsc} placeholder="IFSC Code" name="ifsc" type="text" readOnly />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Amount</label>
                                                <Input value={this.state.amount} placeholder="Amount" name="amount" type="text" onChange={(e) => this.handleInputChange(e)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                            <input type="button" name="submit" value="Transfer Amount" onClick={(e) => this.transferAmount(e)}/>

                            <input type="button" name="submit" value="Cancel" onClick={(e) => this.CancelTransfer(e)}/>                                
                            </CardFooter>
                        </Card>}


                        {this.state.IMPS !== 'pending' && <> 
                    <div class="beneficiary-section">
                    <table className="table" >
                    <thead className="text-primary">
                        <tr>
                            <th>Beneficiary Name</th>
                            <th>Beneficiary Id</th>
                            <th>Account Number</th>
                            <th>IFSC</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.BenifList.length > 0 && <>
                            {this.state.BenifList.map((bn, ki) => {
                                return <tr key={ki}>
                                    <td>{bn.BeneficiaryName}</td>
                                    <td>{bn.beneficiaryId}</td>
                                    <td>{bn.AccountNumber}</td>
                                    <td>{bn.IfscCode} </td>
                                    <td>{bn.AccountType}</td>
                                    
                                    <td>
                                        {bn.AccountType === "Not Active" && <a href="" className="badge badge-primary" onClick={(e) => {this.resendOTPBene(e, bn.beneficiaryId)}}>Resend OTP</a>}&nbsp;
                                        {bn.AccountType !== "Not Active" && <><a href="" className="badge badge-primary" onClick={(e) => this.sendMoneyForm(e, ki)}>Send Money</a>
                                        {/* &nbsp;
                                        <a href="" onClick={(e) => this.deleteBeneficiary(e, ki)}><i className="fa fa-trash-o"></i></a> */}
                                        </>}
                                    </td>
                                </tr>
                            })}
                        </>
                        }
                        {this.state.BenifList.length === 0 && <>
                        <tr>
                            <td colSpan="100%">No Records found</td>
                        </tr>
                    </>}
                    </tbody>
                </table>
                </div>
                </>}
                  
              </div>
                <LeftSidebar />
        </div>
        </div>
        
            <Footer  />
        </>;
    }
}

export default ImpsTransfer;