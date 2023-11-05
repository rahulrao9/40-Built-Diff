// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBaqACnt3zTNonv78QA9YSVwVSt66MHoA",
  authDomain: "practice-4036e.firebaseapp.com",
  projectId: "practice-4036e",
  storageBucket: "practice-4036e.appspot.com",
  messagingSenderId: "48702930651",
  appId: "1:48702930651:web:6c378c673de9595c3556fe",
  measurementId: "G-DFYR4VSW18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const googleProvide=new GoogleAuthProvider();

export const db=getFirestore(app)