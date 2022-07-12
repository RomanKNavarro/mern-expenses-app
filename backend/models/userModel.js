// const mongoose = require('mongoose')    

// const userSchema = mongoose.Schema({
//   name: {                                     // NAME, EMAIL, AND PASSWORD FIELDS ALL REQUIRED.
//     type: String,
//     required: [true, 'Please add a name']     
//   },
//   email: {
//     type: String,
//     required: [true, 'Please add an email'],
//     unique: true                              
//   },
//   password: {
//     type: String,
//     required: [true, 'Please add a password']      
//   }
// },
// {
//   timestamps: true  
// })

// module.exports = mongoose.model('User', userSchema)

// // Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. 
// // Models are responsible for creating and reading documents from the underlying MongoDB database.

// // The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the 
// // plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection 
// // in the database.

const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)