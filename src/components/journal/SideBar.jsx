import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogoutAction } from '../../store/thunks/auth';
import { startNewNote } from '../../store/thunks/notes';

/**
 * Este componente es la barra lateral derecha que contiene las notas juntos con 
 * las opciones de cerrar sesión y de agregar nuevas notas.
 * @module SideBar
 */
export const SideBar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    /**
     * Con la siguiente función cerramos sesión.
     */
    const handleLogout = () => {
        dispatch( startLogoutAction() );
    }

    /**
     * Con la siguiente función creamos una nueva nota.
     */
    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return(
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <i className='far fa-moon'></i>
                    <span> { name } </span>
                </h3>

                <button 
                    onClick={handleLogout}
                    className='btn'
                >
                    Logout
                </button>
            </div>

            <div 
                className='journal__new-entry'
                onClick={ handleAddNew }
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    );
};