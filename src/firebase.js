import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2fNwVA1r2Wj5KIJFNUkKs-g68IYdryL8",
    authDomain: "bodachat-3f2c4.firebaseapp.com",
    projectId: "bodachat-3f2c4",
    storageBucket: "bodachat-3f2c4.appspot.com",
    messagingSenderId: "717179804601",
    appId: "1:717179804601:web:0ed3197fdf8ca600a3b468"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
