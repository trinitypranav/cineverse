// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4kOQqRTEEoEmN_DTkecW_tgcYjroPs54",
  authDomain: "cineversegpt.firebaseapp.com",
  projectId: "cineversegpt",
  storageBucket: "cineversegpt.appspot.com",
  messagingSenderId: "1097581756191",
  appId: "1:1097581756191:web:53ac5b5530ba3dc269fa2a",
  measurementId: "G-FHLTH4RNW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
