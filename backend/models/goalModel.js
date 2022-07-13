// HERE'S WHERE WE DEFINE OUR "SCHEMA" (THE FIELDS FOR THIS PARTICULAR RESOURCE, IN THIS CASE, GOALS):

const mongoose = require('mongoose')
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,   // this is a "ObjectId" type
      required: true,
      ref: 'User',
    },
    text: {
      type: String,    // determine what kind of attributes the "text" field should have via an object with prop.s
      required: [true, 'Please add a text value']   // make the text field required.
    }
  }, 
  {
    timestamps: true  // just creates some "created at" and "updated at" fields in the json object that is sent back (easy)
  }
)

module.exports = mongoose.model('Goal', goalSchema)   
// we're gonna name the model "Goal", and it's gonna use the goalSchema we just created
