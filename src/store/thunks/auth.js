import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';

import Swal from 'sweetalert2';

import { googleAuthProvider } from '../../firebase/firebase-config';

import { login, logout } from '../slices/authSlice';
import { uiFinishLoading } from '../slices/uiSlice';
import { notesLogoutCleaning } from '../slices/notesSlice';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {

                dispatch(login({ uid: user.uid, displayName: user.displayName }))
                dispatch(uiFinishLoading())
            })
            .catch((error) => {
                console.log(error.message, error.code);
                dispatch(uiFinishLoading())

                Swal.fire('Error', error.message, 'error');
            });
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {

                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                console.log(user);
                // dispatch(login(user.uid, user.displayName))
            })
            .catch((error) => {
                console.log(error.message, error.code);
                Swal.fire('Error', error.message, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login({ uid: user.uid, displayName: user.displayName }))
            });
    }
}

export const startLogoutAction = () => {
    const auth = getAuth();
    return async (dispatch) => {
        try {

            await signOut(auth);
        } catch (error) {
            console.log(error)
        }

        dispatch(logout());
        dispatch(notesLogoutCleaning());


    }
}