const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')   

// THESE ARE THE ROUTES THEMSELVES.
// '/' refers to '/api/users', as seen in:
// app.use('/api/users', require('./routes/userRoutes')) in server.js

// these pretty much dictate which route to post/get at and what func to use. 
router.post('/', registerUser)    
router.post('/login', loginUser)  
router.get('/me', protect, getMe)     

module.exports = router 

// const express = require('express')
// const router = express.Router()
// const {
//   registerUser,
//   loginUser,
//   getMe,
// } = require('../controllers/userController')
// const { protect } = require('../middleware/authMiddleware')

// router.post('/', registerUser)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)

// module.exports = router