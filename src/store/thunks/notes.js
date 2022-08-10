import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';

import Swal from 'sweetalert2';

import { FirebaseDB } from '../../firebase/firebase-config';

import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";

import {
    notesActive,
    notesAddNew,
    notesDelete,
    notesLoad,
    notesUpdated
} from "../slices/notesSlice";


/**
 * En este thunk encontramos las acciones relacionadas a las notas de la 
 * aplicación.
 * @module Thunk-Notes
 */


/**
 * Esta función se encarga de crear una nueva nota.
 * @function
 * @async
 */
export const startNewNote = () => {
    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

            const newNote = {
                title: 'Titulo',
                body: 'Nota',
                date: new Date().getTime()
            }

            // const doc = await setDoc(collection(FirebaseDB, `${uid}`, "journal/notes"), newNote);
            
            const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
            await setDoc( newDoc, newNote );

            newNote.id = newDoc.id;

            // console.log("Document written with ID: ", doc);
            
            dispatch(notesActive(newNote));
            dispatch(notesAddNew(newNote));

        } catch (error) {
            console.log(error)
        }
    };
};

/**
 * Esta función se encarga de cargar las notas al momento de que el usuario inicia 
 * sesión.
 * @function
 * @async
 * @param {String} uid - uid proporcionado por firebase personal de cada usuario.
 */
export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(notesLoad(notes));
    }
}

/** 
 * Esta función se encarga de guardar la nota anteriormente creada pero ahora con 
 * información en la base de datos.
 * @function
 * @async
 * @param {Object} note - Nota a ser guardada.
 * @example {
            title: String,
            body: String,
            date: Date,
            url: String,
            id: String
        }
 */
export const startSaveNote = (noteSended) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;


        const _delete = (noteSended) => {
            if (noteSended.url === undefined || noteSended.url === null || noteSended.url === '') {
                const { url, ...data } = noteSended;
                return data;
            } else {
                return noteSended
            }
        }
        const note = _delete(noteSended);

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc(noteRef, noteToFirestore, { merge: true });

        dispatch(notesUpdated({ id: note.id, ...noteToFirestore }));
        dispatch(notesActive({ id: note.id, ...noteToFirestore }));
        Swal.fire('Saved', note.title, 'success');
    }
}

/**
 * Esta función se encarga de iniciar el procedimiento de subida de la imagen 
 * a cloudinary.
 * @function
 * @async
 * @param {file} file - Imagen a ser subida.
 */
export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        try {
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            const fileUrl = await fileUpload(file);

            dispatch(startSaveNote({
                title: activeNote.title,
                body: activeNote.body,
                date: activeNote.date,
                url: fileUrl,
                id: activeNote.id
            }));



            Swal.close();
        } catch (error) {
            console.log(error);
        }
    }

}

/**
 * Esta función se encarga de eliminar una nota especifica en base al id enviado.
 * @function
 * @async
 * @param {String} id - id de la nota.
 */
export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);

        dispatch(notesDelete(id));
    }
}
