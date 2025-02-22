const mongoose = require('mongoose');
require('dotenv').config();  // Load .env file for credentials

const connectDB = async () => {
  try {
    // Use the MONGO_URI from .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit the process if connection fails
  }
};

module.exports = connectDB;
