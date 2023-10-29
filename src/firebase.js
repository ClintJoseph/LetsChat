import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCKlnlYs5oUa_mi1cW9IdWh_XQXmoxAsM",
  authDomain: "chatapp-139e6.firebaseapp.com",
  projectId: "chatapp-139e6",
  storageBucket: "chatapp-139e6.appspot.com",
  messagingSenderId: "455923790493",
  appId: "1:455923790493:web:9ce3cac01fa5eefd115a74"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db = getFirestore();