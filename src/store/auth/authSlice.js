import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: 0,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState:{
    status:'checking', // 'checking','not-authenticated' , 'authenticated',
    uid: null,
    displayName: null,
    phothoURL: null, 
    errorMessage:null,
   },
   reducers: {
       login:(state, {payload})=>{
        state.status='authenticated'; // 'checking','not-authenticated' , 'authenticated',
        state.uid= payload.uid;
        state.displayName= payload.displayName;
        state.phothoURL= payload.phothoURL; 
        state.errorMessage=null;
       },
       logout:(state,{payload})=>{
        state.status='not-authenticated'; // 'checking','not-authenticated' , 'authenticated',
        state.uid= null;
        state.displayName= null;
        state.phothoURL= null; 
        state.errorMessage=payload?.errorMessage;
       },
       checkingCredentials:(state)=>{
        state.status='checking';
       }
   },
})

export const { login, logout, checkingCredentials } = authSlice.actions