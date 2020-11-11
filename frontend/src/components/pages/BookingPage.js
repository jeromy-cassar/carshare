import React, {Component} from "react";
import './style.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { ThemeProvider } from "react-bootstrap";



class BookingPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isOpen: false,
      from:'',
      to:'',
    }
  }

  componentDidMount() {
    fetch("https://backend-dot-pp1-carshare.ts.r.appspot.com/cars")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      })
  }

  // store date in session
  onChangeFrom = (e) => {
    let date = e.target.value
    setTimeout(() => {
      this.setState({ from : date })
      sessionStorage.setItem("from", this.state.from)
    }, 10)
  }

  onChangeTo = (e) => {
    let date = e.target.value
    setTimeout(() => {
      this.setState({ to : date })
      sessionStorage.setItem("to", this.state.to)
    }, 10)
  }
  //end store date in session

  onSubmit = e =>{
    e.preventDefault();
    let formData = new FormData();
    let order_car = ""
    order_car = sessionStorage.getItem("car")
    let order_from = " "
    order_from = sessionStorage.getItem("from")
    let order_to = " "
    order_to = sessionStorage.getItem("to")
    formData.append('car',order_car)
    formData.append('from',order_from)
    formData.append('to',order_to)
    console.log(order_car)
    fetch('http://backend-dot-pp1-carshare.ts.r.appspot.com/booking/car',{
      method:"POST",
      body:formData,
    })
    .then(function (response) {

      //valid date of order
      if(response.status == 200) {
          response.json().then(function (data) {
              console.log(data);
              document.getElementById('error').innerHTML = null
              let cost = data.cost
              sessionStorage.setItem('cost',cost)
          })
          window.location="/payment";
      }else if(response.status == 400) {
          response.json().then(function (data) {
              console.log(data);
              if(data.car){
                document.getElementById('error').innerHTML = "Please select a valid car."
              }else if (data.Date){
                document.getElementById('error').innerHTML = data.Date
              }else{
                document.getElementById('error').innerHTML = null
              }
          })
      }
    
    })
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  }

  render() {
    var { isLoaded, items, to, from } = this.state;

    if (!isLoaded) {
      return <div className="loading-box">
        <h3 className="text-center">Loading...</h3>
      </div>
    }

    const WrappedMap = withScriptjs(withGoogleMap(props =>

          <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: -37.8102361, lng: 144.9627652 }}
          >
            {items.map((car_loc) =>

              <Marker
                key={car_loc.id}
                position={{
                  lat: parseFloat(car_loc.x_loc),
                  lng: parseFloat(car_loc.y_loc),
                }}
                onClick={() => goToCard(car_loc.id)}
              >

              </Marker>
            )}

          </GoogleMap>

    ));

    function goToCard(id) {
      var element = document.getElementById('car-item' +id);
      element.scrollIntoView({ behavior: "smooth", block: "end" });
     
      
      element.style.transition = "opacity 0.8s ease-in-out";
      element.style.backgroundColor = "lightgray";
      element.style.opacity = 0.5;
  
      element.style.borderRadius = "10px";
      
      setTimeout( function() {

        
        element.style.opacity = 1;
        element.style.transition = "opacity 0.8s ease-in-out";
        element.style.backgroundColor = "white";
        
        
      },800);
    
    }

    //function that scrolls to the submit button
    function goToSubmit() {
      var element = document.getElementById('car_submit');
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    //function for printing car cards
    function printCars(cardata) {

      //display all cars as a card layout - 3 each row            
      var row = '<div class="row" style= "margin-top: 50px">';
      for (var i = 0; i < cardata.length; i++) {
        var id = cardata[i].id;
        var make = cardata[i].make;
        var model = cardata[i].model;
        var colour = cardata[i].colour;
        var license_plate = cardata[i].license_plate;
        var x_loc = cardata[i].x_loc;
        var y_loc = cardata[i].y_loc;

        //create div column
        row += '<div class="col-lg-4" id="car-item' + id + '" name ="car_tile">';
        row += '<label style= "width: 100%; height: 100%">'
        row += '<input type="radio" id="' + id + '" name="car" value="' + id + '" >';
        row += "<p><strong>Make: </strong> " + make + "<br>";
        row += "<strong>Model: </strong> " + model + "<br>";
        row += "<strong>Colour: </strong> " + colour + "<br>";
        row += "<strong>License Plate: </strong> " + license_plate + "</p>";
        row += '</label>';
        row += "</div>";
      }
      row += "</div>";


      //print cars as cards
      var cars = document.getElementById('car-tiles');
      cars.innerHTML = row;

      var radio = document.getElementsByName('car');
      for (var i = 0; i < radio.length; i++) {
        radio[i].addEventListener("click", bindClick(i));
      }

      function bindClick() {
        return function () {
          goToSubmit();
          sessionStorage.setItem("car", this.id);
        };
      }
    }


    //fetch and load car data
    function loadCars() {
      fetch('https://backend-dot-pp1-carshare.ts.r.appspot.com/cars')
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            //receive data
            response.json().then(function (data) {
              console.log(data);
              printCars(data);
            });
          }
        )
        .catch(function (err) {
          
        });
    }

    //call load function
    window.onload = loadCars();

    //get today's date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
      }
    today = yyyy+'-'+mm+'-'+dd;

    return (
      <React.Fragment>
        <div className="container align-items-center map-box" >
          <h2 style= {{marginTop: '20px'}}>Select a Car</h2>
          <form className="row">
            <div className="col-lg-6">
              <label htmlFor="date_booked">From </label>
              <input type="date" id="datefield" name="from" onChange={this.onChangeFrom} min={today} /> <br />
              <span id="error"  style={{color: 'red', fontSize: 'small'}} ></span>
            </div>
            <div className="col-lg-6">
              <label htmlFor="date_booked">To </label>
              <input type="date" id="datefield" name="to" onChange={this.onChangeTo} min={today} />
            </div>

              <div className="col-12 d-flex justify-content-center">
                <div className="box" style={{ width: '100%', height: '50vh' }}>
                  <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAXEM9mGR-n27roIBh5NSSNhMd0V4STUyc`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </div>
              </div>
            
            <div id="car-tiles" />
            <div className="row">
              <div className="col-lg-12">
                <button type="submit" id="car_submit" onClick={this.onSubmit} className="btn btn-primary">Book</button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default BookingPage;