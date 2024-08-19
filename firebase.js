
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getAuth , createUserWithEmailAndPassword , onAuthStateChanged , signInWithEmailAndPassword ,signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 import {getFirestore ,collection, addDoc , getDocs , } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

 const firebaseConfig = {
   apiKey: "AIzaSyDtodhh8nwa3i7Mf3riRNCyVva7n-cgqw8",
   authDomain: "blog-website-5f4e9.firebaseapp.com",
   projectId: "blog-website-5f4e9",
   storageBucket: "blog-website-5f4e9.appspot.com",
   messagingSenderId: "778859964224",
   appId: "1:778859964224:web:0348e11923e4f5ce1f7ca5",
   measurementId: "G-9SKFEXF1JY"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db = getFirestore(app);

 export {db,signOut  , collection,addDoc, getDocs ,auth , createUserWithEmailAndPassword , onAuthStateChanged , signInWithEmailAndPassword }