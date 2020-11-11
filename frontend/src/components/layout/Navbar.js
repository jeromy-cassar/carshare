import React, { Component } from 'react'
import './Navbar.css'
class Navbar extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            isLoggedin: false,
            clicked: false,
        }
    }
    
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        let username
        let login  = sessionStorage.getItem("login")
        if (login){
            this.state.isLoggedin = true
            username  = sessionStorage.getItem("user")
        }    
        //check the user is logged in or not
        let user
        let user_mobile
        if (this.state.isLoggedin){
            user = <a className="nav-links-user" href="/account">{username}</a>
            user_mobile = <a className="nav-links-mobile" href="/account">{username}</a>
        }else {
            user = <a className="nav-links-user" href="/login">Login</a>
            user_mobile = <a className="nav-links-mobile" href="/login">Login</a>
        }

        return (
        <nav className="NavbarItems">
            <a href="/" className="navbar-logo" >
                <img src="assets/img/logo.png" className="img-fluid" 
                style={{width: 140, height: 60, marginRight: 10}} />
            </a>
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'} ></i>
            </div>
            <ul className={this.state.clicked ? 'navbar-menu active' : 'navbar-menu'}>
                <li><a className="nav-links" href="/">Home</a></li>
                <li><a className="nav-links" href="/booking">Booking</a></li>
                <li><a className="nav-links" href="/previousbooking">Order</a></li>
                <li><a className="nav-links" href="/contactus">Contact</a></li>
                <li>{user_mobile}</li>
            </ul>
            {user}
        </nav>
        )
    }
}

export default Navbar
