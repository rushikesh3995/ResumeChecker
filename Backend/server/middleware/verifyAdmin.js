const { adminAuth, db } = require("../config/firebaseAdmin");

// Verifies the Firebase ID token AND checks that the caller's
// Firestore user doc has role === "admin". Attaches req.uid + req.userDoc.
async function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);

    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userData = userDoc.data();

    if (userData.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admins only." });
    }

    req.uid = decodedToken.uid;
    req.userDoc = userData;

    next();
  } catch (error) {
    console.error("❌ Admin Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
}

module.exports = verifyAdmin;
