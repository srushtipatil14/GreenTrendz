import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import GreenTrendz from '../assets/img/logo_1.png';

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '25px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '26px',
        fontWeight: 'bold',
    },
    introText: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#28a745',
        fontSize: '16px',
        fontStyle: 'italic',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        display: 'block',
        color: '#444',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#28a745',
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#218838',
    },
    newUserText: {
        textAlign: 'center',
        marginTop: '20px',
        color: '#555',
        fontSize: '14px',
    },
    link: {
        color: '#28a745',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#218838',
    },
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // React Router hook for navigation
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
      
        try {
          console.log('Attempting login with email:', email);
          
          const response = await fetch('http://localhost:5003/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email.trim(),
              password: password
            }),
          });
          
          console.log('Response status:', response.status);
          const data = await response.json();
          console.log('Response data:', {
            status: response.status,
            message: data.message
          });
          
          if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            navigate('/land');
            setUserId(user.id);

            console.log('Login successful. User ID:', user.id);
          } else {
            setError(data.message || 'Login failed. Please try again.');
            // Clear password on error
            setPassword('');
          }
        } catch (err) {
          console.error('Login error:', err);
          setError('Network error. Please try again later.');
        } finally {
          setIsLoading(false);
        }

        
    };
    

    return (
        <div>
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
                                <Nav.Link href="#services" className="nav-link-enhanced">
                                    Services
                                </Nav.Link>
                                <Nav.Link href="#about" className="nav-link-enhanced">
                                    About Us
                                </Nav.Link>
                                <Nav.Link href="#contact" className="nav-link-enhanced">
                                    Contact
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <div style={styles.container}>
                <h1 style={styles.title}>Login</h1>
                <p style={styles.introText}>
                    Welcome back! Please enter your login details below to access your account.
                </p>
                <form style={styles.form} onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                    >
                        Login
                    </button>
                </form>
                <p style={styles.newUserText}>
                    New user? <a href="/SignUp" style={styles.link}>Create an account</a>
                </p>
            </div>

            

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


export default LoginPage;