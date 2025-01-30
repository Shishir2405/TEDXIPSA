// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCiLjh2X1kVFQ_q_DlOcTqY9LJIsEH4XBs",
  authDomain: "tedx-bfa91.firebaseapp.com",
  projectId: "tedx-bfa91",
  storageBucket: "tedx-bfa91.firebasestorage.app",
  messagingSenderId: "843007077293",
  appId: "1:843007077293:web:7283a0a2e47c852802cf24",
  measurementId: "G-M3HJ8GXDHJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
