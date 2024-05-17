import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { defineNuxtPlugin } from '#app';


export default defineNuxtPlugin(nuxtApp => {
  const firebaseConfig = {
    apiKey: "AIzaSyD8-E0xpbkqKQyQBuPT-o9gfN9BhVnv7iE",
    authDomain: "nuxt-test-9d62d.firebaseapp.com",
    projectId: "nuxt-test-9d62d",
    storageBucket: "nuxt-test-9d62d.appspot.com",
    messagingSenderId: "275826543618",
    appId: "1:275826543618:web:8604fdeac4e1eb465aeb1b",
    measurementId: "G-22P9NDB8G9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.provide('firebaseAuth', auth);
  nuxtApp.provide('firestore', firestore);
});