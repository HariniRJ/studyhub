import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6WuGb3HfdfzWnVDFGyqldbJ44nVQwPTQ",
  authDomain: "studyhub-6a3c8.firebaseapp.com",
  projectId: "studyhub-6a3c8",
  storageBucket: "studyhub-6a3c8.firebasestorage.app",
  messagingSenderId: "748311929927",
  appId: "1:748311929927:web:6b9ae4e2cc780deaf8bd62",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);