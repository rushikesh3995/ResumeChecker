// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// module.exports = { admin, db };










// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// module.exports = { admin, db };












// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.cert(serviceAccount),
// });

// const db = admin.firestore();

// module.exports = { admin, db };












// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");

// const serviceAccount = require("./serviceAccountKey.json");

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// const adminAuth = getAuth(app);
// const db = getFirestore(app);

// module.exports = {
//   adminAuth,
//   db,
// };









// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");

// const serviceAccount = {
//   "project_id": "resumechecker-57849",
//   "private_key_id": "190d3c8db1ead5909e4afd5a5f52d472203d9da9",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQOdmwcTp80UMq\nh/tQSzaCj6WP+3XEfC/2fylt5ddx2CeqIQx95SZt9z/0Dk+CynI2iOqk4LhKalsd\nuF+bn1bbt7joo1uEEwOrXcpVLEBWneUP5wLiV3k20VgU0WpbtihwLvuQdkon64u8\n5PAUb/9Yr88p/d0+rRo9YtBwjJUcUa9cD7LVMyOMy7T1lb51+KwFlCHL2Hur9nm3\nS22k/gbSWoxdm4lzFbMoQyG5c4iLKqgKUmPUJMvJlLXtnhDL8O1Sf5GjarwOj1hs\n0lnRTOLRoK8ZjoR8rMFBX60b4ehk/TxXD9kRZRPgYu/YHJzdiRVKUyE0hWrMS+v/\nkpdbeZnVAgMBAAECggEAHl9HKNIQl+2Q1dP+jQMLhmvG2IOd9UparKJ2Zo35/k8V\n1LOmtiOwlqWpRxi3RvqZ7OkiYL5ZOJw0LNecin8+v3nC7PFhre11bDpCrb3F/LG3\nRw8z1Slb3ZUXkKHN2RFu6z4kejk8Ln/QYtMkpGEvERPugc+CcAahJzG8pE4SieNU\nx4VxtZoIUVp/sXak2KATuRCMFyU7zlpu6elJVQUiilQAdyoUw3NvaTvgBPPzGWs5\nIxHGUdqUfEM//XLp87B8By6edKPijqdMadQLkwIogoa5t2p9+k8RIDydrGOwjizM\nY+ztV79GtDc+7tkJmtwiHEXYw5D43Dv/uxLDhJiTmQKBgQD44BWskwh9WOLPdNIY\nG4MUa+dgy3OZMJGQC0Zo42ldzdzY1TkTWviAw/d9QXH/eopSIBFxHWQKhwL0hFMM\nxVUnvAuS6Y4vXxHCC65Picbcj4S20kxPH9XwKlhN6TjJsGdJM0/bbkB0MJCX8NML\nvrH3WhYavrmycAfc2ukBneEvVwKBgQDWL9yRrvROPNUa0HPtEon4sTdazIxMIbXK\nXZ6z/zvegLx4cUSF6DCwAh7wjkCOeT0Xa5hWysvMDn+Ap/hRIumMgF50plawN5vb\nKAP0qplohd2VYnGbjU0OoaZJlhFOEvnlVmH1aBpmSKp/3+68BmNdfFXQTwHk0Zxz\nyjQu1TaAswKBgQCO7AEGbhm+AkGeabQNbB9GpwDlMXFdU+sEEbWJnq9v0z00uJ5i\nYye6qs+B+weAc9rjds8Napd9BDPKQAOBngFdJDxxTfb9dVc5XIPp4XF2UGUiqHpy\nJhIyLd8wPvMBwHBQNUty9EnHb+xZlU9du1FwfyeajFUQCA474utUplofWQKBgA+1\nzQDmi0bd0We5GHewH2ydWwkO7c97vYDNYyGiu/pzCN/wtuz3ffK7BRfx5yxMGj4I\nh1D+aPpbqeB+8YjJ/cVveP4nYT5lpcnqYnfkt4HiJ8GYSer170v+cVr+ZeCLJcc7\nkc3VR/JurArbGwCxm0I1J3ozAVmOQmJ/11oEC45fAoGBAIpqhbVASr7hsaRpuUAf\n16i6gibBLioVk1gJ4xiWQla587b7amy4t3hNNwrytZg2T7QpH7tMEBUSW2awO4xw\nRBAEhIQ/02q72lL+KsIyBLF/LhrSOq63jGz1X4txZhb2411GKtwuj2tDHg+LUYFn\nS/mA1HDZ3ALXF97EFFwPLuO0\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@resumechecker-57849.iam.gserviceaccount.com",
//   "client_id": "100025840525700091389",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40resumechecker-57849.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// };

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// const adminAuth = getAuth(app);
// const db = getFirestore(app);

// module.exports = {
//   adminAuth,
//   db,
// };












// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");

// const serviceAccount = require("./serviceAccountKey.json");

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// const adminAuth = getAuth(app);
// const db = getFirestore(app);

// module.exports = {
//   adminAuth,
//   db,
// };









const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = {
  projectId: process.env.resumechecker-57849,
  clientEmail:"firebase-adminsdk-fbsvc@resumechecker-57849.iam.gserviceaccount.com ",
  privateKey:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQOdmwcTp80UMq\nh/tQSzaCj6WP+3XEfC/2fylt5ddx2CeqIQx95SZt9z/0Dk+CynI2iOqk4LhKalsd\nuF+bn1bbt7joo1uEEwOrXcpVLEBWneUP5wLiV3k20VgU0WpbtihwLvuQdkon64u8\n5PAUb/9Yr88p/d0+rRo9YtBwjJUcUa9cD7LVMyOMy7T1lb51+KwFlCHL2Hur9nm3\nS22k/gbSWoxdm4lzFbMoQyG5c4iLKqgKUmPUJMvJlLXtnhDL8O1Sf5GjarwOj1hs\n0lnRTOLRoK8ZjoR8rMFBX60b4ehk/TxXD9kRZRPgYu/YHJzdiRVKUyE0hWrMS+v/\nkpdbeZnVAgMBAAECggEAHl9HKNIQl+2Q1dP+jQMLhmvG2IOd9UparKJ2Zo35/k8V\n1LOmtiOwlqWpRxi3RvqZ7OkiYL5ZOJw0LNecin8+v3nC7PFhre11bDpCrb3F/LG3\nRw8z1Slb3ZUXkKHN2RFu6z4kejk8Ln/QYtMkpGEvERPugc+CcAahJzG8pE4SieNU\nx4VxtZoIUVp/sXak2KATuRCMFyU7zlpu6elJVQUiilQAdyoUw3NvaTvgBPPzGWs5\nIxHGUdqUfEM//XLp87B8By6edKPijqdMadQLkwIogoa5t2p9+k8RIDydrGOwjizM\nY+ztV79GtDc+7tkJmtwiHEXYw5D43Dv/uxLDhJiTmQKBgQD44BWskwh9WOLPdNIY\nG4MUa+dgy3OZMJGQC0Zo42ldzdzY1TkTWviAw/d9QXH/eopSIBFxHWQKhwL0hFMM\nxVUnvAuS6Y4vXxHCC65Picbcj4S20kxPH9XwKlhN6TjJsGdJM0/bbkB0MJCX8NML\nvrH3WhYavrmycAfc2ukBneEvVwKBgQDWL9yRrvROPNUa0HPtEon4sTdazIxMIbXK\nXZ6z/zvegLx4cUSF6DCwAh7wjkCOeT0Xa5hWysvMDn+Ap/hRIumMgF50plawN5vb\nKAP0qplohd2VYnGbjU0OoaZJlhFOEvnlVmH1aBpmSKp/3+68BmNdfFXQTwHk0Zxz\nyjQu1TaAswKBgQCO7AEGbhm+AkGeabQNbB9GpwDlMXFdU+sEEbWJnq9v0z00uJ5i\nYye6qs+B+weAc9rjds8Napd9BDPKQAOBngFdJDxxTfb9dVc5XIPp4XF2UGUiqHpy\nJhIyLd8wPvMBwHBQNUty9EnHb+xZlU9du1FwfyeajFUQCA474utUplofWQKBgA+1\nzQDmi0bd0We5GHewH2ydWwkO7c97vYDNYyGiu/pzCN/wtuz3ffK7BRfx5yxMGj4I\nh1D+aPpbqeB+8YjJ/cVveP4nYT5lpcnqYnfkt4HiJ8GYSer170v+cVr+ZeCLJcc7\nkc3VR/JurArbGwCxm0I1J3ozAVmOQmJ/11oEC45fAoGBAIpqhbVASr7hsaRpuUAf\n16i6gibBLioVk1gJ4xiWQla587b7amy4t3hNNwrytZg2T7QpH7tMEBUSW2awO4xw\nRBAEhIQ/02q72lL+KsIyBLF/LhrSOq63jGz1X4txZhb2411GKtwuj2tDHg+LUYFn\nS/mA1HDZ3ALXF97EFFwPLuO0\n-----END PRIVATE KEY-----\n",
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

module.exports = {
  adminAuth: getAuth(app),
  db: getFirestore(app),
};