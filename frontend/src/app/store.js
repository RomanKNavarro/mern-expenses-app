import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'  
// NOWHERE IN AUTHSLICE IS AUTHREDUCER DEFINED. 
// my judgement: since we only have one reducer defined, this authReducer refers to 'reset'.

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
