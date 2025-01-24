// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuUsoETrmCxki8_F4gqxSQ8IDlHw4tZ8A",
  authDomain: "tedxipsa-3cc0b.firebaseapp.com",
  projectId: "tedxipsa-3cc0b",
  storageBucket: "tedxipsa-3cc0b.firebasestorage.app",
  messagingSenderId: "224627287799",
  appId: "1:224627287799:web:447c37981d25c1aa7955f2",
  measurementId: "G-WCE4KGE9SM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
