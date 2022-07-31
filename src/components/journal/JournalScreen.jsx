import React from 'react';
import { useSelector } from 'react-redux';

import { NoteScreen } from '../notes/NoteScreen';
import { SideBar } from './SideBar';
import { NothingSelected } from './NothingSelected';

/**
 * Este componente se encarga de mostrar el componente "NoteScreen" en caso de que 
 * haya una nota seleccionada o el componente "NothingSelected" en caso de que no 
 * haya ninguna nota seleccionada.
 * @module JournalScreen
 */
export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );


    return(
        <div className='journal__main-content'>
            <SideBar />

            <main>

                {
                    (active)
                        ? ( <NoteScreen /> )
                        : ( <NothingSelected /> )
                }

            </main>
        </div>
    );
};