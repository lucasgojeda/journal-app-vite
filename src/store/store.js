import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { notesSlice } from './slices/notesSlice';
import { uiSlice } from './slices/uiSlice';


export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      notes: notesSlice.reducer,
      ui: uiSlice.reducer,
      
  },
})