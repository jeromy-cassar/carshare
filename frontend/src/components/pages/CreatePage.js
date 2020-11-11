import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';

export class CreatePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            password:'',
            confirm_password:'',
            dob:'',
            mobile:''
        }
    }

    //get content of input fields
    onChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }

    //create account button
    onSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('username', this.state.username);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('confirm_password', this.state.confirm_password);
        formData.append('dob', this.state.dob);
        formData.append('mobile', this.state.mobile);
        fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/users',{
            method:"POST",
            body:formData,
        })
        .then(function (response) {
            if(response.status == 201) {
                response.json().then(function (data) {
                  console.log(data);
                })
                window.location="/login";
            }
            //if the error message shows
            else if(response.status == 400) {
                response.json().then(function (data) {
                  //get error messages
                  if(data.firstname){
                    document.getElementById('fnerror').innerHTML = data.firstname
                  }else{
                    document.getElementById('fnerror').innerHTML = null
                  }
                  if(data.lastname){
                    document.getElementById('lnerror').innerHTML = data.lastname
                  }else{
                    document.getElementById('lnerror').innerHTML = null
                  }
                  if(data.username){
                    document.getElementById('unerror').innerHTML = data.username
                  }else{
                    document.getElementById('unerror').innerHTML = null
                  }
                  if(data.email){
                    document.getElementById('emerror').innerHTML = data.email
                  }else{
                    document.getElementById('emerror').innerHTML = null
                  }
                  if(data.password){
                    document.getElementById('pwerror').innerHTML = data.password
                  }else{
                    document.getElementById('pwerror').innerHTML = null
                  }
                  if(data.confirm_password){
                    document.getElementById('rperror').innerHTML = data.confirm_password
                  }else{
                    document.getElementById('rperror').innerHTML = null
                  }
                  if(data.dob){
                    document.getElementById('dberror').innerHTML = data.dob
                  }else{
                    document.getElementById('dberror').innerHTML = null
                  }
                  if(data.mobile){
                    document.getElementById('mberror').innerHTML = data.mobile
                  }else{
                    document.getElementById('mberror').innerHTML = null
                  }
                })
            }
        })
    }

    render() {
        return (
          <Form className="create-form" onSubmit={this.onSubmit}>
          <h1 className="font-weight-bold text-center">Create Account</h1>
          <FormGroup>
              <Label>First Name:</Label>
              <Input name="firstname" id="firstname" onChange={this.onChange} placeholder="First name" type="text" />
              <span id="fnerror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Last name:</Label>
              <Input name="lastname" id="lastname" onChange={this.onChange} placeholder="Last name" type="text" />
              <span id="lnerror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Username:</Label>
              <Input name="username" id="username" onChange={this.onChange} placeholder="Username" type="text" />
              <span id="unerror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>E-mail:</Label>
              <Input name="email" id="email" onChange={this.onChange} placeholder="E-mail" type="email" />
              <span id="emerror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Password:</Label>
              <Input name="password" id="password" onChange={this.onChange} placeholder="Password" type="password" />
              <span id="pwerror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Confirm Password:</Label>
              <Input name="confirm_password" id="confirm_password" onChange={this.onChange} placeholder="Password" type="password" />
              <span id="rperror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Date of Brith:</Label>
              <Input name="dob" id="dob" onChange={this.onChange} type="date" />
              <span id="dberror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <FormGroup>
              <Label>Mobile:</Label>
              <Input name="mobile" id="mobile" onChange={this.onChange} placeholder="Mobile number" type="text" />
              <span id="mberror"  style={{color: 'red', fontSize: 'small'}} ></span>
          </FormGroup>
          <Button className="btn-block" color="primary">Create</Button>
          <div className="text-center pt-3">
              <a href="/login">Already have an account?</a>
          </div>
      </Form>
        )
    }
}

export default CreatePage
