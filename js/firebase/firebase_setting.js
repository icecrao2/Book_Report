// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCOSXkOmCQ19_1r7RhQjdMG5KgSN5oMGG0",
  authDomain: "book-report-da531.firebaseapp.com",
  projectId: "book-report-da531",
  storageBucket: "book-report-da531.appspot.com",
  messagingSenderId: "906016512422",
  appId: "1:906016512422:web:e538e363a566e0b62b9767",
  measurementId: "G-VXHTQ92JNH",
  databaseURL: "https://book-report-da531-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

