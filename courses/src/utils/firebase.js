import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB2ziGRv00WKLOd5qL2PiYl_7LSK8O-E5Q",
  authDomain: "courses-2e422.firebaseapp.com",
  projectId: "courses-2e422",
  storageBucket: "courses-2e422.firebasestorage.app",
  messagingSenderId: "509595611413",
  appId: "1:509595611413:web:53d7f25a8a9eaf269e791c"
};


initializeApp(firebaseConfig);

const Db= getFirestore();
const Auth = getAuth();

export {Db,Auth}