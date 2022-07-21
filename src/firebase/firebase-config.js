// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
 
 
// Your web app"s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZaGgNUSgzf8yH3lh_nPxm45usgrOg0JE",
  authDomain: "react-app-curso-97380.firebaseapp.com",
  projectId: "react-app-curso-97380",
  storageBucket: "react-app-curso-97380.appspot.com",
  messagingSenderId: "893413301218",
  appId: "1:893413301218:web:8becd88604d8845945b7bb",
  measurementId: "G-F302J6NPHF"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export {
    db,
    googleAuthProvider
}