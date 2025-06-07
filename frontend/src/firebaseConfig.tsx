

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPqbHsoZlw0eSJnx9zbc3tfWYrONgoJy0",
  authDomain: "lcimscivilstatus.firebaseapp.com",
  databaseURL: "https://lcimscivilstatus-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lcimscivilstatus",
  storageBucket: "lcimscivilstatus.firebasestorage.app",
  messagingSenderId: "395981725902",
  appId: "1:395981725902:web:d9229265520940d805b09f",
  measurementId: "G-WXN5ZN51SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// Export Firebase services
export const database = getDatabase(app);
export const storage = getStorage(app);