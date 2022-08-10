import { authSlice, login, logout } from "../../../src/store/slices/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {

        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('debe de realizar la autenticación', () => {

        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            uid: demoUser.uid,
            name: demoUser.displayName
        });
    });

    test('debe de realizar el logout', () => {

        const state = authSlice.reducer({
            uid: demoUser.uid,
            name: demoUser.displayName
        }, logout());

        expect(state).toEqual(initialState);
    });
});