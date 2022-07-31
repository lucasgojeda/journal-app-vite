import React from 'react';
import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

/**
 * Este componente se encarga de mostrar las vistas previas de las notas dentro 
 * del componente "SideBar".
 * @module JournalEntries
 */
export const JournalEntries = () => {

    const { notes } = useSelector( state => state.notes );

    return(
        <div className='journal__entries'>
            {
                notes.map(note => (
                    <JournalEntry 
                        key={note.id}
                        note={note}
                    />
                ))
            }
        </div>
    );
};