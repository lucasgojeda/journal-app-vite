import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { notesSlice } from './slices/notesSlice';
import { uiSlice } from './slices/uiSlice';

/**
 * Este archivo es el store de la aplicación en el cuál se encuentran insertados 
 * los slices que lo constituyen.
 * @module store
 */
export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      notes: notesSlice.reducer,
      ui: uiSlice.reducer,
      
  },
})