// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add this import
import auth from '@react-native-firebase/auth';

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authInstance = auth();
// Initialize Firebase Authentication

// export const analytics = getAnalytics(app);
export const storage = getStorage(app)
