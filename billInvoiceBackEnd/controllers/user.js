


const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const dotenv = require('dotenv');

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const {
      companyName,
      companyPhone,
      companyEmail,
      password,
      gstin
    } = req.body;

    // Validate required fields
    if (!companyName || !companyPhone || !companyEmail || !password || !gstin) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      });
    }

    // Validate email format
    if (!validator.isEmail(companyEmail)) {
      return res.status(400).json({
        message: 'Email is not valid'
      });
    }

    // Validate phone number
    if (companyPhone.length < 10 || !validator.isMobilePhone(companyPhone)) {
      return res.status(400).json({
        message: 'Phone number must be at least 10 digits'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      });
    }

    // Check for existing user
    const userExists = await User.findOne({
      companyEmail
    });
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      companyName,
      companyPhone,
      companyEmail,
      password: hashedPassword,
      gstin,
    });

    // Return response with token
    return res.status(201).json({
      id: user._id,
      name: user.companyName,
      email: user.companyEmail,
      token: generateToken(user._id),
    });

  } catch (err) {
    console.error(err);

    // Handle duplicate key errors
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `${duplicateField} already exists`
      });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        message: messages.join(', ')
      });
    }

    // Generic server error
    res.status(500).json({
      message: 'Server error'
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    // Optional: Handle logout logic if needed
    return res.status(200).json({
      message: 'User logged out successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// GET USER
const getUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    return res.json({
      message: 'User found',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        gstNumber: user.gstNumber,
        businessName: user.businessName,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d', // optional: token expiration
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};