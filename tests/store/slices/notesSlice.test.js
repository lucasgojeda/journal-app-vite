import { notesActive, notesAddNew, notesDelete, notesLoad, notesLogoutCleaning, notesSlice, notesUpdated } from "../../../src/store/slices/notesSlice";
import { firstDemoNote, initialState, secondDemoNote } from "../../fixtures/notesFixtures";


describe('Pruebas en el notesSlice', () => {
    
    test('debe de regresar el estado inicial y llamarse "notes"', () => {

        const state = notesSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(notesSlice.name).toBe('notes');
    });

    test('debe de registrar la nota activa', () => {

        const state = notesSlice.reducer(initialState, notesActive(firstDemoNote));

        expect(state.active).toEqual(firstDemoNote);
    });

    test('debe de cargar las notas', () => {
        
        const state = notesSlice.reducer(initialState, notesLoad([firstDemoNote, firstDemoNote]));
        
        expect(state.notes).toEqual([firstDemoNote, firstDemoNote]);
    });

    test('debe de agregar una nota', () => {
        
        const state = notesSlice.reducer( initialState, notesAddNew(firstDemoNote) );

        expect(state.notes[0]).toEqual(firstDemoNote)
    });
    
    test('debe de actualizar una nota', () => {

        const state = notesSlice.reducer( initialState, notesLoad([firstDemoNote]) );
        
        const state2 = notesSlice.reducer( state, notesUpdated(secondDemoNote) );

        expect(state2.notes[0]).toEqual(secondDemoNote);
    });

    test('debe de eliminar una nota', () => {
        
        const state = notesSlice.reducer( initialState, notesLoad([firstDemoNote]) );
        
        const state2 = notesSlice.reducer( state, notesDelete(firstDemoNote.id) );
        
        expect(state2).toEqual(initialState);
    });
    
    test('debe de establecer el estado inicial', () => {
        
        const state = notesSlice.reducer( initialState, notesLogoutCleaning() );

        expect(state).toEqual(initialState);
    });
});