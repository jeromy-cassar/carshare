import React, { Component } from 'react'

export class ContactUsPage extends Component {
    render() {
        return (
// Contact us section
<div>
  <section id="contact" className="contact">
    <div className="container"><br/><br/><br/><br/>
      <div className="section-title" data-aos="fade-up">
        <h2>Contact Us</h2>
        <br />
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay={100}>
          <div className="contact-about">
            <h3>Hyre</h3>
            <p>Hyre provide reliable vehicles for customers to use and enjoy. Our mission is to provide an easy and simple application for users. Our cars are serviced everytime a vehicle has been returned, to make sure you have a flawless and smooth journey.</p>
            <div className="social-links">
              <a href="#" className="twitter"><i className="icofont-twitter" /></a>
              <a href="#" className="facebook"><i className="icofont-facebook" /></a>
              <a href="#" className="instagram"><i className="icofont-instagram" /></a>
              <a href="#" className="linkedin"><i className="icofont-linkedin" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay={200}>
          <div className="info">
            <div>
              <i className="ri-map-pin-line" />
              <p>105 A'Beckett Street<br />Melbourne, 3000 VIC</p>
            </div>
            <div>
              <i className="ri-mail-send-line" />
              <p>hyre@acme.com</p>
            </div>
            <div>
              <i className="ri-phone-line" />
              <p>+61 400 123 987</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        )
    }
}

export default ContactUsPage
