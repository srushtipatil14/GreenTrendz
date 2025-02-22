import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import '../App.css'; // Ensure this file contains your custom styles
import esgIcon from '../assets/img/icon_esg.png';
import GreenTrendz from '../assets/img/logo_1.png';
import logo from '../assets/img/logo.png';
require('../assets/img/img_long_5.png')
require('../assets/img/icon_esg.png')
import imgLong5 from '../assets/img/img_long_5.png';





const HomePage = () => {
  const services = [
    {
      iconClass: "fas fa-file-alt",
      title: "ESG Reporting",
      number: "01",
      description:
        "We follow comprehensive ESG standards to ensure businesses are sustainable and responsible.",
      metrics: [
        "Environment, Social, Governance compliance",
        "Stakeholder engagement",
        "Risk and opportunity assessment",
      ],
    },
    {
      iconClass: "fas fa-briefcase",
      title: "Compare Your ESG Performance",
      number: "02",
      description:
        "Compare your ESG performance against industry peers and standards.",
      metrics: [
        "Governance, leadership, and accountability",
        "Key performance indicators",
        "Financial risk disclosure",
      ],
    },
    
    {
      iconClass: "fas fa-tachometer-alt",
      title: "Dashboard",
      number: "03",
      description:
        "Interactive data visualization tools for tracking sustainability metrics.",
      metrics: [
        "Real-time data analysis",
        "Customizable KPIs and graphs",
        "Cloud-based reporting",
      ],
    },
    {
      iconClass: "fas fa-leaf",
      title: "PCAF - Carbon Accounting",
      number: "04",
      description:
        "Measuring and managing carbon emissions to meet climate goals using PCAF methodology.",
      metrics: [
        "Carbon footprint calculation",
        "Emission reduction strategies",
        "Alignment with global climate goals",
      ],
    },
    
  ];

  

 
  return (
    <div>
 
 <header>
  <Navbar bg="light" expand="lg" className="shadow-sm py-3 custom-navbar">
    <Container>
      <Navbar.Brand href="#" className="d-flex align-items-center">
        <img
          src={GreenTrendz}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-top me-2"
        />
        <span className="brand-text">GreenTrendz</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {/* Navigation Links */}
          <Nav.Link href="#services" className="nav-link-enhanced">
            Services
          </Nav.Link>
          <Nav.Link href="#about" className="nav-link-enhanced">
            About Us
          </Nav.Link>
          <Nav.Link href="#contact" className="nav-link-enhanced">
            Contact
          </Nav.Link>
          {/* Buttons */}
          <Button
            variant="outline-success"
            href="/login"
            className="mx-2 btn-sign"
          >
            Sign In
          </Button>
          <Button variant="success" href="/SignUp" className="mx-2 btn-sign">
            Sign Up
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>

      {/* Hero Section */}
<section id="hero" className="hero section">
  <div
    id="hero-carousel"
    className="carousel slide carousel-fade"
    data-bs-ride="carousel"
    data-bs-interval="3000" /* Smooth 3-second transitions */
  >
    {/* Carousel Item 1 */}
    <div className="carousel-item active">
      <div className="carousel-container">
        <h2 className="hero-title">
          Empower Your Business for a <span className="green-text">Sustainable Future</span>
        </h2>
        <p className="hero-subtitle">
          Turn your ESG goals into reality through intelligent data management
          and comprehensive reporting.
        </p>
        <div className="text-center mt-4">
          <a href="/get-started" className="btn btn-primary btn-cta me-3">
            get started
          </a>
          <a href="/learn-more" className="btn btn-outline-secondary btn-cta">
            learn more
          </a>
        </div>

      </div>
    </div>

    {/* Carousel Indicators */}
    <ol className="carousel-indicators">
      <li
        data-bs-target="#hero-carousel"
        data-bs-slide-to="0"
        className="active"
      ></li>
      {/* Add more indicators if needed */}
    </ol>
  </div>
</section>

{/*service*/}
<div className="container section-title" data-aos="fade-up">
      <br />
      <h1>
        <strong>SERVICES</strong>
      </h1>
      <p>Your Partners in Growth and Development</p>
    </div>

      <div className="container">
        <div className="services-container">
          {services.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="icon-box">
                <i className={service.iconClass}></i>
              </div>
              <h3>{service.title}</h3>
              <span>{service.number}</span>
              <p>{service.description}</p>
              <ul className="metrics">
                {service.metrics.map((metric, idx) => (
                  <li key={idx}>{metric}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


    
     {/* About Us Section */}

     <section className="dashboard-section">
      <div className="text-content">
      <h2 className="title">
      More than <span className="green-text"><strong>Dashboard</strong></span> for Enhanced Insights



        </h2>      
          <p class="text-green">Transform the way your organization tracks and enhances performance with our innovative Dashboard! Dive deep into data analysis and visualization, turning numbers into compelling stories that drive informed decision-making and inspire growth.</p>

        <ul>
          <li>Easy data upload and integration</li>
          <li>Advanced ESG metrics analysis</li>
          <li>Custom visualization tools</li>
          <li>Real-time performance tracking</li>
        </ul>
      </div>
      <div className="image-content">
      <img src={imgLong5} alt="Dashboard preview" />
      </div>
    </section>

{/* ESG Section */}
<section>
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-4 mb-md-4">
        <h3>Environmental</h3>
        <ol className="esg-metrics">
          <li><img src={esgIcon} alt="Climate & Energy Icon" /> Climate & Energy</li>
          <li><img src={esgIcon} alt="GHG Emissions Icon" /> GHG Emissions</li>
          <li><img src={esgIcon} alt="Water Icon" /> Water</li>
          <li><img src={esgIcon} alt="Materials & Waste Icon" /> Materials & Waste</li>
          <li><img src={esgIcon} alt="Biodiversity Icon" /> Biodiversity</li>
          <li><img src={esgIcon} alt="Air Emissions Icon" /> Air Emissions</li>
        </ol>
      </div>
      <div className="col-md-4 mb-4 mb-md-4">
        <h3>Social</h3>
        <ol className="esg-metrics">
          <li><img src={esgIcon} alt="Health & Safety Icon" /> Health & Safety</li>
          <li><img src={esgIcon} alt="Diversity, Equity & Inclusion Icon" /> Diversity, Equity & Inclusion</li>
          <li><img src={esgIcon} alt="Communities Icon" /> Communities</li>
          <li><img src={esgIcon} alt="Labor Icon" /> Labor</li>
          <li><img src={esgIcon} alt="Product Marketing & Labeling Icon" /> Product Marketing & Labeling</li>
        </ol>
      </div>
      <div className="col-md-4 mb-4 mb-md-4">
        <h3>Governance</h3>
        <ol className="esg-metrics">
          <li><img src={esgIcon} alt="Corporate Governance Icon" /> Corporate Governance</li>
          <li><img src={esgIcon} alt="Risk Management Icon" /> Risk Management</li>
          <li><img src={esgIcon} alt="Supplier Performance Icon" /> Supplier Performance</li>
          <li><img src={esgIcon} alt="Board Diversity Icon" /> Board Diversity</li>
          <li><img src={esgIcon} alt="Ethics & Code of Conduct Icon" /> Ethics & Code of Conduct</li>
          <li><img src={esgIcon} alt="Anti-Corruption Practices Icon" /> Anti-Corruption Practices</li>
        </ol>
      </div>
    </div>
  </div>
</section>



<footer id="footer" className="footer dark-background text-light">
      
      {/* Introductory Section */}
      <div className="footer-intro text-center py-4">
        <h3>Sustainability at the Core: Discover How Our Services Drive Progress.</h3>
        <p className="sub-title">
  <span className="green-text">Your ESG Partner for a Brighter Tomorrow</span>
</p>
</div>


      {/* Top Footer Section */}
      <div class="footer-top py-5">
    <div class="container">
      <div class="row gy-4 justify-content-center">
        
      
      {/* Useful Links Section */}
      <div class="col-lg-2 col-md-3 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      {/* Resources Section */}
        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Media</a></li>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Case Study</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Frameworks</h4>
          <ul>
            <li><a href="#">ESG Reporting</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">compare</a></li>
            <li><a href="#">PCAF-Carbon Accounting</a></li>
          </ul>
        </div>

      {/* Contact Us Section */}
      <div class="col-lg-3 col-md-4 footer-column contact-box">
        <h3>Contact Us</h3>
        <form>
          <input type="text" placeholder="Your Name" class="footer-input" />
          <input type="email" placeholder="Your Email" class="footer-input" />
          <textarea placeholder="Your Message" class="footer-textarea"></textarea>
          <button type="submit" class="footer-button">Send Message</button>
        </form>
      </div>

    </div>
  </div>
</div>


      {/* Logo and About Section */}
      <div className="container text-center mb-4">
        <div className="col-lg-3 col-md-6 footer-about mx-auto">
          <a href="index.html" className="logo d-flex align-items-center mb-3 justify-content-center">
            <span className="sitename">GreenTrendz</span>
          </a>
          <p>At GreenTrendz, we strive to make sustainability the foundation of modern business practices, providing services to help businesses build a greener future.</p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom py-3">
        <div className="container d-flex justify-content-between align-items-center">
          
          {/* Left Section: Address and Contact */}
          <div className="footer-contact">
            <p>A108 Green Street</p>
            <p>New York, NY 535022</p>
            <p><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
            <p><strong>Email:</strong> <span>info@greentrendz.com</span></p>
          </div>

          {/* Center Section: Logo and Copyright */}
          <div className="text-center">
            <a href="index.html" className="logo d-flex align-items-center mb-3 justify-content-center">
              <img src={logo} alt="GreenTrendz Logo" className="logo-img me-2" height="200" width="200"/>
            </a>
            <div>© Copyright <strong><span>GreenTrendz</span></strong>. All Rights Reserved</div>
          </div>

          {/* Right Section: Social Links */}
          <div className="social-links d-flex align-items-center">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            <a href="#" className="youtube"><i className="bi bi-youtube"></i></a> {/* Added YouTube link */}
          </div>
        </div>
      </div>

    </footer>



    </div>
  );
};

export default HomePage;
