import { initializeApp,getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { GoogleAuthProvider,getAuth,signOut } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDUewB9BzHiQ8nhn_2RGqrnEPuo8_kKxzY",
    authDomain: "filmverse-3bcd7.firebaseapp.com",
    projectId: "filmverse-3bcd7",
    storageBucket: "filmverse-3bcd7.appspot.com",
    messagingSenderId: "429444907556",
    appId: "1:429444907556:web:d723c8e3203b7c5cd2ceb1",
    measurementId: "G-Y5BS1QGT6T"
};
//initialize firebase
const movie_app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore()
const auth = getAuth(movie_app)
const storage = getStorage()
  export {movie_app,db,storage,auth}