import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCnqBr3BVAOvq4dxogXGta1C4JRfJSYbn0",
  authDomain: "e-commerceproject-12b0b.firebaseapp.com",
  projectId: "e-commerceproject-12b0b",
  storageBucket: "e-commerceproject-12b0b.firebasestorage.app",
  messagingSenderId: "19803051736",
  appId: "1:19803051736:web:b23f473d97e28e113829ad"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}