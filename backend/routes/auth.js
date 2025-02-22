const express = require('express');
const router = express.Router();
const User = require('./models/user');
const sendEmail = require('../utils/emailUtils');
const crypto = require('crypto');

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save user with OTP
        const newUser = new User({
            email,
            password,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
        });
        await newUser.save();

        // Send OTP to email
        await sendEmail(email, `Your OTP is ${otp}`, 'Email Verification');

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error });
    }
});

// OTP Verification route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = null; // Clear OTP
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
});

module.exports = router;
