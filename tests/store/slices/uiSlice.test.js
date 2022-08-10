import { uiFinishLoading, uiRemoveError, uiSetError, uiSlice, uiStartLoading } from "../../../src/store/slices/uiSlice";
import { errorState, initialState, loadingState } from "../../fixtures/uiFixtures";


describe('Pruebas en el uiSlice', () => {
    
    test('debe de regresar el estado inicial y llamarse "ui ', () => {

        const state = uiSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(uiSlice.name).toBe('ui');
    });

    test('debe de regresar el error ingresado', () => {
        
        const error = 'Error en el formulario!';

        const state = uiSlice.reducer(initialState, uiSetError(error));

        expect(state.msgError).toBe(error);
    });

    test('debe de limpiar los errores', () => {
        
        const state = uiSlice.reducer(errorState, uiRemoveError);

        expect(state).toEqual(initialState);
    });

    test('debe de marcar como cargando', () => {
        
        const state = uiSlice.reducer(initialState, uiStartLoading());

        expect(state.loading).toBe(true);
    });

    test('debe de marcar como no cargando', () => {
        
        const state = uiSlice.reducer(loadingState, uiFinishLoading());

        expect(state.loading).toBe(false);
    });
});