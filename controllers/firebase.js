import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDtLaxU5sSaySCyDlPZ5i9XtuGhB166fvs",
  authDomain: "crudapp-c65a8.firebaseapp.com",
  projectId: "crudapp-c65a8",
  storageBucket: "crudapp-c65a8.appspot.com",
  messagingSenderId: "9530693199",
  appId: "1:9530693199:web:4dfd2145ce09d5aad17c3a",
  measurementId: "G-DRYTPMZ3SG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }

{/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtLaxU5sSaySCyDlPZ5i9XtuGhB166fvs",
  authDomain: "crudapp-c65a8.firebaseapp.com",
  projectId: "crudapp-c65a8",
  storageBucket: "crudapp-c65a8.appspot.com",
  messagingSenderId: "9530693199",
  appId: "1:9530693199:web:4dfd2145ce09d5aad17c3a",
  measurementId: "G-DRYTPMZ3SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */}
