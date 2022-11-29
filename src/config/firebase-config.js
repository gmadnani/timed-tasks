import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_zHHmilkLBTxir9YGVdruMfMcPccuvLM",
    authDomain: "timedtasks.firebaseapp.com",
    projectId: "timedtasks",
    storageBucket: "timedtasks.appspot.com",
    messagingSenderId: "892159638330",
    appId: "1:892159638330:web:88e2366c239379dd4aee03",
    measurementId: "G-MMQFVQX0ME"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)