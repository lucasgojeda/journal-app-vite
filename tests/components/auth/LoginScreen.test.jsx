import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginScreen } from '../../../src/components/auth/LoginScreen';

import { authSlice } from '../../../src/store/slices/authSlice';
import { notesSlice } from '../../../src/store/slices/notesSlice';
import { uiSlice, uiStartLoading } from '../../../src/store/slices/uiSlice';
import { MemoryRouter } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

import { startGoogleLogin, startLoginEmailPassword } from '../../../src/store/thunks/auth';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notes: notesSlice.reducer,
        ui: uiSlice.reducer
    },
    // preloadedState: {

    // }
})

jest.mock('firebase/auth');

const mockStartGoogleLogin = jest.fn();
const mockStartLoginEmailPassword = jest.fn();

jest.mock('../../../src/store/thunks/auth', () => ({
    startGoogleLogin: () => mockStartGoogleLogin,
    startLoginEmailPassword: (email, password) => {
        return () => mockStartLoginEmailPassword(email, password);
    },
}));

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useDispatch: () => (fn) => fn(),
// }));



describe('Pruebas en el <LoginScreen />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('botón de google debe de llamar el handleGoogleLogin', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        )

        const user = {
            displayName: 'lucas',
            uid: '123456',
        }

        await signInWithPopup.mockResolvedValue({ user });
        const googleBtn = screen.getByLabelText('GoogleLoginButton');

        fireEvent.click(googleBtn);

        expect(mockStartGoogleLogin).toHaveBeenCalled();
    });

    test('submit debe de llamar startLoginEmailPassword y uiStartLoading', () => {

        const email = 'lucas@gmail.com';
        const password = '654321';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByLabelText('emailField');
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByLabelText('passwordField');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const form = screen.getByLabelText('submit-form');
        fireEvent.submit(form);

        expect(mockStartLoginEmailPassword).toHaveBeenCalledWith(email, password);
    });
});