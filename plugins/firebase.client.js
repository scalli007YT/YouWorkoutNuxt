import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyBvFnSEvcdP4Es_TeD6YkMmUsJG_hiYXfs",
    authDomain: "youworkout-53fdf.firebaseapp.com",
    projectId: "youworkout-53fdf",
    storageBucket: "youworkout-53fdf.firebasestorage.app",
    messagingSenderId: "350259687957",
    appId: "1:350259687957:web:4b758c480fb4c3632bd41c",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    provide: {
      firebaseApp: app,
      db,
    },
  };
});
