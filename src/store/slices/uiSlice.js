import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    msgError: null
  },
  reducers: {
    uiSetError: (state, action) => {

      state.msgError = action.payload;
    },
    uiRemoveError: (state) => {

      state.msgError = null;
    },
    uiStartLoading: (state) => {

      state.loading = true;
    },
    uiFinishLoading: (state) => {

      state.loading = false;
    },

  },
})

export const {
  uiSetError,
  uiRemoveError,
  uiStartLoading,
  uiFinishLoading, } = uiSlice.actions;