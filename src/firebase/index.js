import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtw8akuL1p-X7JfniAmcmHVwnFL0J75Ks",
  authDomain: "crud-app-full-stack.firebaseapp.com",
  projectId: "crud-app-full-stack",
  storageBucket: "crud-app-full-stack.appspot.com",
  messagingSenderId: "918010016796",
  appId: "1:918010016796:web:c55cc1997a8b1bab0a1bd9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}