// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_APP_APIKEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_APP_AUTHDOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_APP_PROJECTID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.NEXT_PUBLIC_APPID}`,
  measurementId: `${process.env.NEXT_PUBLIC_APP_MEASUREMENTID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
