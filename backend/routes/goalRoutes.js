const express = require('express')  
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


const {   
  getGoals,            
  setGoal,
  updateGoal,
  deleteGoal 
} = require('../controllers/goalController') 

router.route('/').get(protect, getGoals).post(protect, setGoal);  
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);    
/* these two funcs use the same route, "/:id", so we chain them. Note that "router.route()" needs to 
be used when chaining */

module.exports = router

/* All these requests follow CRUD (create, read, update, delete). Each of these requires different "paths":
C (HTTP POST): /api/devices + payload
R (HTTP GET): /api/devices
U (HTTP PUT): /api/devices/1 + payload    
D (HTTP DELETE): /api/devices/1

put request example on postman: http://localhost:5000/api/goals/123211234:
{
    "message": "Update goal 123211234"
}

delete request example (with same request url):
{
    "message": "Delete goal 123211234"
}

we now have all our routes set up. 
*/