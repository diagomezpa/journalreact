import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

        try {
            const result = await signInWithPopup(FirebaseAuth,googleProvider);
            //const credentials = GoogleAuthProvider.credentialFromResult(result);
            const {displayName, photoURL, uid} = result.user;

            return {
                ok: true, 
                //user info
                displayName,photoURL,uid
            }
            
        } catch (error){
            const errorCode = error.code;
            const errorMassage = error.message;

            const credential = GoogleAuthProvider.credentialFromError(error);
            return {
                ok:false,
                errorMassage

            }
        }

}

export const registerUserWithEmailPassword = async ({email,password,displayName})=>{

    try{
     const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
     const {uid, photoURL} = resp.user;
    await updateProfile(FirebaseAuth.currentUser,{
        displayName
    });

        return {
            ok: true,
            uid,photoURL,email,displayName
        }
    }catch(error){
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message

        }
    }
}

export const  loginWithEmailPassword = async ({email,password}) => {

    //! sigInWithEmailAAndPassword
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid, photoURL,displayName} = resp.user;
        return {
            ok: true,
            uid,photoURL,email,displayName
        }
    }catch(error){
        console.log(error.message)
        return {
            ok: false,
            errorMessage: error.message

        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}