import { createSlice } from '@reduxjs/toolkit'



export const journalSlice = createSlice({
   name: 'journal',
   initialState:{
    isSaving:false,
    messageSaved:'',
    notes:[],
    active:null,
    //active:{
    //    id: 'ABC123',
    //    tittle:'',
    //    body:'',
    //    date:1234567,
    //    imageUrls:[], //https://foto1.jpg
    //}
   },
   reducers: {
      savingNewNote:(state)=>{
        state.isSaving = true;
      },
      addNewEmptyNote: (state,action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
      },
      setActiveNote: (state,action) => {
        state.active = action.payload;
      },
      setNotes: (state,action) => {
        state.notes=action.payload;
      },
      setSaving: (state) => {
        state.isSaving = true;
        // todo: mensaje de error...
      },
      updatedNote: (state,action) => {
        state.isSaving = true;
        state.notes = state.notes.map(note => {
          if(note.id ===  action.payload.id){
            return action.payload;
          }

          return note;
        }); 
        // todo: Mostrar mensaje de actualización
        state.messageSaved = `${action.payload.title}, actualizada correctamente`;
      },
      setPhothosToActiveNote: (state,action) =>{
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
        
      },

      deleteNoteById: (state,action) => {},
   },
})

export const { savingNewNote,addNewEmptyNote, setActiveNote ,setNotes,setSaving,updateNote,deleteNoteById,updatedNote,setPhothosToActiveNote} = journalSlice.actions