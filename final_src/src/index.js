import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this is 'react-dom/client' for React 18+
import './index.css'; // Your global styles
import App from './App'; // Correct path
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Correct root element for React 18+
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
