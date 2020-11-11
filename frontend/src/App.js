import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import NavBar from './components/layout/Navbar'
import HomePage from './components/pages/HomePage';
import LoginPage from "./components/pages/LoginPage";
import CreatePage from "./components/pages/CreatePage";
import AccountPage from "./components/pages/AccountPage";
import BookingPage from "./components/pages/BookingPage";
import PaymentPage from "./components/pages/PaymentPage";
import PreviousBookPage from './components/pages/PreviousBookPage';
import ContactUsPage from "./components/pages/ContactUsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ChangePage from "./components/pages/ChangePage";



function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                <Route exact path = '/' component = { HomePage } />
                <Route path = '/login' component = { LoginPage } />
                <Route path = '/create' component = { CreatePage } />
                <Route path = '/change' component = { ChangePage } />
                <Route path = '/account' component = { AccountPage } />
                <Route path = '/booking' component = { BookingPage } />
                <Route path = '/payment' component = { PaymentPage } />
                <Route path = '/previousbooking' component = { PreviousBookPage } />
                <Route path = '/contactus' component = { ContactUsPage } />
                <Route component = { NotFoundPage } />
                </Switch>
            </Router>
        </div>
    );
}


export default App;