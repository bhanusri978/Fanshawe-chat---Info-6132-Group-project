
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSrMjXGzQvR09AGA6zhYy1nt6ABrgWK3M",
  authDomain: "s2finalproject-react.firebaseapp.com",
  projectId: "s2finalproject-react",
  storageBucket: "s2finalproject-react.firebasestorage.app",
  messagingSenderId: "379783143895",
  appId: "1:379783143895:web:a1c04b37e9e248cf646b92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };