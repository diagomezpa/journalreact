import { async } from '@firebase/util';
import {loginWithEmailPassword,singInWithGoogle ,registerUserWithEmailPassword, logoutFirebase} from '../../firebase/providers'
import {checkingCredentials, login, logout } from './authSlice'
import {clearNotesLogout} from '../journal/journalSlice'

export const checkingAuthentication = (email, password)=> {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn =  () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
        delete result.ok;
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email,password,displayName})=>{
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok,uid,phothoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if(!ok )return dispatch(logout({errorMessage}));

        dispatch(login( {uid,displayName,email,phothoURL}))
    }
}

export const startLoginWithEmailPassword = ({email,password}) =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const {ok,uid,phothoURL, errorMessage}= await loginWithEmailPassword({email,password});
        if(!ok )return dispatch(logout({errorMessage}));
        dispatch(login( ok,uid,email,password,phothoURL))
    }

}

export const startLogout = () => {

    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }

}