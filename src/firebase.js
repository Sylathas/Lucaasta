import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeuKsja0nGD2zh2gnkaMcMAF8SlF-Q-B8",
    authDomain: "luca-asta.firebaseapp.com",
    projectId: "luca-asta",
    storageBucket: "luca-asta.firebasestorage.app",
    messagingSenderId: "892655866027",
    appId: "1:892655866027:web:a7ae6724e81213a33b27ee"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
