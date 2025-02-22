import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  FileText,
  BarChart2,
  Calculator,
  Settings,
  UserCircle,
  HelpCircle,
  CloudUpload,
} from 'lucide-react';
import GreenTrendz from '../assets/img/logo_1.png';

const styles = {
  dashboardPage: {
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
};

const menuItems = [
  { icon: Home, label: 'Home', path: '/land' },
  { icon: CloudUpload, label: 'Data Upload', path: '/upload' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: BarChart2, label: 'Comparison', path: '/comparison' },
  { icon: Calculator, label: 'Carbon Calculator', path: '/calculator' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: UserCircle, label: 'Account', path: '/account' },
];

const Dashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    navigate('/'); // Redirect to home
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={styles.dashboardPage}>
      {/* Sidebar */}
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

      {/* Main Content */}
      <div
        style={{
          ...styles.content,
          marginLeft: isCollapsed ? '80px' : '250px', // Adjust margin based on sidebar state
        }}
      >
        <h1>Welcome to Settings</h1>
        <p>This is the main content area.</p>
        {/* Add your main content here */}
      </div>

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
    </div>
  );
};

export default Dashboard;