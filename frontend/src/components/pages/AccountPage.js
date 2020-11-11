import React, { Component } from 'react';
import { Table, Form, Button } from 'reactstrap';
import './style.css';

class AccountPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            isLoggedin: false,
        }
    }
    
    //log out button
    onClick  = () => {
        let namestore = sessionStorage.getItem("user");
        let idstore = sessionStorage.getItem("id");
        let formData = new FormData();
        formData.append('userid', idstore);
        formData.append('username', namestore);
        fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/logout',{
            method:"POST",
            body:formData,
        })
        .then (response => response.json())
        .then (logoutadata =>{
            this.setState({isLoggedin: false});
            console.log(logoutadata);
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("login");
            window.location="/";
        })
    }


    // load detail data when user comes to this page
    componentDidMount() {
        var url = "http://backend-dot-pp1-carshare.ts.r.appspot.com/users/";
        var idstore = sessionStorage.getItem("id");
        url =  url + idstore;
        if(idstore){
            fetch(url)
            .then(req => req.json())
            .then(data =>{
                console.log(data)
                if(data.active = 1){
                    this.setState({user: data, isLoggedin: true});
                }
            })            
        }
    }

    render() {
        var { isLoggedin, user } = this.state;
        
        //check login status
        if(!isLoggedin){
            return  <div className="loading-box">
                        <h4 className="text-center">Loading...</h4>
                    </div>
        }else{
        //display a table of user
        return (
            <Form className="user-table">
                <h3 className="font-weight-bold">Account Details</h3>
                <Table className="text-left" borderless>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{user.firstname}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{user.lastname}</td>
                        </tr>
                        <tr>
                            <th>E-mail</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Mobile number</th>
                            <td>{user.mobile}</td>
                        </tr>
                        <tr>
                            <th>Date of birth</th>
                            <td>{user.dob}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button className="btn-lg" color="primary" onClick={this.onClick}>Log out</Button>
            </Form>
            
        )

        }
    }
}

export default AccountPage
