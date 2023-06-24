import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"



const firebaseConfig = {

    apiKey: "AIzaSyA-p7gNQxWIJrPAxaHXH--hS9Kk1czPupw",
  
    authDomain: "betx-ad052.firebaseapp.com",
  
    projectId: "betx-ad052",
  
    storageBucket: "betx-ad052.appspot.com",
  
    messagingSenderId: "140917884578",
  
    appId: "1:140917884578:web:5a0161ff945f0399aa79fb",
  
    measurementId: "G-GHBLHYMT3L"
  
  };

  const app = initializeApp(firebaseConfig);

 const db = getFirestore(app)

 export{db}
