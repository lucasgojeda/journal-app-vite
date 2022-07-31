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

/**
 * En este thunk encontramos las acciones relacionadas a la autenticación 
 * de la aplicación.
 * @module Thunk-Auth
 */

/**
 * Esta función se encarga de realizar el inicio de sesión en la aplicación.
 * @function
 * @async
 * @param {String} email - Corresponde al email del usuario.
 * @param {String} password - Corresponde a la contraseña del usuario.
 */
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

/**
 * Esta función se encarga de registrar al usuario en la aplicación.
 * @function
 * @async
 * @param {String} email - Corresponde al email del usuario.
 * @param {String} password - Corresponde a la contraseña del usuario.
 * @param {String} name - Corresponde al nombre del usuario.
 */
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {

                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                console.log(user);
                dispatch(login(user.uid, user.displayName))
            })
            .catch((error) => {
                console.log(error.message, error.code);
                Swal.fire('Error', error.message, 'error');
            });
    }
}

/**
 * Esta función abre una ventana emergente para que el usuario pueda iniciar 
 * sesión con su cuenta de google.
 */
export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login({ uid: user.uid, displayName: user.displayName }))
            });
    }
}

/**
 * La siguiente función realiza el cierre de sesión limpiando los datos de usuario y 
 * de las notas de el estado en redux.
 */
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