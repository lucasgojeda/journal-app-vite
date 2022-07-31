import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startRegisterWithEmailPasswordName } from '../../store/thunks/auth';

import { uiRemoveError, uiSetError } from '../../store/slices/uiSlice';

import { useForm } from '../../hooks/useForm';

/**
 * Este componente es aquel mediante el cuál el usuario podrá registrarse en la aplicación.
 * @module RegisterScreen
 */
export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange, reset ] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    /**
     * Con la siguiente función registramos un usuario en base a los valores 
     * en el "formValues".
     */
    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        };

    }

    /**
     * Con la siguiente función validamos en una forma un poco rudimentaria los 
     * valores que van a ser enviados a la función que registra el usuario.
     * Observación: Lo ideal sería realizar este procedimiento utilizando expresiones 
     * regulares, pero al ser un proyecto hecho en el curso de fernando herrera prefiero 
     * dejarlo asi, pero en proximos proyectos utilizaré expresiones regulares o alguna 
     * libreria que las utilice para realizar esta tarea.
     * @returns { Boolean }
     */
    const isFormValid = () => {
        
        if( validator.isEmpty(name) ) {

            dispatch( uiSetError('Name is required' ) );
            return false;

        } else if ( !validator.isEmail(email) ) {

            dispatch( uiSetError('Must be a valid email!' ) );
            return false

        } else if ( password.length <= 5 ) {

            dispatch( uiSetError('Password should be at least 5 characters' ) );
            return false;

        }  else if ( password !== password2 ) {

            dispatch( uiSetError('Passwords are not the same' ) );
            return false;
            
        }

        dispatch( uiRemoveError() )

            return true;
    }

    return (
        <>
            <h3 className='auth__title' >Register</h3>
            <form
                onSubmit={handleRegister}
            >

                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            { msgError }
                        </div>
                    )
                }

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    autoComplete='off'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-1'
                >
                    Registrarse
                </button>



                <Link to='/auth/login'
                    className='link'
                >
                    Already registered?
                </Link>

            </form>
        </>
    );
};