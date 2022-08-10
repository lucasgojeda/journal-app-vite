import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    active: null
  },
  reducers: {
    /**
     * Envia la información de una nota para ser marcada como activa en el store.
     * @param {Object} Activenote - Nota a marcar como activa (seleccionada).
     * @example {
     *       title: String,
     *       body: String,
     *       date: Date,
     *       url: String,
     *       id: String
     *   }
     */
    notesActive: (state, action) => {

      state.active = {
        ...action.payload
      }
    },
    /**
     * Envia todas las notas para ser cargadas en el store.
     * @param {Array<Object>} notes - Array de notas.
     * @example [{...note}, {...note}, {...note}]
     */
    notesLoad: (state, action) => {

      state.notes = [...action.payload];
    },
    /**
     * Envia una nota al store para que reemplace a otra dentro del array "notes" y 
     * así actualizar dicha nota reemplazada.
     * @param {Object} note - Nota actualizada.
     * @example {
     *       title: String,
     *       body: String,
     *       date: Date,
     *       url: String,
     *       id: String
     *   }
     */
    notesUpdated: (state, action) => {

      state.notes = state.notes.map(
        note => note.id === action.payload.id
          ? { ...action.payload }
          : note
      );
    },
    /**
     * Recibe un id para filtrar entre los objetos dentro del array "notes" y quitar 
     * aquel objeto que haga match con dicho id.
     * @param {String} id - id de la nota
     */
    notesDelete: (state, action) => {

      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    /**
     * Agrega una nueva nota en el array "notes".
     * @param {Object} note - Nota a crear.
     * @example {
     *       title: String,
     *       body: String,
     *       date: Date,
     *       url: String,
     *       id: String
     *   }
     */
    notesAddNew: (state, action) => {

      state.notes = [action.payload, ...state.notes];
    },
    /**
     * Pone el estado inicial dentro del slice notes, lo usamos cuando cerramos sesión.
     */
    notesLogoutCleaning: (state) => {

      state.notes = [];
      state.active = null;
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