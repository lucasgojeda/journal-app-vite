import React from 'react';
import { useSelector } from 'react-redux';

import { NoteScreen } from '../notes/NoteScreen';
import { SideBar } from './SideBar';
import { NothingSelected } from './NothingSelected';


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