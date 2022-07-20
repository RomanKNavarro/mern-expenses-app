import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'    
import {useSelector, useDispatch} from 'react-redux'         
import GoalForm from '../components/GoalForm'   
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice' 
// import getGoals from '../features/goals/goalSlice'
// import reset from '../features/auth/authSlice'     // This was wrong.

/*
'Note: 1 error on 32:53 "reset" function will be imported from authslice not from goalSlice, something like this:
import { reset } from "../features/auth/authSlice";'

works fine for me though...
*/

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)  
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)
  // i'm guessing that all this stuff above is SOLEY for the goals??? YES 

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')    
    } 
    // else {
    //   dispatch(getGoals())    // FETCHES GOALS FROM BACKEND AND PUTS THEM IN 'GOALS' SO WE HAVE ACCESS TO THEM
    // }
    dispatch(getGoals())

    return () => {
      dispatch(reset())   // LOOKS GOOD HERE (IT IS)
    }
    // RESET STATE ON UNMOUNT. HERE IS THE CULPRIT.

  //}, [user, navigate, isError, message, dispatch])
}, [user, dispatch, navigate])

  if (isLoading) {
    return <Spinner/>     
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>    
        <p>Expenses Dashboard</p>
      </section>
      <GoalForm/>

      <section className="content">
        {goals.length > 0 ? (                                  
          
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ) : (
          <h3>Youba not setta goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard

// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import GoalForm from '../components/GoalForm'
// import GoalItem from '../components/GoalItem'
// import Spinner from '../components/Spinner'
// import { getGoals, reset } from '../features/goals/goalSlice'

// function Dashboard() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { user } = useSelector((state) => state.auth)
//   const { goals, isLoading, isError, message } = useSelector(
//     (state) => state.goals
//   )

//   useEffect(() => {
//     if (isError) {
//       console.log(message)
//     }

//     if (!user) {
//       navigate('/login')
//     }

//     dispatch(getGoals())

//     return () => {
//       dispatch(reset())
//     }
//   }, [user, navigate, isError, message, dispatch])

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <>
//       <section className='heading'>
//         <h1>Welcome {user && user.name}</h1>
//         <p>Goals Dashboard</p>
//       </section>

//       <GoalForm />

//       <section className='content'>
//         {goals.length > 0 ? (
//           <div className='goals'>
//             {goals.map((goal) => (
//               <GoalItem key={goal._id} goal={goal} />
//             ))}
//           </div>
//         ) : (
//           <h3>You have not set any goals</h3>
//         )}
//       </section>
//     </>
//   )
// }

// export default Dashboard