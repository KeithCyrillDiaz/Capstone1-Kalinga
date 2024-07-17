// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./MyConstants";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add this import
// import auth from '@react-native-firebase/auth';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("app: ", app)
// export const authInstance = auth();
// Initialize Firebase Authentication   

// export const analytics = getAnalytics(app);
export const storage = getStorage(app)
