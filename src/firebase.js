import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

//Test -----------------------------
// const firebaseApp = firebase.initializeApp({
//  apiKey: "AIzaSyBTj6WKWCsqfXXWAMWiuT-11-Uxq9GdVIU",
//   authDomain: "betx-e7062.firebaseapp.com",
//   projectId: "betx-e7062",
//   storageBucket: "betx-e7062.appspot.com",
//   messagingSenderId: "1003555470106",
//   appId: "1:1003555470106:web:0742b269bbdb7e2d5a8aa3",
//   measurementId: "G-Y4V9MSXGXT"
// });


//Live-----------------------------

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA-p7gNQxWIJrPAxaHXH--hS9Kk1czPupw",
    authDomain: "betx-ad052.firebaseapp.com",
    projectId: "betx-ad052",
    storageBucket: "betx-ad052.appspot.com",
    messagingSenderId: "140917884578",
    appId: "1:140917884578:web:5a0161ff945f0399aa79fb",
    measurementId: "G-GHBLHYMT3L"
});


const db = firebaseApp.firestore();
const storage = getStorage(firebaseApp);

export  {db,storage};