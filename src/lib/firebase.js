import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-app-9a384.firebaseapp.com",
  projectId: "chat-app-9a384",
  storageBucket: "chat-app-9a384.appspot.com",
  messagingSenderId: "904854761951",
  appId: "1:904854761951:web:bbb69bfb779771fad2546a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();