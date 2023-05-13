// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozi8R9hk9CPiGO-EIEiNhidIP2KkRUss",
  authDomain: "react-curso-3dbf6.firebaseapp.com",
  projectId: "react-curso-3dbf6",
  storageBucket: "react-curso-3dbf6.appspot.com",
  messagingSenderId: "693552103905",
  appId: "1:693552103905:web:34463d9bd97a3745ff12a0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);