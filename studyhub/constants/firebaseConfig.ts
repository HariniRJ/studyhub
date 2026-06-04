import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjeksvIvZiJDD_niLxy0s_gsU2V8Qrgl0",
  authDomain: "student-hub-7dc70.firebaseapp.com",
  projectId: "student-hub-7dc70",
  storageBucket: "student-hub-7dc70.firebasestorage.app",
  messagingSenderId: "20239469332",
  appId: "1:20239469332:web:74e9d853a777e50131d001",
  measurementId: "G-WBTCPE19TH",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);