import { collection, query, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";
 
/**
 * Esta función se encarga de hacer la petición a firebase para obtener las notas 
 * al momento de iniciar sesión.
 * @function
 * @param {String} uid - Es el uid proporcionado por Firebase. 
 * @returns {Array<Object>}
 */
export const loadNotes = async(uid) => {
 
    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
    const notes = [];
 
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
      });
    return notes;
};