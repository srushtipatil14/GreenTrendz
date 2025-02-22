const nodemailer = require('nodemailer');
require('dotenv').config();  // Ensure this is present if you're using .env files

console.log('Email User:', process.env.EMAIL_USER);
console.log('App Password:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Gmail address from .env
        pass: process.env.EMAIL_PASS,  // App password from .env
    },
    tls: {
        rejectUnauthorized: false,  // Helps with some security issues, consider removing in production
    },
});

const sendOtpEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,  // sender's address
            to: email,  // recipient's address
            subject: 'Your OTP for Registration',  // subject line
            text: `Your OTP for email verification is: ${otp}. Please use this OTP to verify your account.`,  // plain text body
            html: `<h4>Your OTP for email verification is:</h4><h1>${otp}</h1><p>Please use this OTP to verify your account.</p>`,  // html body
        });
        
        console.log('OTP email sent successfully!');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

module.exports = sendOtpEmail;
