const asyncHandler = require('express-async-handler')   
const Goal = require('../models/goalModel')    
// has a bunch of mongoose methods we can use to create/read/etc.

// @desc Get goals            (description)
// @route   GET /api/goals    (the method to get goals)
// @access Private            (all of these will be private once we add authentication)
const getGoals = asyncHandler(async (req, res) => {     
  const goals = await Goal.find({user: req.user.id})  
  res.status(200).json(goals)
})

// @desc Set goal            
// @route   POST /api/goals    
// @access Private            
const setGoal = asyncHandler(async (req, res) => { 
  if (!req.body.text) {                          
    res.status(400)
    throw new Error('please add a text field') 
  }
  const goal = await Goal.create({    
    text: req.body.text,
    user: req.user.id       // what's up with this? makes 'user.id' required. Easy
  })

  res.status(200).json(goal)   
})

// @desc Update goal            
// @route   PUT /api/goals/:id    
// @access Private            
const updateGoal = asyncHandler(async (req, res) => {     
  const goal = await Goal.findById(req.params.id)       
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {   
    res.status(401)
    throw new Error('User not authorized')
  }

  /* notice how this stuff is strategically placed above the "updatedGoal" func. This ensures the user checks out 
  first before they can access that func. */
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})  
  res.status(200).json(updatedGoal) 
})

// @desc Delete goal             
// @route   DELETE /api/goals/:id    
// @access Private            
const deleteGoal = asyncHandler(async (req, res) => {    
  const goal = await Goal.findById(req.params.id)   
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  await goal.remove()
  res.status(200).json({ id: req.params.id })		
})

module.exports = {
  getGoals,            
  setGoal,
  updateGoal,
  deleteGoal
}

/* when we use mongoose in each of the funcs to interact with the databse, we get back a "promise". So, we
want to add "async" to each of the funcs. Using "async", we'll use the "try" catch. 

We'll use a package called "Express Async Handler", installed via the terminal: npm i express-async-handler.
With that installed, we wrap all the funcs with asyncHandler().

With that done, now we're ready to start w/ the database. */






























