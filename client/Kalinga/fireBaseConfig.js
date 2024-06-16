// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add this import
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeTF5yTbBahGgIhpg1fLjQvDyrrLuWr4g",
  authDomain: "kalinga-storage.firebaseapp.com",
  projectId: "kalinga-storage",
  storageBucket: "kalinga-storage.appspot.com",
  messagingSenderId: "900985988920",
  appId: "1:900985988920:web:4298d5be175d37297e03cd",
  measurementId: "G-X3BWSEQ9R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authInstance = auth();
// Initialize Firebase Authentication

// export const analytics = getAnalytics(app);
export const storage = getStorage(app)
