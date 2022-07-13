const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')       
const User = require('../models/userModel.js')   

// @desc                        Register new user.
// @route   POST /api/users    (the method to get users)
// @access Public            Obviously public b/c you can't access a protected route without being logged in
const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body  
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const userExists = await User.findOne({email})  
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)  
  const hashedPassword = await bcrypt.hash(password, salt) 

  const user = await User.create({  
    name,
    email,
    password: hashedPassword      

  })

  if (user) {                   
    res.status(201).json({      
      _id:  user.id,             
      name: user.name,
      email: user.email,
      token: generateToken(user._id)  
    })   
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc                       Authenticate a new user
// @route   POST /api/users/login    
// @access Public 
const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body          
  const user = await User.findOne({email})    

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({          
      _id:  user.id,             
      name: user.name,
      email: user.email,
      token: generateToken(user._id)  
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')    
  }
})

// @desc                         get user data
// @route   GET /api/users/me    get the info for the current user. We send the token and get id from that token
// @access Private               make this private for when authenticating
const getMe = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)			// send back all the user's info. No need to find him again.
})

const generateToken = (id) => {    
  return jwt.sign({ id }, process.env.JWT_SECRET, {   
    expiresIn:'30d',    
  }) 
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

// // @desc    Register new user
// // @route   POST /api/users
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body

//   if (!name || !email || !password) {
//     res.status(400)
//     throw new Error('Please add all fields')
//   }

//   // Check if user exists
//   const userExists = await User.findOne({ email })

//   if (userExists) {
//     res.status(400)
//     throw new Error('User already exists')
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)

//   // Create user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   })

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid user data')
//   }
// })

// // @desc    Authenticate a user
// // @route   POST /api/users/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   // Check for user email
//   const user = await User.findOne({ email })

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid credentials')
//   }
// })

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user)
// })

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })
// }

// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
// }
