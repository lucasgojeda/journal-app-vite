import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    active: null
  },
  reducers: {
    notesActive: (state, action) => {

      state.active = {
        ...action.payload
      }
    },
    notesLoad: (state, action) => {

      state.notes = [...action.payload];
    },
    notesUpdated: (state, action) => {

      state.notes = state.notes.map(
        note => note.id === action.payload.id
          ? {...action.payload}
          : note
      );
    },
    notesDelete: (state, action) => {

      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    notesLogoutCleaning: (state) => {

      state.notes = [];
      state.active = null;
    },
    notesAddNew: (state, action) => {

      state.notes = [action.payload, ...state.notes];
    },

  },
})

export const {
  notesActive,
  notesLoad,
  notesUpdated,
  notesDelete,
  notesLogoutCleaning,
  notesAddNew, } = notesSlice.actions;