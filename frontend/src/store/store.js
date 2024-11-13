import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // import the userSlice reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // attach userReducer to the user key in the root state
  },
});
