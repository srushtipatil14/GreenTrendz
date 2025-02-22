import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import user profile icon
import { Route, Routes } from 'react-router-dom';
import GreenTrendz from '../assets/img/logo_1.png';

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
    logo: {
      fontSize: '25px',
      marginBottom: '30px',
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: '20px',
      transition: 'transform 0.3s ease',
    },
    logoHover: {
      transform: 'scale(1.1)',
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
      fontfamily: "'Poppins', sans-serif", // Custom font for links
          fontWeight: '500', // Optional for bold text
      },
        navItemHover: {
      backgroundColor: '#3b6b5c',
      transform: 'scale(1.05)',
    },
    navIcon: {
      marginRight: '20px',
      transition: 'transform 0.3s ease',
    },
   
      content: {
          flex: 1,
          padding: '30px',
          boxSizing: 'border-box',
          backgroundColor: '#f8f9fa', // Light gray background for a softer look
          overflowY: 'auto',
          marginLeft: '250px',
          transition: 'margin-left 0.3s ease',
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

const menuItems = [
  { icon: Home, label: 'Home', path: '/land' },
  { icon: CloudUpload, label: 'Data Upload', path: '/upload' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: BarChart2, label: 'Comparison', path: '/comparison' },
  { icon: Calculator, label: 'CarbonCalculator', path: '/calculator' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  { icon: UserCircle, label: 'Account', path: '/account' }, // Added Account item
];
const Dashboard = () => {

  return (
    <div style={styles.landingPage}>
            <nav style={styles.sidebar}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={GreenTrendz}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-top me-2"
                    />
                    <h5 style={styles.logo}>GreenTrendz</h5>
                </div>
                <ul style={styles.navList}>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <a
                                href={item.path}
                                style={styles.navItem}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#3b6b5c';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '';
                                    e.target.style.transform = '';
                                }}
                            >
                                <item.icon style={styles.navIcon} size={20} />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <button
                        style={styles.button}
                        onClick={() => setShowLogoutPopup(true)}
                    >
                        Logout
                    </button>
                </div>
            </nav>
   
    </div>
  );
};

export default Dashboard;
