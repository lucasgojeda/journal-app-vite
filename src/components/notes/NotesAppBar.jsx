import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../store/thunks/notes';

/**
 * Este componente posee los botones de guardar y de agregar una foto a la nota.
 * @module NotesAppBar
 */
export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active } = useSelector( state => state.notes );

    /**
     * La siguiente función se encarga de realizar el dispatch que guarda la nota.
     */
    const handleSave = () => {
        
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();

    }

    /**
     * La siguiente función se encarga de realizar el dispatch de la función
     * que realiza el uploading de la imagen cada vez que el input file recibe un nuevo 
     * archivo.
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if ( file ) {
            dispatch( startUploading(file) );
        }

    }

    return(
        <div className='notes__appbar'>
            <span>28 de agosto 2020</span>

            <input 
                id='fileSelector'
                type='file'
                name='file'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className='btn'
                    onClick={handlePictureClick}
                    >
                    Picture
                </button>
                <button 
                    className='btn'
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};