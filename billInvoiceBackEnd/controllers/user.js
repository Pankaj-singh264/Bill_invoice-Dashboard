// const express = require('express');
// const UserModel = require('../model/user');
// const invoiceModel = require('../model/invoice');
// const validate = require('validator');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const createToken = (id) => {
//     return jwt.sign({
//         id
//     }, process.env.JWT_SECRET);
// }

// async function getUser(req, res) {
//     const user = await UserModel.find({});
//     return res.status(200).json(user);
// }

// async function RegisterUser(req, res) {
//     const {
//         name,
//         email,
//         password
//     } = req.body;
//     console.log(name, email, password)
//     // if (!name || !email || !password) {
//     //     return res.status(400).json({
//     //         message: 'Please fill all fields'
//     //     });
//     // }
//     const existingUser = await UserModel.findOne({
//         email
//     });
//     if (existingUser) {
//         return res.status(400).json({
//             message: 'User already exists'
//         });
//     }

//     if (password.length < 6) {
//         return res.status(400).json({
//             message: "password must be at least 8 characters"
//         })
//     }
//     if (!validate.isEmail(email)) {
//         return res.status(400).json({
//             message: "email is not valid"
//         })
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new UserModel({
//         name,
//         email,
//         password: hashedPassword
//     });
//     const user= await newUser.save();
//     const token = createToken(usere._id);
//     // Send success response with user data and token
//     return res.status(201).json({
//         success: true,
//         token,
//         user: {
//             id: user._id,
//             name: user.name,
//             email: user.email
//         }
//     });


// }
// async function logIN(req, res) {
//     const {
//         email,
//         password
//     } = req.body;
//     const user = await UserModel.findOne({
//         email
//     });
//     if (!email || !password) {
//         return res.status(400).json({
//             message: 'Please fill all fields'
//         });
//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (isMatch) {
//         const token = createToken(user._id)
//         return res.json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         })

//     }
// }
// async function logOut(req, res) {
//     const {
//         email
//     } = await UserModel.find({
//         email
//     });

//     return res.send("user logged out successfully")

// }
// async function invoiceInfo() {
//     const invoice = await invoiceModel.find({});
//     return res.status(200).json(invoice);
// }


// module.exports = {
//     getUser,
//     RegisterUser,
//     invoiceInfo,
//     logIN,
//     logOut
// };




const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, gstNumber, businessName, address } = req.body;
    console.log(username, email, password, gstNumber, businessName);

    if (!username || !email || !password || !gstNumber || !businessName) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      gstNumber,
      businessName,
      address,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: `${Object.keys(err.keyPattern)[0]} already exists`,
      });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(err.errors).map(val => val.message).join(', '),
      });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    // Optional: Handle logout logic if needed
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET USER
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // optional: token expiration
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
