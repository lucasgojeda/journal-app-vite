import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { startDeleting } from '../../store/thunks/notes';
import { notesActive } from '../../store/slices/notesSlice';


export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);
    const [formValues , handleInputChange, reset] = useForm(note);
    const { title, body, id } = formValues;    

    const activeId = useRef( note.id );

    useEffect(() => {
        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {


        dispatch(notesActive({
            title: formValues.title,
            body: formValues.body,
            id: note.id,
            url: note.url,
            date: note.date
        })  );
        
    }, [formValues, dispatch]);


    const handleDelete = () => {
        dispatch(startDeleting(id));
    }



    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What happened today?'
                    name='body'
                    className='notes__textarea'
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url) 
                        &&
                    (<div className='notes__image'>
                        <img
                            src={ note.url }
                            alt='image'
                        />
                    </div>)
                }
            </div>

            <button 
                className='btn btn-danger' 
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    );
};