/* eslint-disable array-callback-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import Axios from "axios";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: process.env.REACT_APP_API_URL,
            email: "",
            password: ""
        }
    }
    notificationAlert = React.createRef();

    componentDidMount = () => {
        // if (!window.location.href.includes("dev.gogofoodapp") && !window.location.href.includes("admin.gogofoodapp") && !window.location.href.includes("localhost")) {
        //     window.location.href = "https://gogofoodapp.com";
        // }
    }
    inputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    loginSubmit = e => {
        if (this.state.email === "") {
            this.notify("error", "Please enter Email.");
            return false;
        }
        if (this.state.password === "") {
            this.notify("error", "Please enter Password.");
            return false;
        }
        var data = {
            email: this.state.email,
            password: this.state.password
        }
        Axios.post(`${this.state.url}/admin/auth/signin`, data).then(res => {
            console.log("res.data.data.users.assign_module",res.data.data.users);
            if (res.data.success) {
                sessionStorage.setItem("_access", res.data.data.token);
                // this.props.history.push("/admin/dashboard");
                // // return false;
                sessionStorage.setItem("module",JSON.stringify(res.data.data.users.role.assign_module))
                if(res.data.data.users.role.assign_module.includes("Dashboard")){
                    this.props.history.push("/admin/dashboard");
                }else{
                    this.props.history.push("/admin/"+res.data.data.users.role.assign_module[0].toLowerCase());
                }
                
                
            } else {
                this.notify("error", res.data.message);
            }
        }, err => {
            console.log("error", err)
            this.notify("error", "Something went wrong.");
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
    render() {
        return <>
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
                <div className="main-login">
                    <Row>
                        <Col md="12">
                            <div className="admin-login">
                                <img src={require("assets/img/admin/LOGO-original.png")} alt="logo" />
                                <h2>Welcome !</h2>
                            </div>
                        </Col>
                        <div className="col-md-6 mx-auto">
                            <div className="login-details">
                                <div className="form-group">
                                    <label>Email<span className="star-text">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter Name" id="email" onChange={(e) => { this.inputChange(e) }} />
                                </div>
                                <div className="form-group">
                                    <label>Password <span className="star-text">*</span></label>
                                    <input type="password" className="form-control" placeholder="Password" id="password" onChange={(e) => { this.inputChange(e) }} />
                                </div>
                                <div className="login-btn">
                                    <button type="button" onClick={(e) => { this.loginSubmit(e) }}>Login</button>
                                </div>
                                <div className="forget-password">
                                    {/* <a href="javascript:volid(0)">Forgot Password</a> */}
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </>;
    }
}

export default Login;