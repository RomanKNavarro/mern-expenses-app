// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice'
// import goalReducer from '../features/goals/goalSlice.js'  
// // NOWHERE IN AUTHSLICE IS AUTHREDUCER DEFINED. 
// // my judgement: since we only have one reducer defined, this authReducer refers to 'reset'.

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     goals: goalReducer
//   },
// }); 

// BRAD
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
})
