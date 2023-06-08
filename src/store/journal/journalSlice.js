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
        console.log(JSON.stringify(action.payload));
        state.notes = state.notes.map(note => {
          if(note.id ===  action.payload.id){
            
            if(note.title !== action.payload.title || note.body !== action.payload.body  ){
              return action.payload;
            }
          }

          return note;
        }); 
        // todo: Mostrar mensaje de actualización
        state.messageSaved = `${action.payload.title},${action.payload.body}, actualizada correctamentex`;
        state.isSaving = false;
        
        
      },
      setPhothosToActiveNote: (state,action) =>{
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
        
      },
      clearNotesLogout:(state) => {
        state.isSaving = false;
        state.messageSaved ='';
        state.notes = [];
        state.active = null ; 
      },
      
      deleteNoteById: (state,action) => {
        console.log(action);
        state.notes = state.notes.filter(note => {
          
          if(note.id !==  action.payload){
            console.log("id " +note.id + " "+ action.payload.id );
            return note;
          }

        });
        state.active = null;
       
      },
   },
})

export const { savingNewNote,addNewEmptyNote, setActiveNote ,setNotes,setSaving,updateNote,deleteNoteById,updatedNote,setPhothosToActiveNote,clearNotesLogout} = journalSlice.actions