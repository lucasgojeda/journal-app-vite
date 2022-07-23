import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

import Swal from 'sweetalert2';

import { db } from '../../firebase/firebase-config';

import { fileUpload } from "../../helpers/fileUpload"; 
import { loadNotes } from "../../helpers/loadNotes";

import {
    notesActive,
    notesAddNew,
    notesDelete,
    notesLoad,
    notesUpdated
} from "../slices/notesSlice";


export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: 'Titulo',
            body: 'Nota',
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}`, "journal/notes"), newNote);
        console.log("Document written with ID: ", doc);

        dispatch(notesActive({ id: doc.id, ...newNote }));
        dispatch(notesAddNew({ id: doc.id, ...newNote }));

    };
};

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(notesLoad(notes));
    }
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (note.url === undefined || note.url === null || note.url === '') {
            delete note.url
        };

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await updateDoc(noteRef, noteToFirestore);

        dispatch(notesUpdated({ id: note.id, ...noteToFirestore }));
        dispatch(notesActive({ id: note.id, ...noteToFirestore }));
        Swal.fire('Saved', note.title, 'success');
    }
}

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

            console.log(fileUrl)
            console.log(activeNote)


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

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);

        dispatch(notesDelete(id));
    }
}
