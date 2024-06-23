// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHMW0koUZnnfYSAf_N4qDenBSfw33SfrQ",
  authDomain: "chat-app-3d981.firebaseapp.com",
  projectId: "chat-app-3d981",
  storageBucket: "chat-app-3d981.appspot.com",
  messagingSenderId: "45849886136",
  appId: "1:45849886136:web:19854b2f78b45ac669634d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth };
export { db };
