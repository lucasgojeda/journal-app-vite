// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


import { getEnvironmets } from "../helpers/getEnvironmets";

const { 
  VITE_FIREBASE_apiKey: apiKey, 
  VITE_FIREBASE_authDomain: authDomain, 
  VITE_FIREBASE_projectId: projectId, 
  VITE_FIREBASE_storageBucket: storageBucket, 
  VITE_FIREBASE_messagingSenderId: messagingSenderId, 
  VITE_FIREBASE_appId: appId, 
  VITE_FIREBASE_measurementId: measurementId, 
} = getEnvironmets();


// Your web app"s Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};



// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
export const googleAuthProvider = new GoogleAuthProvider();