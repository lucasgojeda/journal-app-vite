import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: '',
    name: ''
  },
  reducers: {
    login: (state, action) => {

      state.uid = action.payload.uid;
      state.name = action.payload.displayName;
    },
    logout: (state) => {

      state.uid = '';
      state.name = '';
    },

  },
})

export const { login, logout } = authSlice.actions;