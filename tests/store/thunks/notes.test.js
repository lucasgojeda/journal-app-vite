import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';

import { FirebaseDB } from "../../../src/firebase/firebase-config";

import {
    notesActive,
    notesAddNew,
    notesLoad
} from "../../../src/store/slices/notesSlice";

import {
    startLoadingNotes,
    startNewNote
} from "../../../src/store/thunks/notes";



describe('Pruebas en el thunk "notes"', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    const uid = 'TEST-UID';

    const newNote = {
        body: expect.any(String),
        title: expect.any(String),
        id: expect.any(String),
        date: expect.any(Number),
    }

    beforeEach(async () => {

        jest.clearAllMocks();

        /** 
         * Creamos una nota
         */

        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

    });


    afterEach(async () => {
        /**
         * Borramos todas las notas de firebase
         */

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
    })


    test('startNewNote debe de crear una nueva nota en blanco', async () => {

        expect(dispatch).toHaveBeenCalledWith(notesActive(newNote));
        expect(dispatch).toHaveBeenCalledWith(notesAddNew(newNote));

    });

    test('startLoadingNotes debe cargar las notas', async () => {

        /**
         * Evaluando si la nota se carga
         */

        const notas = [newNote];

        await startLoadingNotes(uid)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(notesLoad(notas));

    });

});