import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalStorage } from "quasar";
import { getFirestore } from "firebase/firestore";


export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDAZHK1bF8fsQM6hzKoACVFuY1y_G5aE0E",
    authDomain: "codesnippetmanager-d5862.firebaseapp.com",
    projectId: "codesnippetmanager-d5862",
    storageBucket: "codesnippetmanager-d5862.appspot.com",
    messagingSenderId: "164352528273",
    appId: "1:164352528273:web:699006d59793e4941a1430",
    measurementId: "G-ES9ST0K81D",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const firebaseDbPromise = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        LocalStorage.set("user", user);
      } else {
        LocalStorage.remove("user");
      }

      // Resolve the promise with the firestore instance
      resolve(firestore);
    });
  });

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("$firebaseDb", firebaseDbPromise);

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseDb: firestore,
    },
  };
});
