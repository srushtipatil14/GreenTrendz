const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Router = require("./routes/esgRoutes");
const morgan = require('morgan');
require("dotenv").config();
const User = require('./models/user');  // Your User model

const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5003; // Use environment variable for port

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use('/api', Router);
app.use(fileUpload());

app.use(express.static('uploads'));
app.use(morgan('dev')); // Optional: Log HTTP requests

 // Serve uploaded files statically
// Connect to the database
connectDB();


// Routes
// API endpoint to fetch data
app.get('/api/esgdata', async (req, res) => {
  try {
    const data = await ESGData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
