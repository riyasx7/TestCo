import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage if available
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist to localStorage
    },
    clearUserDetails: (state) => {
      state.user = null;
      localStorage.removeItem('user'); 
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
