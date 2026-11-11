
// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");

// const serviceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY
//     ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
//     : undefined,
// };

// if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
//   throw new Error(
//     "Missing Firebase credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY as environment variables."
//   );
// }

// const app = initializeApp({ credential: cert(serviceAccount) });
// const adminAuth = getAuth(app);
// const db = getFirestore(app);

// module.exports = { adminAuth, db };








// Load environment variables
require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

// Firebase credentials
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

// Validate credentials
if (
  !serviceAccount.projectId ||
  !serviceAccount.clientEmail ||
  !serviceAccount.privateKey
) {
  throw new Error(
    "Missing Firebase credentials. Check your server/.env file."
  );
}

// Initialize Firebase only once
const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

const adminAuth = getAuth(app);
const db = getFirestore(app);

module.exports = { adminAuth, db };
