<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>CarShare</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="Vesperr/assets/img/favicon.png" rel="icon">
  <link href="Vesperr/assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="Vesperr/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/icofont/icofont.min.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/venobox/venobox.css" rel="stylesheet">
  <link href="Vesperr/assets/vendor/aos/aos.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="Vesperr/assets/css/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Vesperr - v3.0.0
  * Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>
<body class="d-flex flex-column min-vh-100">

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center" style="background: rgb(95,0,177); background: linear-gradient(90deg, rgba(95,0,177,1) 0%, rgba(0,212,255,1) 100%);">
    <div class="container d-flex align-items-center">

      <div class="logo mr-auto">
        <h1 class="text-light"><a href="home.php"><span style="color:white;">CarShare</span></a></h1>
      </div>

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li><a href="home.php" style="color:white;">Home</a></li>
          <li><a href="booking.php" style="color:white;">Make a Booking</a></li>
          <li><a href="previousbookings.php" style="color:white;">View Previous Bookings</a></li>
          <li><a href="contact.php" style="color:white;">Contact Us</a></li>
          <li class="get-started" style="color:white;"><a href="login.php">Log out</a></li>
        </ul>
      </nav><!-- .nav-menu -->

    </div>
  </header><!-- End Header -->
  
  <main id="main" style="padding-top:80px;">
    <section class="inner-page">
      <div class="container align-items-center">
        <h2>Payment</h2>
        <div class="row">
            <div class="col-lg-6 mb-3">
                From: 
            </div>
            <div class="col-lg-6">
                Car:
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 mb-3">
                Until:
            </div>
            <div class="col-lg-6" id="selected_car">

            </div>
        </div>
        <h4 style="text-align:center;">Enter Credit Card Details</h4>
        <form>
            <div class="row">
                <div class="col-sm-8">
                    <div class="form-group mb-3">
                    <label for="cardholder_name" class="col-sm-4 col-form-label">Cardholder Name</label>
                    <div class="col-sm-8">
                        <input type="text" id="cardholder_name" name="cardholder_name" class="form-control">
                    </div>
            </div>
            <div class="form-group mb-3">
                <label for="card_number" class="col-sm-4 col-form-label">Card Number</label>
                <div class="col-sm-8">
                    <input type="text" id="card_number" name="card_number" class="form-control">
                </div>
            </div>
            <div class="form-group mb-3">
                <div class="row">
                    <div class="col-6">
                        <label for="expiry_date">Expiry Date</label><br>
                        <input type="text" class="form-control" id="expiry_date" name="expiry_date" placeholder="mm/yy">
                    </div>
                    <div class="col-6">
                        <label for="CVV">CVV</label><br>
                        <input type="text" name="CVV" id="CVV" class="form-control">
                    </div>
                </div>
            </div>
            <div class="form-group mb-3">
                <div class="row">
                    <div class="col-sm-6">
                        <button class="btn btn-secondary">Back</button>
                    </div>
                    <div class="col-sm-6">
                        <button type="submit" class="btn btn-primary">Confirm & Book</button>
                    </div>
                </div>
            </div>
        </form>
        </div>
        </div>    
      </div>
      </div>
    </section>
  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer" class="mt-auto">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6 text-lg-left text-center">
          <div class="copyright">
            &copy; Copyright <strong>Vesperr</strong>. All Rights Reserved
          </div>
          <div class="credits">
            <!-- All the links in the footer should remain intact. -->
            <!-- You can delete the links only if you purchased the pro version. -->
            <!-- Licensing information: https://bootstrapmade.com/license/ -->
            <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/vesperr-free-bootstrap-template/ -->
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

  <!-- Vendor JS Files -->
  <script src="Vesperr/assets/vendor/jquery/jquery.min.js"></script>
  <script src="Vesperr/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="Vesperr/assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="Vesperr/assets/vendor/php-email-form/validate.js"></script>
  <script src="Vesperr/assets/vendor/waypoints/jquery.waypoints.min.js"></script>
  <script src="Vesperr/assets/vendor/counterup/counterup.min.js"></script>
  <script src="Vesperr/assets/vendor/owl.carousel/owl.carousel.min.js"></script>
  <script src="Vesperr/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="Vesperr/assets/vendor/venobox/venobox.min.js"></script>
  <script src="Vesperr/assets/vendor/aos/aos.js"></script>

  <!-- Template Main JS File -->
  <script src="Vesperr/assets/js/main.js"></script>

</body>

</html>