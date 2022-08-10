import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { uiStartLoading } from '../../store/slices/uiSlice';

import { startGoogleLogin, startLoginEmailPassword } from '../../store/thunks/auth';

import { useForm } from '../../hooks/useForm';


/**
 * Este componente es aquel mediante el cuál el usuario podrá iniciar sesión en la aplicación.
 * @module LoginScreen
 */
export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui)

    const [formValues, handleInputChange, reset] = useForm({
        email: 'nando@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    /**
     * Con la siguiente función el usuario inicia sesión en base
     * a los datos introducidos por el input a la variable "formValues".
     */
    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(uiStartLoading())
        dispatch(startLoginEmailPassword(email, password));
    }

    /**
     * Con la siguiente función abrimos la ventana emergente de google 
     * para iniciar sesión con una cuenta de google.
     */
    const handleGoogleLogin = () => {

        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className='auth__title' >Login</h3>
            <form
                aria-label='submit-form'
                onSubmit={handleLogin}
            >
                <input
                    aria-label='emailField'
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    aria-label='passwordField'
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={loading}
                >
                    Ingresar
                </button>

                <div className='auth__social-networks' >
                    <p>Login with social networks</p>
                </div>

                <div
                    aria-label='GoogleLoginButton'
                    className="google-btn"
                    onClick={handleGoogleLogin}
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>

                <Link to='/auth/register'
                    className='link'
                >
                    Create new account
                </Link>

            </form>
        </>
    );
};