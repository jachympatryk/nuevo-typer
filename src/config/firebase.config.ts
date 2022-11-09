import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, collection, CollectionReference } from "firebase/firestore";

import { environment } from "config/environment.config";

const firebaseConfig = {
  apiKey: environment.firebaseApiKey,
  authDomain: environment.firebaseAuthDomain,
  projectId: environment.firebaseProjectId,
  storageBucket: environment.firebaseStorageBucket,
  messagingSenderId: environment.firebaseMessagingSender,
  appId: environment.firebaseAppId,
};

const firestoreCollections = {
  games: "games",
  predictions: "predictions",
  teams: "teams",
  users: "users",
  points: "points",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const getCollectionRef = <D>(collectionName: string) => collection(firestore, collectionName) as CollectionReference<D>;

export { auth, analytics, firestore, getCollectionRef, firestoreCollections };
