export const   initialState = {
    status:'checking', // 'checking','not-authenticated' , 'authenticated',
    uid: null,
    email: null,
    displayName: null,
    phothoURL: null, 
    errorMessage:null,
   }


   export const   authenticatedState = {
    status:'authenticated', // 'checking','not-authenticated' , 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    phothoURL: 'https://demo.jpg', 
    errorMessage:null,
   }


   export const   notAuthenticatedState = {
    status:'not-authenticated', // 'checking','not-authenticated' , 'authenticated',
    uid: null,
    email: null,
    displayName: null,
    phothoURL: null, 
    errorMessage:null,
   }


   export const demoUser = {
    uid : 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    phothoURL: 'https://demo.jpg', 

   }