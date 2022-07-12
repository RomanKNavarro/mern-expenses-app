const express = require('express')
const colors = require('colors')    
const dotenv = require('dotenv').config() 
const {errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')    // func makes it possible to connect to database.
const port = process.env.PORT || 5000 

connectDB()

const app = express()   

app.use(express.json())                         // this middleware allows us to use body data.
app.use(express.urlencoded({extended: false}))  

// here is another route. IMPORTANT: THIS GETS ALL THE GOAL ROUTES FROM GOALROUTES.JS
app.use('/api/goals', require('./routes/goalRoutes'))
 app.use('/api/users', require('./routes/userRoutes'))  

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))  
