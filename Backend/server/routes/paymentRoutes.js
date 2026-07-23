const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { adminAuth, db } = require("../config/firebaseAdmin");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/payment/submit", upload.single("screenshot"), async (req, res) => {
  let localFilePath;

  try {
    // ==========================
    // Verify Firebase User
    // ==========================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No screenshot uploaded." });
    }

    localFilePath = req.file.path;

    // ==========================
    // Get User Info From Firestore
    // ==========================
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userData = userDoc.data();

    // ==========================
    // Upload screenshot to Cloudinary (free tier, no billing required)
    // ==========================
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "payment-screenshots",
      public_id: `${decodedToken.uid}_${Date.now()}`,
    });

    // ==========================
    // Save payment request in Firestore for admin review
    // ==========================
    await db.collection("payments").add({
      uid: decodedToken.uid,
      name: userData.name || "Unknown",
      email: userData.email || decodedToken.email,
      screenshotUrl: result.secure_url,
      status: "pending",
      submittedAt: new Date(),
    });

    res.json({ success: true, message: "Payment submitted for verification." });
  } catch (error) {
    console.error("❌ Payment Submission Error:", error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    // Always clean up the local temp file, whether upload succeeded or not
    if (localFilePath) {
      fs.unlink(localFilePath, () => {});
    }
  }
});

module.exports = router;
