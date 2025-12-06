// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // ← THIS MUST BE HERE
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiV6BP07XgzpAeMCbVmirb8nLZ5FL-H5M",
  authDomain: "secret-santa-3fdf3.firebaseapp.com",
  projectId: "secret-santa-3fdf3",
  storageBucket: "secret-santa-3fdf3.firebasestorage.app",
  messagingSenderId: "720047475908",
  appId: "1:720047475908:web:f81d803391f4e39f9a0d91",
  measurementId: "G-N950W1SSBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);