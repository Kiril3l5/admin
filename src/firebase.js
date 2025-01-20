// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB1dlHRhLA71PxCgVLjOieUcUF22DWx6zY",
    authDomain: "autonomy-heroes.firebaseapp.com",
    projectId: "autonomy-heroes",
    storageBucket: "autonomy-heroes.firebasestorage.app",
    messagingSenderId: "266526530869",
    appId: "1:266526530869:web:ea95143735be497ca8007c",
    measurementId: "G-70PG5B4S39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };