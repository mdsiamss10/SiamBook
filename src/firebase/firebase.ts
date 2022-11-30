import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVRpDnfO4P2dQBVCzmOm3ndTIBtLiWmKY",
  authDomain: "svelte-chat-app-e1a19.firebaseapp.com",
  projectId: "svelte-chat-app-e1a19",
  storageBucket: "svelte-chat-app-e1a19.appspot.com",
  messagingSenderId: "719537178469",
  appId: "1:719537178469:web:d12a2e8d51e24d46b9038c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
