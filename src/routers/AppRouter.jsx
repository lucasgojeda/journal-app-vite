import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { login } from '../store/slices/authSlice';

import { startLoadingNotes } from '../store/thunks/notes';

/**
 * Este componente maneja las rutas "/auth" y "/*", en este componente
 * se encuentran colocados los componentes AuthRouter y JournalScreen.
 * @module AppRouter
 */
export const AppRouter = () => {

    const dispatch = useDispatch();

    const auth = getAuth();

    const [checking, setCheking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {

            if (user?.uid) {

                dispatch(login({uid: user.uid, displayName: user.displayName}));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setCheking(false);
        })
    }, [dispatch, setCheking, setIsLoggedIn]);

    if (checking) {
        return <h1>Wait...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>

                        <PublicRoute isLoggedIn={isLoggedIn} path="/auth">

                            <AuthRouter />
                        
                        </PublicRoute>
                        
                        <PrivateRoute isLoggedIn={isLoggedIn} path="/">

                            <JournalScreen />
                        
                        </PrivateRoute>

                </Switch>
            </div>
        </Router>
    );
};