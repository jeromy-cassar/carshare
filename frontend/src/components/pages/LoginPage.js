import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';
class LoginPage extends Component{
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }
    
    onSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/login',{
            method:"POST",
            body:formData,
        })
        .then(function (response) {
            if(response.status == 200) {
                response.json().then(function (data) {
                    //get the response from backend
                    let userid = data.id;
                    let username = data.username;
                    let userstatus = data.active;
                    //store userid and username in session storage
                    sessionStorage.setItem("user", username)
                    sessionStorage.setItem("id", userid)
                    sessionStorage.setItem("login", userstatus)
                    
                })
                window.location="/booking";
            }else if(response.status == 400) {
                response.json().then(function (data) {
                    console.log(data);
                })
                document.getElementById('error').innerHTML = "Wrong Username or password."
            }
        })
    }


    
    render(){ return(
        <Form className="login-form" onSubmit={this.onSubmit}>
            <h1 className="font-weight-bold text-center">Login</h1>
            <FormGroup>
                <Label>Username:</Label>
                <Input name="username" onChange={this.onChange} placeholder="Username" type="text" />
            </FormGroup>
            <FormGroup>
                <Label>Password:</Label>
                <Input name="password" onChange={this.onChange} placeholder="Password" type="password" />
                <span id="error"  style={{color: 'red', fontSize: 'small'}} ></span>
            </FormGroup>
            <Button className="btn-block" color="primary" >Log in</Button>
            <div className="text-center pt-3">
                <a href="/create">Create account</a>
                <span className="p-2">|</span>
                <a href="/change">Forgot password</a>
            </div>
        </Form>
    )}
}

export default LoginPage;