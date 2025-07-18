
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDPWuhJRSZNUBaQEb-P8y7w-ph-54qr0to",

  authDomain: "nexusflow-5c857.firebaseapp.com",

  projectId: "nexusflow-5c857",

  storageBucket: "nexusflow-5c857.firebasestorage.app",

  messagingSenderId: "627218883229",

  appId: "1:627218883229:web:99d3b0e9799bd8e66cea74",

  measurementId: "G-960DY512F5"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
