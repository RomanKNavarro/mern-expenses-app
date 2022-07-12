// const errorHandler = (err, req, res, next) => {               // a single func to handle errors. Imported in server.js
//   const statusCode = res.statusCode ? res.statusCode : 500
  
//   res.status(statusCode) 

//   res.json({                
//     message: `hey loser virgin (not Roman), you got an error: ${err.message}`,   
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack
   
//   }) 

//   // basically, we replace the default html error with a json one.
// }

// module.exports = {
//   errorHandler,       
// }

// BRAD
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = {
  errorHandler,
}