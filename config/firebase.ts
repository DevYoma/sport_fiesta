// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC20sQLsWoFMWrLiycOyDwvAY-SjuEsy7M",
  authDomain: "sport-fiesta.firebaseapp.com",
  projectId: "sport-fiesta",
  storageBucket: "sport-fiesta.appspot.com",
  messagingSenderId: "563007642622",
  appId: "1:563007642622:web:56fcf86a9e856b206f3eaf",
  measurementId: "G-V1ZL34E7CP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
