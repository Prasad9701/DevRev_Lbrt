import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOMQhw_jZJm532PAvnm2JNEHBZYEFGG98",
  authDomain: "librart-managem.firebaseapp.com",
  projectId: "librart-managem",
  storageBucket: "librart-managem.appspot.com",
  messagingSenderId: "1061091786750",
  appId: "1:1061091786750:web:eaf321ef14f42f0ea34aaf",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
