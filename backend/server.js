const path = require('path')          // part of deployment preparation. 
const express = require('express')
const {errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')    // func makes it possible to connect to database.
const port = process.env.PORT || 8080

connectDB()

const app = express()   

app.use(express.json())                         // this middleware allows us to use body data.
app.use(express.urlencoded({extended: false}))  

// here is another route. IMPORTANT: THIS GETS ALL THE GOAL ROUTES FROM GOALROUTES.JS
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))  

// SERVE FRONTEND
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));     // __dirname is current directory
  /*
  what does this do? 
  express.static is what we use to create our static folder. __dirname is the current directory (backend). We set 
  our build folder to be in the frontend. This is where react will build out the static assets. 
 */

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'))
  })
  /* 
  and this?
  '*' gets any route (aside from the api ones above). 
  We are pointing any route (aside from the api routes) to the index.html in the build folder. 
  
    path.resolve(): this is used to resolve a sequence of path-segments to an absolute path. It 
  works by processing the sequence of paths from right to left, prepending each of the paths until the absolute 
  path is created.
  */
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
} // else added in case it's not set to production

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))  
