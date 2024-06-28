// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMfjwjGgFWcOwCuz1Jr8T2Wi3yJKdOBGA",
  authDomain: "vsell-e9a4b.firebaseapp.com",
  projectId: "vsell-e9a4b",
  storageBucket: "vsell-e9a4b.appspot.com",
  messagingSenderId: "354476616311",
  appId: "1:354476616311:web:82332d8282f8804a94b472",
  measurementId: "G-T1LQCKKHRY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage};