const express = require('express');
const User = require('../models/user'); 
const ESGData = require('../models/esgData');  // Use the correct casing
 // Adjust the path to your User model

const connectDB = require('../config/db');
const axios = require('axios');
const bcrypt = require('bcrypt');
const sendOtpEmail = require('../utils/sendOtpEmail');
const otpGenerator = require('otp-generator');  // Import OTP Generator
const crypto = require('crypto');
const { promisify } = require('util');
require('dotenv').config();
const uploadDir = './uploads'; // Ensure the folder exists and is writable
const Grid = require('gridfs-stream');
const csvParser = require('csv-parser');
const stream = require('stream');
const router = express.Router();  // Correctly initialize a router
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Directory where uploaded reports will be saved
const reportsDirectory = path.join(__dirname, '../uploads');
if (!fs.existsSync(reportsDirectory)) {
    fs.mkdirSync(reportsDirectory, { recursive: true });
}
router.get('/favicon.ico', (req, res) => {
    res.status(204); // Handle favicon request
  });
  

// JWT Authentication Middleware
// JWT Authentication Middleware
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach user ID to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

// Function to Call Python Flask Service for NLP Analysis
async function analyzeTextWithPythonService(text) {
    try {
        const response = await axios.post('http://localhost:5003/analyze-text', { text });
        return response.data;
    } catch (error) {
        console.error('Error calling Python service:', error);
        throw error;
    }
}

// Use timing-safe comparison
const timingSafeEqual = promisify(crypto.timingSafeEqual);

const generateHashedOtp = () => {
    const otp = otpGenerator.generate(6, { 
        digits: true, 
        upperCase: false, 
        specialChars: false, 
        alphabets: false 
    });
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    return { otp, hashedOtp };
};


router.post('/signup/init', async (req, res) => {
  const { email, companyName } = req.body;

  if (!companyName || !email) {
    return res.status(400).json({ message: 'Company name and email are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isEmailVerified) {
        // Generate new OTP for unverified account
        const { otp, hashedOtp } = generateHashedOtp();
        existingUser.otp = hashedOtp;
        existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;
        await existingUser.save();
        await sendOtpEmail(email, otp);
        return res.status(200).json({ 
          message: 'OTP resent. Please verify your email.' 
        });
      }
      return res.status(400).json({ 
        message: 'This email is already registered and verified.' 
      });
    }

    const { otp, hashedOtp } = generateHashedOtp();
    const newUser = new User({
      companyName,
      email,
      otp: hashedOtp,
      otpExpiry: Date.now() + 10 * 60 * 1000
    });

    await newUser.save();
    await sendOtpEmail(email, otp);

    res.status(201).json({ 
      message: 'Account created. Please verify your email via OTP.' 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed.' });
  }
});


// Route: Verify OTP for Email Verification
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        const user = await User.findOne({ email }).select('+otp +otpExpiry');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the entered OTP and compare
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        if (user.otp !== hashedOtp || Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // OTP is valid, mark email as verified and clear OTP
        user.isEmailVerified = true;
        user.clearOtp(); // Clears OTP and expiry
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Verification failed.' });
    }
});

// Route: Complete User Signup (after OTP verification)
router.post('/signup/complete', async (req, res) => {
  const { email, password, industrySector, location, userType, acceptedTerms } = req.body;

  if (!email || !password || !industrySector || !location || !userType || acceptedTerms === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please verify OTP first.' });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: 'Please verify your email first.' });
    }
 // Directly assign the plain-text password (Mongoose pre-save hook will hash it)
 user.password = password;
 user.industrySector = industrySector;
 user.location = location;
 user.userType = userType;
 user.acceptedTerms = acceptedTerms;

    await user.save();

    res.status(201).json({ 
      message: 'Signup successful. Redirecting to landing page.',
      redirectUrl: '/land' // Replace with your actual landing page URL
    });
  } catch (error) {
    console.error('Error during signup completion:', error);
    res.status(500).json({ message: 'Signup failed.' });
  }
});


// POST: /api/login - User login
// Backend route with debugging - auth.js or similar
// Login route with JWT token generation

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      console.log('🔹 Incoming login request for:', email);
      console.log('🔹 Password received:', password ? '****' : 'No password provided'); // Hide actual password for security

      // Find the user by email and explicitly fetch the password field
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
          console.log('❌ User not found for email:', email);
          return res.status(404).json({ message: 'Invalid email or password' });
      }

      console.log('✅ User found:', { userId: user.userId, email: user.email });
      console.log('🔹 Hashed password in DB:', user.password);

      // Ensure password is present before comparing
      if (!user.password) {
          console.log('❌ No password stored for this user:', email);
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('🔹 Password match result:', isMatch);

      if (!isMatch) {
          console.log('❌ Invalid password for user:', user.email);
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, userId: user.userId, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      console.log('✅ Generated token for user:', {
        userId: user.userId,
        userEmail: user.email
      });

      // Send the response with the token and user data
      res.json({
          token,
          user: { 
            id: user._id, 
            userId: user.userId,
            email: user.email 
          },
      });
  } catch (error) {
      console.error('🚨 Login error:', error.message); 
      res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// Logout endpoint
router.post('/logout', authMiddleware, (req, res) => {
  try {
      const userId = req.userId; // Fetch user_id from the token

      // Optionally, you can invalidate the token here (e.g., by adding it to a blacklist)
      // For simplicity, we'll just log the event and send a success response.

      res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Logout failed.' });
  }
});

// Multer setup for file uploads

// Save ESG Data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Save ESG Data
router.post('/save-esg-data', authMiddleware, upload.fields([{ name: 'csvFile' }, { name: 'logoFile' }]), async (req, res) => {
  try {
      const { environmental, social, governance, startDate, endDate } = req.body;
      const userId = req.userId; // Get user ID from the token

      // Parse JSON data
      let parsedEnvironmental, parsedSocial, parsedGovernance;
      try {
          parsedEnvironmental = JSON.parse(environmental);
          parsedSocial = JSON.parse(social);
          parsedGovernance = JSON.parse(governance);
      } catch (error) {
          return res.status(400).json({ message: 'Invalid JSON data in request body.' });
      }

      // Handle CSV file upload
      let csvFileData = [];
      if (req.files && req.files.csvFile) {
          const csvFile = req.files.csvFile[0];
          const csvData = csvFile.buffer.toString('utf8');
          const parsedCsv = Papa.parse(csvData, { header: true });
          csvFileData = parsedCsv.data;
      }

      // Handle logo file upload
      let logoFileUrl = '';
      if (req.files && req.files.logoFile) {
          const logoFile = req.files.logoFile[0];
          const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
          if (!allowedTypes.includes(logoFile.mimetype)) {
              return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, and SVG are allowed.' });
          }

          const uniqueFilename = `${Date.now()}-${logoFile.originalname}`;
          logoFileUrl = `/uploads/${uniqueFilename}`;
          fs.writeFileSync(`./uploads/${uniqueFilename}`, logoFile.buffer);
      }

      // Save or update ESG data
      const filter = { user_id: mongoose.Types.ObjectId(userId) };
      const update = {
          environmental: parsedEnvironmental,
          social: parsedSocial,
          governance: parsedGovernance,
          dataImport: { startDate, endDate },
          csvFile: { filename: req.files.csvFile ? req.files.csvFile[0].originalname : '', data: csvFileData },
          logoFile: { filename: req.files.logoFile ? req.files.logoFile[0].originalname : '', url: logoFileUrl },
      };
      const options = { upsert: true, new: true };

      const savedData = await ESGData.findOneAndUpdate(filter, update, options);
      res.status(201).json({ message: 'ESG data saved successfully!', data: savedData });
  } catch (error) {
      console.error('Error saving ESG data:', error);
      res.status(500).json({ message: 'Failed to save ESG data.' });
  }
});
// Get ESG Data by User ID
router.get('/get-esg-data/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        const esgData = await ESGData.find({ user_id: mongoose.Types.ObjectId(user_id) });

        if (!esgData || esgData.length === 0) {
            return res.status(404).json({ message: 'No ESG data found for this user.' });
        }

        res.status(200).json(esgData);
    } catch (error) {
        console.error('Error fetching ESG data:', error);
        res.status(500).json({ message: 'Failed to fetch ESG data.' });
    }
});


  module.exports = router;
  