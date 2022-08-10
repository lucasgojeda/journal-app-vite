import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from "../firebase/firebase-config";

/**
 * Esta función se encarga de hacer la petición a firebase para obtener las notas 
 * al momento de iniciar sesión.
 * @function
 * @param {String} uid - Es el uid proporcionado por Firebase. 
 * @returns {Array<Object>}
 */
export const loadNotes = async (uid) => {

    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
};





