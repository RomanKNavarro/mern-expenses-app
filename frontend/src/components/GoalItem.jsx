// import {useDispatch} from 'react-redux'
// import {deleteGoal} from '../features/goals/goalSlice'

// // CREATED WITH RFCE
// function GoalItem({goal}) { 
//   const dispatch = useDispatch()
//   return (
//     <div className="goal">
//       <div>
//         {new Date(goal.createdAt).toLocaleString('en-US')}   
//       </div>
//       <h2>{goal.text}</h2>
//       {/* CREATED WITH BUTTON.CLOSE. This is the nice little X icon */}
//       <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>  
//         {/* executes "deleteGoal" thunk func from goalSlice to delete goal. */}
//     </div>
//   )
// }

// export default GoalItem

// BRAD
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
