import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCptDyDiLBefXVRTohnf6MVnVtAOnvOz5s",
  authDomain: "linkedin-b14fd.firebaseapp.com",
  projectId: "linkedin-b14fd",
  storageBucket: "linkedin-b14fd.appspot.com",
  messagingSenderId: "860001452763",
  appId: "1:860001452763:web:8d34776f276d3915a4c2fe",
  measurementId: "G-KXME75CVWD"
};

  const firebaseApp= firebase.initializeApp(firebaseConfig)

  const db=firebaseApp.firestore()
  const auth= firebase.auth()

  export const imageConfig = {
    quality: 0.2,
    maxWidth: 80,
    maxHeight: 60,
    autoRotate: true
  };

  export {db, auth}