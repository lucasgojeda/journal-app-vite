import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";

import {
    startGoogleLogin,
    startLoginEmailPassword,
    startLogoutAction,
    startRegisterWithEmailPasswordName
} from "../../../src/store/thunks/auth";

import { login, logout } from "../../../src/store/slices/authSlice";
import { notesLogoutCleaning } from "../../../src/store/slices/notesSlice";
import { uiFinishLoading } from "../../../src/store/slices/uiSlice";


jest.mock('firebase/auth');

describe('Pruebas en el thunk "auth"', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el startLogoutAction', async () => {

        await startLogoutAction()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(logout());
        expect(dispatch).toHaveBeenCalledWith(notesLogoutCleaning());
    });

    test('startLoginEmailPassword debe de llamar el login', async () => {

        const user = {
            displayName: 'lucas',
            uid: '123456',
        }

        await signInWithEmailAndPassword.mockResolvedValue({ user });

        //thunk

        await startLoginEmailPassword()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(login(user));
        expect(dispatch).toHaveBeenCalledWith(uiFinishLoading());
    });

    test('startRegisterWithEmailPasswordName debe de llamar el login', async() => {

        const user = {
            displayName: 'lucas',
            uid: '123456',
        } 

        await createUserWithEmailAndPassword.mockResolvedValue({ user });

        //thunk

        await startRegisterWithEmailPasswordName('LUCAS@GMAIL.COM', '123456', 'LUCAS')(dispatch);


        expect(dispatch).toHaveBeenCalledWith(login(user.uid, user.displayName));
    });

    test('startGoogleLogin debe de llamar el login', async() => {
    
        const user = {
            displayName: 'lucas',
            uid: '123456',
        }
    
        await signInWithPopup.mockResolvedValue({ user });
    
    
        //thunk
    
        await startGoogleLogin()(dispatch);
    
        expect(dispatch).toHaveBeenCalledWith(login(user));
    });
});
