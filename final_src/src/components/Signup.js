import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap'; // Ensure Modal is imported
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import GreenTrendz from '../assets/img/logo_1.png';

// Centralized Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5003/api',  // Adjust the URL if your server is on a different port
});


const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);  // Track if OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industrySector, setIndustrySector] = useState('');
  const [userType, setUserType] = useState('employee'); // Default user type
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [canAcceptTerms, setCanAcceptTerms] = useState(false); // Track if terms can be accepted
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^*_$!%?&#])[A-Za-z\d@$!%*_?&#]{8,}$/;  

  const [location, setLocation] = useState('');
  const citySuggestions = [
    "Agartala", "Agra", "Ahmedabad", "Aizawl", "Aligarh", "Allahabad", "Amritsar", "Aurangabad",
    "Bangalore", "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Chandigarh", "Chennai", 
    "Coimbatore", "Cuttack", "Dhanbad", "Dibrugarh", "Faridabad", "Gandhinagar", "Gangtok", 
    "Gaya", "Ghaziabad", "Gurgaon", "Guwahati", "Haridwar", "Hubli", "Hyderabad", "Imphal", 
    "Indore", "Jabalpur", "Jaipur", "Jammu", "Jamshedpur", "Jodhpur", "Kanpur", "Kochi", 
    "Kolkata", "Kolhapur", "Lucknow", "Ludhiana", "Madurai", "Mangalore", "Meerut", "Moradabad", 
    "Mumbai", "Muzaffarpur", "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Noida", "Patna", 
    "Pune", "Raipur", "Rajkot", "Ranchi", "Rohtak", "Siliguri", "Surat", "Thiruvananthapuram", 
    "Tiruchirappalli", "Tirupati", "Udaipur", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam", 
    "Warangal", "Zirakpur", "Agraharam", "Ahmednagar", "Ajmer", "Alappuzha", "Ambala", 
    "Amravati", "Anand", "Anantapur", "Angul", "Asansol", "Ayodhya", "Bagalkot", 
    "Baran", "Bardhaman", "Bareilly", "Baripada", "Barwani", "Basti", "Begusarai", "Bellary", 
    "Berhampur", "Bharuch", "Bhavnagar", "Bhilai", "Bokaro", "Chandrapur", "Chhindwara", 
    "Chidambaram", "Chikmagalur", "Chinchwad", "Darbhanga", "Davanagere", "Dehradun", "Dindigul", 
    "Durgapur", "Erode", "Gadag", "Gwalior", "Hubli", "Kota", "Kottayam", "Mysore", 
    "Nagapattinam", "Nagercoil", "Patiala", "Pondicherry", "Thane", "Bihar Sharif", "Bhubaneshwar", 
    "Bongaigaon", "Cooch Behar", "Tirunelveli", "Kollam", "Shivamogga", "Jhansi", "Saharanpur", 
    "Alwar", "Satna", "Shimla", "Shillong", "Kohima", "Dimapur", "Adoor", "Nandyal", 
    "Tenali", "Rajahmundry", "Karimnagar", "Eluru", "Kadapa", "Ongole", "Nellore", "Proddatur", 
    "Kurnool", "Tadepalligudem", "Machilipatnam", "Vizianagaram", "Kakinada", "Chittoor", 
    "Haldwani", "Rudrapur", "Rishikesh", "Banswara", "Pali", "Bhilwara", "Tonk", "Sikar", 
    "Bharatpur", "Sawai Madhopur", "Jhunjhunu", "Ballia", "Bulandshahr", "Etawah", "Mainpuri", 
    "Farrukhabad", "Unnao", "Bahraich", "Barabanki", "Sultanpur", "Gonda", "Banda", "Hamirpur", 
    "Chitrakoot", "Hardoi"
  ];
  
  const handleCityInputChange = (e) => {
    setLocation(e.target.value);  // Update the location based on user input
  };

   // Handle sending OTP
const handleSendOtp = async () => {
  try {
    const response = await api.post('/signup/init', { email, companyName });
    if (response.data.message) {
      alert('OTP sent to your email!');
      setOtpVerified(false); // Reset OTP verification state
    }
  } catch (error) {
    alert(`Error sending OTP: ${error.response?.data?.message || error.message}`);
  }
};

// Handle OTP verification
const handleOtpVerification = async () => {
  if (!email) {
    alert('Email is required for OTP verification');
    return;
  }

  if (!emailOtp) {
    alert('OTP is required');
    return;
  }

  try {
    const response = await api.post('/verify-otp', { email, otp: emailOtp });
    if (response.data.message) {
      setOtpVerified(true);
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP');
    }
  } catch (error) {
    alert(`Error verifying OTP: ${error.response?.data?.message || error.message}`);
  }
};


  // Handle Signup completion after OTP verification
// Handle Signup completion after OTP verification
const handleSignup = async (e) => {
  e.preventDefault();

  if (!passwordRegex.test(password)) {
    alert('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (!acceptedTerms) {
    alert('You must accept the terms and conditions!');
    return;
  }

  if (!otpVerified) {
    alert('Please verify your email with OTP!');
    return;
  }

  try {
    const response = await api.post('/signup/complete', {
      email,
      password,
      companyName,
      industrySector,
      location,
      userType,
      acceptedTerms,
    });

    if (response.data.message) {
      alert('Signup successful!');
      navigate('/land');

      // Replace history state to prevent going back to login page
    window.history.replaceState(null, '', '/land');
    } else {
      alert('Signup failed: ' + (response.data.message || 'Unknown error'));
    }
  } catch (error) {
    alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
  }
};

  // Modal handling for terms and conditions
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleTermsConfirmation = (accepted) => {
    if (accepted) {
      setCanAcceptTerms(true);
    } else {
      setCanAcceptTerms(false);
    }
    setShowModal(false);
  };

  // Handle the initial signup step (sending companyName and email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch('http://localhost:5003/api/signup/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          email,
        }),
      });
      

      const data = await response.json();
      console.log(data);
      if (data.message) {
        alert('Signup initialization successful. Please check your email for OTP!');
        // Proceed to OTP verification
      } else {
        alert('Error in signup initialization');
      }
    } catch (error) {
      console.error('Error initializing signup:', error);
      alert('Error initializing signup');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9', // Softer background color
      padding: '20px',
    },
    box: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow
      padding: '30px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '26px', // Slightly larger for prominence
      marginBottom: '15px',
      color: '#3333333', // Darker shade for contrast
      fontWeight: 'bold',
    },
    introText: {
      fontSize: '16px',
      color: '#555555', // Slightly darker for better readability
      marginBottom: '20px',
      lineHeight: '1.5',
    },
    alreadyCustomer: {
      fontSize: '14px',
      color: '#666666', // Lighter shade for subtlety
      marginBottom: '10px',
    },
    link: {
      color: '#28a745', // Blue for better contrast and standard link color
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px', // Added gap for spacing between form elements
    },
    input: {
      width: '100%',
      padding: '12px', // Increased padding for better clickability
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px',
      color: '#555555',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease', // Add box-shadow transition
    },
    inputFocus: {
      borderColor: '#007bff', // Blue border on focus
      boxShadow: '0 0 8px rgba(0, 123, 255, 0.25)', // Glow effect
    },
    otpInput: {
      width: '70%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px',
      color: '#555555',
      textAlign: 'center',
    },
    otpButton: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '100%',
      padding: '14px', // Slightly larger for prominence
      backgroundColor: '#28a745',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#218838',
      transform: 'scale(1.05)', // Slight zoom effect
    },
    greyButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#e0e0e0', // Softer grey
      color: '#888888',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'not-allowed',
      fontWeight: '600',
    },
    select: {
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px',
      color: '#555555',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    checkbox: {
      transform: 'scale(1.2)', // Slightly larger for visibility
      cursor: 'pointer',
    },

    cancelbutton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d', // Bootstrap grey
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
    cancelbuttonHover: {
      backgroundColor: '#5a6268', // Darker grey on hover
    },
  };
  

  return (
    <div>
      {/* Navbar */}
      <header>
        <Navbar bg="light" expand="lg" className="shadow-sm py-3 custom-navbar">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
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
                <Button variant="success" href="/" className="mx-2 btn-sign" style={styles.link}>
                  Back
                </Button>
                <Nav.Link href="#services" className="nav-link-enhanced">Services</Nav.Link>
                <Nav.Link href="#about" className="nav-link-enhanced">About Us</Nav.Link>
                <Nav.Link href="#contact" className="nav-link-enhanced">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <div style={styles.container}>
  <div style={styles.box}>
    <h2 style={styles.heading}>Sign Up</h2>
    <p style={styles.introText}>
      Join us today! Fill in the details below to create your account and start generating ESG reports effortlessly.
    </p>
    <p style={styles.alreadyCustomer}>
      Already a customer? <a href="/login" style={styles.link}>Log in here</a>.
    </p>
    <form style={styles.form} onSubmit={handleSignup}>
      {/* Company Name and Email */}
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={styles.input}
        maxLength={50}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        maxLength={50}
        required
      />

      {/* Email OTP Verification */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
          style={styles.otpInput}
          maxLength={6}
          disabled={otpVerified}
        />
        <button
          type="button"
          style={styles.smallButton}
          onClick={handleSendOtp}
          disabled={otpSent}
        >
          Send OTP
        </button>
        <button
          type="button"
          style={styles.smallButton}
          onClick={handleOtpVerification}
          disabled={otpSent && otpVerified}
        >
          Verify OTP
        </button>
      </div>

      {/* Password Inputs */}
      {otpVerified && (
        <>
          <input
            type="password"
            placeholder="Password (At least 8 characters, including uppercase, lowercase, and a symbol)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            minLength={8}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
          <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
            {password !== confirmPassword && confirmPassword !== '' ? 'Passwords do not match!' : ''}
          </div>
        </>
      )}

      {/* Industry Sector Select */}
      {otpVerified && (
        <select
          value={industrySector}
          onChange={(e) => setIndustrySector(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>Select Industry Sector</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Finance">Finance</option>
          <option value="Technology">Technology</option>
        </select>
      )}

      {/* Location Input with City Suggestions */}
      {otpVerified && (
        <input
          type="text"
          placeholder="Location (City)"
          value={location}
          onChange={handleCityInputChange}
          style={styles.input}
          list="city-suggestions"
        />
      )}
      {otpVerified && (
        <datalist id="city-suggestions">
          {citySuggestions.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      )}

      {/* User Type Selection */}
      {otpVerified && (
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={styles.select}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      )}

      {/* Terms and Conditions */}
      <div style={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="terms"
          style={styles.checkbox}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
        />
        <label htmlFor="terms">
          I accept the <a onClick={handleShowModal} style={{ cursor: 'pointer', color: '#28a745' }}>Terms and Conditions</a>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={otpVerified && acceptedTerms ? styles.button : styles.greyButton}
        disabled={!otpVerified || !acceptedTerms}
      >
        Create Account
      </button>
    </form>
  </div>
</div>



      {/* Modal for Terms and Conditions */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Terms and Conditions Content</h5>
            <p>Put your Terms and Conditions here...</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={() => handleTermsConfirmation(false)} 
        >
          Cancel
        </Button>

          <Button 
            variant="primary" 
            onClick={() => handleTermsConfirmation(true)} 
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <footer id="footer" className="footer dark-background text-light">
                <div className="footer-intro text-center py-4">
                    <h3>Sustainability at the Core: Discover How Our Services Drive Progress.</h3>
                    <p className="sub-title">
                        <span className="green-text">Your ESG Partner for a Brighter Tomorrow</span>
                    </p>
                </div>

                <div className="footer-top py-5">
                    <div className="container">
                        <div className="row gy-4 justify-content-center">
                            <div className="col-lg-2 col-md-3 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-2 col-md-3 footer-links">
                                <h4>Resources</h4>
                                <ul>
                                    <li><a href="#">Media</a></li>
                                    <li><a href="#">Newsletter</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Case Study</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-2 col-md-3 footer-links">
                                <h4>Frameworks</h4>
                                <ul>
                                    <li><a href="#">ESG Reporting</a></li>
                                    <li><a href="#">BRSR- SEBI Framework</a></li>
                                    <li><a href="#">GRI Reporting Framework</a></li>
                                    <li><a href="#">PCAF-Carbon Accounting</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-4 footer-column contact-box">
                                <h3>Contact Us</h3>
                                <form>
                                    <input type="text" placeholder="Your Name" className="footer-input" />
                                    <input type="email" placeholder="Your Email" className="footer-input" />
                                    <textarea placeholder="Your Message" className="footer-textarea"></textarea>
                                    <button type="submit" className="footer-button">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container text-center mb-4">
                    <div className="col-lg-3 col-md-6 footer-about mx-auto">
                        <a href="index.html" className="logo d-flex align-items-center mb-3 justify-content-center">
                            <span className="sitename">GreenTrendz</span>
                        </a>
                        <p>At GreenTrendz, we strive to make sustainability the foundation of modern business practices, providing services to help businesses build a greener future.</p>
                    </div>
                </div>

                <div className="footer-bottom py-3">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="footer-contact">
                            <p>A108 Green Street</p>
                            <p>New York, NY 535022</p>
                            <p><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                            <p><strong>Email:</strong> <span>info@greentrendz.com</span></p>
                        </div>

                        <div className="text-center">
                            <a href="index.html" className="logo d-flex align-items-center mb-3 justify-content-center">
                                <img src={logo} alt="GreenTrendz Logo" className="logo-img me-2" height="150" width="150" />
                            </a>
                            <div>© Copyright <strong><span>GreenTrendz</span></strong>. All Rights Reserved</div>
                        </div>

                        <div className="social-links d-flex align-items-center">
                            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            <a href="#" className="youtube"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
  );
};

export default Signup;