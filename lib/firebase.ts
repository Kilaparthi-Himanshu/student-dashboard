// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo59VY1Qr1JC1DaRfNz39KROFuw_snJTo",
  authDomain: "student-dashboard-2405c.firebaseapp.com",
  projectId: "student-dashboard-2405c",
  storageBucket: "student-dashboard-2405c.firebasestorage.app",
  messagingSenderId: "235537710758",
  appId: "1:235537710758:web:a2b9d5603c08261cfc3e67",
  measurementId: "G-77SKPGNVFE"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(app)

// try to add analytics
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export {auth, db, analytics}