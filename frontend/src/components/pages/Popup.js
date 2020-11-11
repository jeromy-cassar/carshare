import React, { Component }  from 'react';
import './style.css';
import {Button } from 'reactstrap';

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
        }
    }
    
    onGetid (event) {
        
        let id = this.id
        
        let x = this.x
        let y = this.y
        
        let item_id = this.loc_id
     
        console.log("button: " + id )
        console.log(x)
        console.log(y)
        console.log("location: " + item_id )
        
        let formData = new FormData();
        let user_id = sessionStorage.getItem('id');
        let car_id =  sessionStorage.getItem('carID');
        let booking_id =  sessionStorage.getItem('bookingID');

        formData.append('bookingID', booking_id);
        formData.append('x', x);
        formData.append('y', y);
 
        
        let url = ("http://backend-dot-pp1-carshare.ts.r.appspot.com/return/" + user_id + "/" + car_id);
        fetch(url,{
            method:"POST",
            body:formData,
          })
          .then(function (response) {
      
            //valid date of order
            if(response.status == 200) {
                
                console.log("return successful");
                window.location.reload();
               
            }
          })
          
    }

    componentDidMount() {
        var url = "https://backend-dot-pp1-carshare.ts.r.appspot.com/carspaces";
        fetch(url)
            .then(req => req.json())
            .then(data => {
                console.log('Here is carspaces');
                this.setState({ data: data[0], isLoaded: true });
                console.log(this.state.data)
            })
    }

    render() {
        var { data, isLoaded } = this.state;

        if (data && isLoaded){
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <Button color="primary" onClick={this.props.closePopup} className="close_btn">Close</Button>
                        <h3 className="text-center">Choose Location to Return Car:</h3>
                        <div className="carspaces">
                            {this.state.data.map(function (item, key){
                                
                                return(
                                    <div key={key} className="loc_container">
                                        <Button id={key} onClick={this.onGetid} x = {item.x} y = {item.y} loc_id = {item.id}>
                                            <strong>Location </strong><a>{item.id}</a>
                                            <strong> X: </strong><a>{item.x}</a>
                                            <strong> Y: </strong><a>{item.y}</a>
                                        </Button>
                                    </div>
                                                           
                                )
                            }.bind(this))}

                        </div>                    
                    </div>

                </div>
            );
        }else{
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <Button color="primary" onClick={this.props.closePopup}>Close</Button>
                    </div>
                </div>
            );
        }
    }
}


export default Popup;