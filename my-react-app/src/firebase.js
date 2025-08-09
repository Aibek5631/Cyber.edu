import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyARBocGggljNG6iacGLjs7RxxpGqjV1phY",
  authDomain: "cyber-education-a42be.firebaseapp.com",
  projectId: "cyber-education-a42be",
  storageBucket: "cyber-education-a42be.firebasestorage.app",
  messagingSenderId: "849823947366",
  appId: "1:849823947366:web:fec162ae21de2117896ba7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
