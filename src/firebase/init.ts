import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQLpHwSb7M1XrVnE6ax6kZ6bNgWEyAlfk",
  authDomain: "stocks-tracker-dev.firebaseapp.com",
  projectId: "stocks-tracker-dev",
  storageBucket: "stocks-tracker-dev.appspot.com",
  messagingSenderId: "926369570693",
  appId: "1:926369570693:web:a722ab131c664680d5aeec",
  measurementId: "G-E5HE3JR699"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);