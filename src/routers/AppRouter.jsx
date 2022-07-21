import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth'
import { JournalScreen } from '../components/journal/JournalScreen';
import { startLoadingNotes } from '../actions/notes';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const auth = getAuth();

    const [checking, setCheking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {

            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid ));
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