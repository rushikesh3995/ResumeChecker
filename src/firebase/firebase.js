// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBbtpVVwHIguoF4_pE1di2NFJ0U1Rr3Uz0",
//   authDomain: "resumechecker-57849.firebaseapp.com",
//   projectId: "resumechecker-57849",
//   storageBucket: "resumechecker-57849.firebasestorage.app",
//   messagingSenderId: "104423675229",
//   appId: "1:104423675229:web:117fc156cfd12e5ceb84b4",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export default app;
























import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbtpVVwHIguoF4_pE1di2NFJ0U1Rr3Uz0",
  authDomain: "resumechecker-57849.firebaseapp.com",
  projectId: "resumechecker-57849",
  storageBucket: "resumechecker-57849.firebasestorage.app",
  messagingSenderId: "104423675229",
  appId: "1:104423675229:web:117fc156cfd12e5ceb84b4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;