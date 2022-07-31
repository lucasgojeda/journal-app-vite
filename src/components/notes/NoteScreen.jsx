import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { startDeleting } from '../../store/thunks/notes';
import { notesActive } from '../../store/slices/notesSlice';

/**
 * Este componente es aquel en el cuál el usuario editará sus notas.
 * @module NoteScreen
 */
export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body, id } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);

    /**
     * El siguiente useEffect actualiza los valores de la nota activa dentro de redux 
     * cada vez que los valores de ella cambian.
     */
    useEffect(() => {


        dispatch(notesActive({
            title: formValues.title,
            body: formValues.body,
            id: note.id,
            url: note.url,
            date: note.date
        }));

    }, [formValues, dispatch]);

    /**
     * La siguiente función se encarga de eliminar la nota que está seleccionada,
     * es decir aquella marcada como activa en el redux.
     */
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
                            src={note.url}
                            alt='image'
                        />
                    </div>)
                }
            </div>

            <button
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};