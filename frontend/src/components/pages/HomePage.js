import React, { Component } from 'react'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
        isLoggedin: false
    }
}

    render() {

      let login  = sessionStorage.getItem("login")
      if (login){
          this.state.isLoggedin = true
      }    
      //check the user is logged in or not
      let bookbutton
      if (this.state.isLoggedin){
          bookbutton = <a href="/booking" className="btn-get-started scrollto">Start Booking</a>
      }else {
          bookbutton = <a href="/login" className="btn-get-started scrollto">Start Booking</a>
      }
        return (
            
        <div>
          <section id="hero" className="d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                  <h1 data-aos="fade-up">Start your efficient and convenient way of travel</h1>
                  <h2 />
                  <h2 data-aos="fade-up" data-aos-delay={400}>Book a car anytime, anywhere and start your travel now</h2>
                  <div data-aos="fade-up" data-aos-delay={800}>
                    {bookbutton}
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay={200}>
                  <img src="assets/img/hero-img.png" className="img-fluid animated"/>
                </div>
              </div>
            </div>
          </section>
          <main id="main">
            <section id="services" className="services">
              <div className="container">
                <div className="section-title" data-aos="fade-up">
                  <h2>Services</h2>
                  <p>Bring you a comfortable and safe travel experience</p>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay={100}>
                      <div className="icon"><i className="bx bx-tachometer" /></div>
                      <h4 className="title"><a>Nearest vehicle</a></h4>
                      <p className="description">We will find the nearst vehicle for you according to your current location</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay={200}>
                      <div className="icon"><i className="bx bx-world" /></div>
                      <h4 className="title"><a>Return area</a></h4>
                      <p className="description">Our application will list a number of return points in which you can return the car</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay={300}>
                      <div className="icon"><i className="bx bxl-dribbble" /></div>
                      <h4 className="title"><a>Regular maintenance</a></h4>
                      <p className="description">Regular maintenance on the vehicle to ensure your travel safety</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div className="icon-box" data-aos="fade-up" data-aos-delay={400}>
                      <div className="icon"><i className="bx bx-file" /></div>
                      <h4 className="title"><a>Contact us</a></h4>
                      <p className="description">Free to contact us if you have any reasonable suggestions or problems during using Hyre</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        )
    }
}

export default HomePage
