// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAsLK0MiqYZWqWuudUTMTXm0r7QgJpZrqg",
  authDomain: "shopii-afd88.firebaseapp.com",
  projectId: "shopii-afd88",
  storageBucket: "shopii-afd88.appspot.com",
  messagingSenderId: "608320086474",
  appId: "1:608320086474:web:c9958f04d5992173feef33",
  measurementId: "G-KM319TV71C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDb = getStorage(app);