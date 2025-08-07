import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCeuKsja0nGD2zh2gnkaMcMAF8SlF-Q-B8",
    authDomain: "luca-asta.firebaseapp.com",
    projectId: "luca-asta",
    storageBucket: "luca-asta.firebasestorage.app",
    messagingSenderId: "892655866027",
    appId: "1:892655866027:web:a7ae6724e81213a33b27ee"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)