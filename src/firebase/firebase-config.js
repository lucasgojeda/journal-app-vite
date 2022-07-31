
const apiKey = import.meta.env.VITE_FIREBASE_apiKey;
const authDomain = import.meta.env.VITE_FIREBASE_authDomain;
const projectId = import.meta.env.VITE_FIREBASE_projectId;
const storageBucket = import.meta.env.VITE_FIREBASE_storageBucket;
const messagingSenderId = import.meta.env.VITE_FIREBASE_messagingSenderId;
const appId = import.meta.env.VITE_FIREBASE_appId;
const measurementId = import.meta.env.VITE_FIREBASE_measurementId;

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


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
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider
}