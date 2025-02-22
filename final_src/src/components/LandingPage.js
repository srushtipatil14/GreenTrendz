import backgroundImage from '../assets/img/bg2.jpg'; // Correct path to image
import GreenTrendz from '../assets/img/logo_1.png';
import latest1 from '../assets/img/bg4.jpg'; // Correct path to image
import latest2 from '../assets/img/latest.jpg'; // Correct path to image
import latest3 from '../assets/img/latest3.jpg'; // Correct path to image
import { Link } from 'react-router-dom';
import React, { useState, useEffect,useRef } from 'react';
import { useNavigate, useLocation} from 'react-router-dom'; // Corrected import
import {
  Home,
  LayoutDashboard,
  FileText,
  BarChart2,
  Calculator,
  Settings,
  UserCircle,
  HelpCircle,
  ArrowRight,
  CloudUpload,
  Trophy,
  Italic, // Added new icon for benchmarking
} from 'lucide-react';

const styles = {
  landingPage: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '250px',
    background: 'linear-gradient(to bottom right, #064e3b, #276749)',
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'fixed',
    height: '100vh',
    zIndex: 10,
    boxShadow: '2px 0 15px rgba(0, 0, 0, 0.15)',
    transition: 'width 0.3s ease',
  },
  sidebarCollapsed: {
    width: '80px', // Collapsed width
  },
  logo: {
    fontSize: '25px',
    marginBottom: '30px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: '20px',
    transition: 'opacity 0.3s ease',
  },
  logoCollapsed: {
    opacity: 0, // Hide logo text when collapsed
  },
  content: {
    flex: 1,
    padding: '30px',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
    marginLeft: '250px', // Default margin for expanded sidebar
    transition: 'margin-left 0.3s ease', // Smooth transition for margin
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '8px',
    marginBottom: '12px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
  },
  navItemCollapsed: {
    justifyContent: 'center', // Center icons when collapsed
    padding: '15px', // Adjust padding for collapsed state
  },
  navIcon: {
    marginRight: '20px',
    transition: 'margin 0.3s ease, font-size 0.3s ease',
    fontSize: '20px', // Default icon size
  },
  navIconCollapsed: {
    marginRight: '0', // Remove margin when collapsed
    fontSize: '24px', // Increase icon size when collapsed
  },
  navLabel: {
    transition: 'opacity 0.3s ease',
  },
  navLabelCollapsed: {
    display: 'none', // Hide labels when collapsed
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    color: '#064e3b',
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    width: '80%',
    marginBottom: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logoutButtonCollapsed: {
    width: 'auto', // Adjust width when collapsed
    padding: '12px',
  },
  toggleButton: {
    backgroundColor: '#3b6b5c',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '24px', // Increased font size for the toggle icon
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  },
  toggleButtonHover: {
    backgroundColor: '#4a7c6c',
    transform: 'scale(1.1)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '25px',
  },
  contentCollapsed: {
    marginLeft: '80px', // Adjusted margin for collapsed sidebar
  },
  mainSection: {
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    transition: 'box-shadow 0.3s ease',
  },
  buttonHover: {
    transform: 'scale(1.05)',
    backgroundColor: 'linear-gradient(to right, #2f855a, #22543d)', // Darker green gradient
    color: 'white',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: '#2f855a',
    padding: '12px 25px',
    borderRadius: '8px',
    border: '2px solid #2f855a',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  },
  buttonOutlineHover: {
    backgroundColor: '#2f855a',
    color: 'white',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '50px',
    fontWeight: 1000, // Use numeric font weight
    marginBottom: '10px',
    marginLeft: '90px',
    fontFamily: "'Roboto', sans-serif", // Make sure to use a font that supports 900 weight
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff', // Default background color
    color: 'Black', // Text color
    border: 'none', // No border
    padding: '10px 20px', // Padding for a nice clickable area
    borderRadius: '5px', // Rounded corners
    fontWeight: 'bold', // Bold text
    fontSize: '16px', // Font size
    cursor: 'pointer', // Pointer cursor on hover
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for a 3D effect
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition for hover effects
  },
};

// Updated Features Data
const features = [
  {
    icon: FileText,
    title: 'Automated Reporting',
    description: 'Generate comprehensive ESG reports with just a few clicks. Save time and reduce errors.',
  },
  {
    icon: BarChart2,
    title: 'Data Analytics',
    description: 'Powerful analytics tools to track and visualize your sustainability metrics.',
  },
  {
    icon: Calculator,
    title: 'Carbon Calculator',
    description: 'Accurate carbon footprint calculations based on industry standards.',
  },
  {
    icon: Trophy,
    title: 'Benchmarking',
    description: 'Compare your ESG performance against industry peers and standards.',
  },
];

// Stats Data
const stats = [
  { value: '2M+', label: 'Carbon Data Points' },
  { value: '500+', label: 'Companies' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '24/7', label: 'Support' },
];

const menuItems = [
  { icon: Home, label: 'Home', path: '/land' },
  { icon: CloudUpload, label: 'Data Upload', path: '/upload' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: BarChart2, label: 'Comparison', path: '/comparison' },
  { icon: Calculator, label: 'CarbonCalculator', path: '/calculator' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: UserCircle, label: 'Account', path: '/account' }, // Added Account item
];

const LandingPage = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [backButtonAttempts, setBackButtonAttempts] = useState(0); // Track back button attempts
  const navigate = useNavigate();
  const location = useLocation();
  const isInternalNavigation = useRef(false); // Flag to track internal navigation

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    navigate('/', { replace: true });
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleMenuItemClick = (path) => {
    isInternalNavigation.current = true; // Set flag to true for internal navigation
    navigate(path);
  };



  // Menu items
  const menuItems = [
    { icon: Home, label: 'Home', path: '/land' },
    { icon: CloudUpload, label: 'Data Upload', path: '/upload' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: BarChart2, label: 'Comparison', path: '/comparison' },
    { icon: Calculator, label: 'CarbonCalculator', path: '/calculator' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: UserCircle, label: 'Account', path: '/account' },
  ];

  return (
    
    <div style={styles.landingPage}>
      <nav
        style={{
          ...styles.sidebar,
          ...(isCollapsed && styles.sidebarCollapsed),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={GreenTrendz}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
          />
          <h5
            style={{
              ...styles.logo,
              ...(isCollapsed && styles.logoCollapsed),
            }}
          >
            GreenTrendz
          </h5>
        </div>

        {/* Toggle Button */}
        <button style={styles.toggleButton} onClick={toggleSidebar}>
          {isCollapsed ? '»' : '«'}
        </button>

        <ul style={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                style={{
                  ...styles.navItem,
                  ...(isCollapsed && styles.navItemCollapsed),
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b6b5c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '';
                  e.target.style.transform = '';
                }}
              >
                <item.icon
                  style={{
                    ...styles.navIcon,
                    ...(isCollapsed && styles.navIconCollapsed),
                  }}
                  size={20}
                />
                <span
                  style={{
                    ...styles.navLabel,
                    ...(isCollapsed && styles.navLabelCollapsed),
                  }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px 20px',
          }}
        >
          <button
            style={{
              ...styles.logoutButton,
              ...(isCollapsed && styles.logoutButtonCollapsed),
            }}
            onClick={handleLogout}
          >
            <Settings size={18} />
            {!isCollapsed && 'Logout'}
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div style={styles.modalButtons}>
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button onClick={confirmLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        style={{
          ...styles.content,
          ...(isCollapsed && styles.contentCollapsed),
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',  // Makes sure the image covers the entire div
            backgroundPosition: 'center', // Center the image
            padding: '60px 0',
            minHeight: '350px',
            color: 'white',
            textAlign: 'left',
            borderRadius: '20px',  // Adding rounded corners to the image
            overflow: 'hidden',
          }}
        >
          <div>
            {/* Google Fonts link */}
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700;900&display=swap"
              rel="stylesheet"
            />
            <h1 style={styles.header}>Transform Your ESG Reporting Process</h1>
          </div>

          <p
            style={{
              fontSize: '18px',
              marginBottom: '20px',
              lineHeight: '1.6', // Improves readability with proper line spacing
              color: '#cffad4', // Soft gray for text color
              marginLeft: '90px',
              fontFamily: 'Arial, sans-serif',
              marginRight: '30%',
              fontStyle: 'Italic',
            }}
          >
            Generate comprehensive ESG reports, track sustainability metrics, and make data-driven decisions with our powerful platform.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                to="/upload"
                style={{
                  textDecoration: 'none',
                }}
              >
                <button
                  style={{
                    backgroundColor: '#fff',
                    color: '#276749',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginLeft: '90px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#276749';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#276749';
                  }}
                >
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
            </div>

            <button
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: '1px solid #fff',
                fontWeight: 'bold',
                cursor: 'pointer', // Makes it clickable
                transition: 'all 0.3s ease', // Smooth transition for hover effects
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fff'; // Hover background color
                e.target.style.color = '#276749'; // Hover text color
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'; // Reset background color
                e.target.style.color = '#fff'; // Reset text color
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Section */}
        <section style={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: 'green' }}>
            Key Features
          </h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  flex: '1 1 calc(25% - 20px)', // Ensures cards are in one row and take equal space
                  backgroundColor: '#ffffff',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                }}
              >
                <feature.icon size={40} style={{ marginBottom: '15px', color: '#2C7A7B' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#4A5568' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics Section */}
        <section style={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '20px',
              backgroundColor: '#E6F9E9',
              borderRadius: '12px',
              marginBottom: '40px',
            }}
          >
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C7A7B' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#4A5568' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Latest Insights Section */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px' }}>
            Latest ESG Insights
          </h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
            {/* Insight Card 1 */}
            <div
              style={{
                flex: '1',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={latest1}
                alt="2024 ESG Reporting Trends"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  <a
                    href="https://www.thecorporategovernanceinstitute.com/insights/guides/10-esg-trends-to-watch/?srsltid=AfmBOoo6WYsWNluIXYRWVrOosX1qTqUajl65IxEL0k2-TVqwi5-MIhPE"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    2024 ESG Reporting Trends
                  </a>
                </h3>
                <p style={{ fontSize: '14px', color: '#4A5568' }}>
                  Latest insights on ESG reporting requirements and best practices.
                </p>
              </div>
            </div>

            {/* Insight Card 2 */}
            <div
              style={{
                flex: '1',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={latest2}
                alt="Carbon Reduction Strategies"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  <a
                    href="https://www.hmel.in/blog/india-steps-towards-net-zero-emissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Carbon Reduction Strategies
                  </a>
                </h3>
                <p style={{ fontSize: '14px', color: '#4A5568' }}>
                  Effective strategies for reducing your carbon footprint.
                </p>
              </div>
            </div>

            {/* Insight Card 3 */}
            <div
              style={{
                flex: '1',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={latest3}
                alt="Tech-Driven Sustainability"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  <a
                    href="https://netzero-events.com/tech-driven-sustainability-leveraging-innovation-for-environmental-goals/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Tech-Driven Sustainability
                  </a>
                </h3>
                <p style={{ fontSize: '14px', color: '#4A5568' }}>
                  How technology is revolutionizing ESG reporting.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;