import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import FileUploads from './components/FileUploads';
import Account from './components/account';
import Comparison from './components/Comparison';
import CarbonCalculator from './components/calculator';
import HelpSupport from './components/help';
import Setting from './components/settings';
import Reports from './components/Reports';



// Import Vendor CSS Files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'glightbox/dist/css/glightbox.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Default homepage */}
      <Route path="/land" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<FileUploads />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/account" element={<Account />} />
      <Route path="/comparison" element={<Comparison />} />
      <Route path="/calculator" element={<CarbonCalculator />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/help" element={<HelpSupport />} />
      <Route path="/reports" element={<Reports />} />

    </Routes>
  </div>
  
  );
}

export default App;
