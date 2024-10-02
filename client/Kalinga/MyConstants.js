import dotenv from 'dotenv'

dotenv.config()

//wifi at home for localHost
// export const BASED_URL = "http://192.168.1.104:7000"

//PC
// export const BASED_URL = "http://192.168.1.127:7000"

// export const BASED_URL = "http://192.168.161.93:7000"

// export const BASED_URL = "http://192.168.254.106:7000"

//vercel
export const BASED_URL = "https://capstone1-kalinga.vercel.app/"

//Data
// export const BASED_URL = "http://192.168.39.93:7000"
// https://capstone1-kalinga.onrender.com


// export const BASED_URL = "http://192.168.1.5:7000"

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY


export const firebaseConfig = {
    apiKey: process.env.OLD_API_KEY,
    authDomain: process.env.OLD_AUTH_DOMAIN,
    projectId: process.env.OLD_PROJECT_ID,
    storageBucket: process.env.OLD_STORAGE_BUCKET,
    messagingSenderId: process.env.OLD_MESSAGING_SENDER_ID,
    appId: process.env.OLD_APP_ID
}

export const oldFirebaseConfig = {
    apiKey: process.env.NEW_API_KEY,
    authDomain: process.env.NEW_AUTH_DOMAIN,
    projectId: process.env.NEW_PROJECT_ID,
    storageBucket: process.env.NEW_STORAGE_BUCKET,
    messagingSenderId: process.env.NEW_MESSAGING_SENDER_ID,
    appId: process.env.NEW_APP_ID,
    measurementId: process.env.NEW_MEASUREMENT_ID
}