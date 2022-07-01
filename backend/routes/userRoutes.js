const express = require('express')  
const router = express.Router()

const {   
  getGoals,            
  setGoal,
  updateGoal,
  deleteGoal 
} = require('../controllers/goalController') 

router.get('/', getGoals)

router.route('/').get(getGoals).post(setGoal);  
router.route('/:id').put(updateGoal).delete(deleteGoal);


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

module.exports = router