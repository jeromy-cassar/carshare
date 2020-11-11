import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import  { Redirect } from 'react-router-dom'

import './style.css';

class PaymentPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname:'',
            lastname:'',
            cardnumber:'',
            month:'',
            year:'',
            cvv:''
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        //card holder name
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let cardholder_name = firstname + " " + lastname;
        //car num
        let card_number = this.state.cardnumber;
        //card expired date
        let month = this.state.month;
        let year = this.state.year;
        let expiry_date = month + "/" + year ;
        //cvv
        let cvv = this.state.cvv;
        //user id
        let userid = sessionStorage.getItem('id');
        //car id
        let carid = sessionStorage.getItem('car');
        let formData = new FormData();
        let from_date = sessionStorage.getItem('from');
        let to_date = sessionStorage.getItem('to');
        let cost_save = sessionStorage.getItem('cost');
        formData.append('cardholder_name', cardholder_name);
        formData.append('card_number', card_number);
        formData.append('expiry_date', expiry_date);
        formData.append('cvv', cvv);
        formData.append('userid', userid);
        formData.append('car', carid);
        formData.append('from', from_date);
        formData.append('to', to_date);
        formData.append('cost',cost_save);
        fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/booking/payment',{
            method:"POST",
            body:formData,
        })
        .then(function (response) {
            if(response.status == 201) {
                response.json().then(function (data) {
                    console.log("booking succesful");
                    console.log(data);
                })
                window.location="/previousbooking";
            }else if(response.status == 400) {
                response.json().then(function (data) {
                    console.log(data);
                    if(data.cardholder_name){
                        document.getElementById('cherror').innerHTML = data.cardholder_name
                    }else{
                    document.getElementById('cherror').innerHTML = null
                    }
                    if(data.card_number){
                        document.getElementById('cnerror').innerHTML = data.card_number
                    }else{
                    document.getElementById('cnerror').innerHTML = null
                    }
                    if(data.expiry_date){
                        document.getElementById('ederror').innerHTML = data.expiry_date
                    }else{
                    document.getElementById('ederror').innerHTML = null
                    }
                    if(data.CVV){
                        document.getElementById('cverror').innerHTML = data.CVV
                    }else{
                    document.getElementById('cverror').innerHTML = null
                    }
                })
            }
        })
    }

    render() {
        let user = sessionStorage.getItem('user');
        let fromdate = sessionStorage.getItem('from');
        let todate = sessionStorage.getItem('to');
        let cost = sessionStorage.getItem('cost');
        return (
            <Form className="payment-form" onSubmit={this.onSubmit}>
            
            <h1 className="font-weight-bold text-center">Payment Details</h1>

            <FormGroup>
                <h3 className="pt-3">Order Details:</h3><br />
                <Label>User: <span>{user}</span></Label>
            </FormGroup>
            <FormGroup>
                <Label>Order date: <span>{fromdate}</span></Label>
            </FormGroup>
            <FormGroup>
                <Label>Return date: <span>{todate}</span></Label>
            </FormGroup>
            <FormGroup>
                <Label>Total Cost: $<span>{cost}</span></Label>
            </FormGroup>

            <FormGroup>
                <h3 className="pt-3">Card holder:</h3>
                <Label>Cardholder Name:</Label>
                <Input name="firstname" onChange={this.onChange} placeholder="First name" type="text" />
                <Input name="lastname" onChange={this.onChange} placeholder="Last name" type="text" />
                <span id="cherror"  style={{color: 'red', fontSize: 'small'}} ></span>
            </FormGroup>
            <FormGroup>
                <Label>Card Number:</Label>
                <Input name="cardnumber" onChange={this.onChange} placeholder="Valid Card number" type="text" />
                <span id="cnerror"  style={{color: 'red', fontSize: 'small'}} ></span>
            </FormGroup>
            <FormGroup>
                <Label>Expiry Date:</Label>
                <Input name="month" onChange={this.onChange} placeholder="MM" type="text" />
                <Input name="year" onChange={this.onChange} placeholder="YY" type="text" />
                <span id="ederror"  style={{color: 'red', fontSize: 'small'}} ></span>
            </FormGroup>
            <FormGroup>
                <Label>CVV:</Label>
                <Input name="cvv" onChange={this.onChange} placeholder="CVV" type="password" />
                <span id="cverror"  style={{color: 'red', fontSize: 'small'}} ></span>
            </FormGroup>
            <Button className="btn-block mt-4 my-4" color="primary" >Purchase</Button>
        </Form>
        )
    }
}

export default PaymentPage
