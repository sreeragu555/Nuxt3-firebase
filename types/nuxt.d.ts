// types/nuxt.d.ts
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare module '#app' {
  interface NuxtApp {
    $firebaseAuth: Auth;
    $firestore: Firestore;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $firebaseAuth: Auth;
    $firestore: Firestore;
  }
}
