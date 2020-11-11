import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import './style.css';
import { Link } from "react-router-dom";
import Popup from "./Popup";


class PreviousBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoggedin: false,
            isLoaded: false,
            data: [],
            showPopup: false
        }
    }

    //Popup window
    togglePopup() {
        
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    //load all location
    componentDidMount() {
        var idstore = sessionStorage.getItem("id");
        var userstate = sessionStorage.getItem("login");
        if (userstate && idstore) {
            var url = "https://backend-dot-pp1-carshare.ts.r.appspot.com/booking/";
            url = url + idstore;
            fetch(url)
                .then(req => req.json())
                .then(data => {
                    
                    if (data.bookings) {
                        this.setState({ data: data, isLoggedin: true });
                    }
                    else { this.setState({ items: data[0].reverse(), isLoggedin: true, isLoaded: true, data: data }); }
                    
                })
        }
    }

    render() {
        var { isLoggedin, items, isLoaded, data, showPopup } = this.state;
        console.log(items);

        //check login status
        if (!isLoggedin) {
            return (
                <React.Fragment>
                    <div className="prev-title">
                        <h3 className="text-center">You are not logged in.</h3>

                    </div>
                    <br></br>
                    <div className="text-center">
                        <a href="/login">Please login to see your history order.</a>
                    </div>
                </React.Fragment>
            )
        }

        //check user have any booking or not
        if (data.bookings) {
            return (
                <React.Fragment>
                    <div className="prev-title">
                        <h3 className="text-center">You have no previous bookings.</h3>
                    </div>
                    <br></br>
                    <div className="text-center">
                        <Link to={'/booking'}>
                            <button className="btn btn-primary">Create Booking</button>
                        </Link>
                    </div>



                </React.Fragment>

            )
        }

        else if (isLoaded) {
            
            return (
                <div className="history-table container">
                    <h2>Order Details</h2>
                    
                    <Table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Car ID</th>
                                <th>Order Date</th>
                                <th>Return Date</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="orders">
                            {this.state.items.map(function (item, key) {
                                if (item.status == 'Ongoing') {
                                    sessionStorage.setItem('OnGoingOrder', item.id);
                                    sessionStorage.setItem('carID', item.carID);
                                    sessionStorage.setItem('bookingID', item.id);
                                    
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.carID}</td>
                                            <td>{item.date_booked}</td>
                                            <td>{item.return_date}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.status}</td>
                                            
                                                <td><Button color="primary" onClick={this.togglePopup.bind(this)} >Return</Button>
                                                {this.state.showPopup ?
                                                    <Popup
                                                        text='Choose location to return vehicle'
                                                        closePopup={this.togglePopup.bind(this)}
                                                    />
                                                    : null
                                                }
                                                </td>
                                           
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={key} >
                                            <td>{item.id}</td>
                                            <td>{item.carID}</td>
                                            <td>{item.date_booked}</td>
                                            <td>{item.return_date}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.status}</td>
                                            <td></td>
                                        </tr>
                                    )
                                }

                            }.bind(this))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}

export default PreviousBookPage