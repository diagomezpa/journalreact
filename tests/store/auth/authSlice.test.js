import { authSlice, login , logout , checkingCredentials} from "../../../src/store/auth/authSlice"
import { demoUser, initialState , authenticatedState, notAuthenticatedState  } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice ', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', ()=>{
        const state = authSlice.reducer(initialState,{});
        expect(authSlice.name).toBe('auth');
        
        expect(state).toEqual(initialState);
    }); 

    test('debe de realizar la autenticación', () => {
        const state = authSlice.reducer( initialState, login(demoUser));
        expect(state).toEqual({
            status:'authenticated', // 'checking','not-authenticated' , 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            phothoURL: demoUser.phothoURL, 
            errorMessage:null,
        })
    });
    
    

    test('debe realizar el logout sin argumentos  ', () => {
        
        const state = authSlice.reducer( authenticatedState, logout());
        console.log(state);
        expect(state).toEqual(
        {status:'not-authenticated', // 'checking','not-authenticated' , 'authenticated',
        uid: null,
        email: null,
        displayName: null,
        phothoURL: null, 
        errorMessage:undefined,}
        );
    });

    test('debe realizar el logout con argumentos  ', () => {
        const errorMessage = 'credenciales no son correctas';
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}));
        console.log(state);
        expect(state).toEqual(
        {status:'not-authenticated', // 'checking','not-authenticated' , 'authenticated',
        uid: null,
        email: null,
        displayName: null,
        phothoURL: null, 
        errorMessage:errorMessage,}
        );
    });

    test('debe de cambiar el estado a checking ', () => {
        
        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        
        expect(state.status).toBe('checking');
    });
})