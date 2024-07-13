// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.F_YOUR_API_KEY,
    authDomain: process.env.F_YOUR_AUTH_DOMAIN,
    projectId: process.env.F_YOUR_PROJECT_ID,
    storageBucket: process.env.F_YOUR_STORAGE_BUCKET,
    messagingSenderId: process.env.F_YOUR_MESSAGING_SENDER_ID,
    appId: process.env.F_YOUR_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };