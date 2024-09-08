// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBie_oP54BmKIl-Emx-j0QRZ8-c_aA2kVg",
//   authDomain: "event-otp.firebaseapp.com",
//   projectId: "event-otp",
//   storageBucket: "event-otp.appspot.com",
//   messagingSenderId: "1083661105099",
//   appId: "1:1083661105099:web:2f778140589ff2e956a84e",
//   measurementId: "G-EDDZY9JZY1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBie_oP54BmKIl-Emx-j0QRZ8-c_aA2kVg",
  authDomain: "event-otp.firebaseapp.com",
  projectId: "event-otp",
  storageBucket: "event-otp.appspot.com",
  messagingSenderId: "1083661105099",
  appId: "1:1083661105099:web:2f778140589ff2e956a84e",
  measurementId: "G-EDDZY9JZY1"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Export the auth object and RecaptchaVerifier
export { auth, RecaptchaVerifier };