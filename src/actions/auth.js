import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut, 
        updateProfile } from 'firebase/auth';

import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

 
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
                dispatch( finishLoading() )
            })
            .catch((error) => {
                console.log(error.message, error.code);
                dispatch( finishLoading() )

                Swal.fire('Error', error.message, 'error');
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) =>{

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) =>{

                await updateProfile(auth.currentUser,{
                    displayName:name
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
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogoutAction = () => {
    const auth = getAuth();
    return async(dispatch) => {
        
        await signOut(auth);

        dispatch(logoutAction());
        dispatch( noteLogout());
    }
}

export const logoutAction = () => ({
    type: types.logout
})