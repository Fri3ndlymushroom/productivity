
import firebase from "firebase/app";
import "firebase/functions"
import "firebase/firestore"
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCV8PVK9t12Uvn6P_52Hbj7oUz2ZzDsKAA",
  authDomain: "productivity-c25db.firebaseapp.com",
  projectId: "productivity-c25db",
  storageBucket: "productivity-c25db.appspot.com",
  messagingSenderId: "463334890779",
  appId: "1:463334890779:web:5066be54fc913e8a30c7be",
  measurementId: "G-WL2RMVXJPD"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase

// netstat -aon | findstr :8080
// taskkill /PID 18688 /F