const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () => crypto.randomUUID()
  },
  companyName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: false, // Make password optional by default
    minLength: 8,
    select: false,
    
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  otp: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  industrySector: {
    type: String,
    default: 'Not specified',
    trim: true
  },
  location: {
    type: String,
    default: 'Not specified',
    trim: true
  },
  userType: {
    type: String,
    enum: ['employee', 'admin'],
    default: 'employee'
  },
  acceptedTerms: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, { 
  timestamps: true,
  toJSON: { transform: function(doc, ret) {
    delete ret.password;
    delete ret.otp;
    delete ret.__v;
    return ret;
  }}
});

userSchema.methods = {
 

  generateOtp: function() {
    const otp = crypto.randomInt(100000, 999999).toString();
    this.otp = crypto.createHash('sha256').update(otp).digest('hex');
    this.otpExpiry = Date.now() + 10 * 60 * 1000;
    return otp;
  },

  verifyOtp: function(enteredOtp) {
    const hashedOtp = crypto.createHash('sha256').update(enteredOtp).digest('hex');
    return this.otp && 
           this.otp === hashedOtp && 
           Date.now() < this.otpExpiry;
  },

  createPasswordResetToken: function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  },

  clearOtp: function() {
    this.otp = undefined;
    this.otpExpiry = undefined;
  }
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;