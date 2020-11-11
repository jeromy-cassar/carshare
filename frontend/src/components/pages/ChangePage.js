import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';

class ChangePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            confirm_password:'',
        }
    }

    //get the content from each input fields
    onChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }

    //button for change password
    onClick = e =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('confirm_password', this.state.confirm_password);
        fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/change',{
            method: 'POST',
            body: formData,
        })
        .then(function (response){
            //check status of response
            if (response.status == 200){
                response.json().then(function (data){
                    console.log(data);
                })                
            }
            //get 400 error from backend
            else if(response.status == 400) {
                response.json().then(function (data){
                    console.log(data);

                    if(data.username){
                        document.getElementById('unerror').innerHTML = data.username
                    }
                    else{
                        document.getElementById('unerror').innerHTML = null
                    }
                    if(data.password){
                        document.getElementById('pwerror').innerHTML = data.password
                    }
                    else{
                        document.getElementById('pwerror').innerHTML = null
                    }
                    if(data.confirm_password){
                        document.getElementById('rperror').innerHTML = data.confirm_password
                    }
                    else{
                        document.getElementById('rperror').innerHTML = null
                    }
                    
                })   
            }

        })
    }
    render() {
        return(
            <Form className="change-form">
                <h3 className="font-weight-bold text-center">Change Password</h3>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input name="username" onChange={this.onChange} placeholder="Username" type="text" />
                    <span id="unerror"  style={{color: 'red', fontSize: 'small'}} ></span>
                </FormGroup>
                <FormGroup>
                    <Label>New Password:</Label>
                    <Input name="password" onChange={this.onChange} placeholder="Enter your new Password" type="password" />
                    <span id="pwerror"  style={{color: 'red', fontSize: 'small'}} ></span>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password:</Label>
                    <Input name="confirm_password" onChange={this.onChange} placeholder="Re-enter your new Password" type="password" />
                    <span id="rperror"  style={{color: 'red', fontSize: 'small'}} ></span>
                </FormGroup>
                <Button className="btn-block" color="primary"  onClick={this.onClick}>Submit</Button>
                <div className="text-center pt-3">
                    <a href="/login">Back to login</a>
                </div>
            </Form>
        )
    }
}

export default ChangePage
