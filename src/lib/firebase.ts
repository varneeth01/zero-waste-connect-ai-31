
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOqx6jBReLB-5Hia4IYxBiHdwj9SeuXyU",
  authDomain: "the-tech-26771.firebaseapp.com",
  projectId: "the-tech-26771",
  storageBucket: "the-tech-26771.firebasestorage.app",
  messagingSenderId: "179327878320",
  appId: "1:179327878320:web:101276e60a9aa9371b6775",
  measurementId: "G-KK4KG51JKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
