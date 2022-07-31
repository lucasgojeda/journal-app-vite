import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: '',
    name: ''
  },
  reducers: {
    /**
     * Envia la información del usuario al store.
     * @param {Object} user - Datos del usuario.
     * @example action = {
     *      uid: String,
     *      name: String
     * }
     */
    login: (state, action) => {

      state.uid = action.payload.uid;
      state.name = action.payload.displayName;
    },
    /**
     * Vacía la información de usuario del store.
     */
    logout: (state) => {

      state.uid = '';
      state.name = '';
    },

  },
})

export const { login, logout } = authSlice.actions;