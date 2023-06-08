import { async } from "@firebase/util";
import { collection,deleteDoc,doc,setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes,fileUpload } from "../../helpers";
import {addNewEmptyNote, setActiveNote,savingNewNote,setNotes, setSaving,updatedNote,setPhothosToActiveNote,deleteNoteById} from "./"

export const startNewNote =()=> {
    return async (dispatch,getState) => {
        
        dispatch(savingNewNote());
        console.log(getState())
        const {uid} = getState().auth;
        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB,  `${uid}/journal/notes`));
        const setDocResp= await setDoc(newDoc,newNote);
        console.log({newDoc,setDocResp});

        newNote.id = newDoc.id;
        //! dispatch
        
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))
        
         
    }
}

export const startLoadingNotes = () => {
    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        if (!uid) throw new Error('EL UID NO EXISTE');
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}


export const startSaveNote = () => {
    return async (dispatch,getState)=> {
        dispatch(setSaving())
        const {uid} = getState().auth;
       
        const {active:note} = getState().journal;
        const noteToFireStore = {...note}
        delete noteToFireStore.id; // elimina el elemiento id de la nota
        //console.log(noteToFireStore);
        //console.log(noteToFireStore);
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);
        await setDoc(docRef,noteToFireStore,{merge:true});
        dispatch(updatedNote(note));
    }
}

export const starUploadingFiles =(files = []) => {

    return async (dispatch) => {
        dispatch( setSaving());
        const fileUploadPromises = [];
        for(const file of files){
            fileUploadPromises.push(fileUpload(file));

        }

        const phothoUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhothosToActiveNote(phothoUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        const resp = await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id))


    }
} 