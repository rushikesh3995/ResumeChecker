const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
// const analyzeResume = require("../services/geminiService");
const { analyzeResume } = require("../services/geminiService");
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

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    // ==========================
    // Verify Firebase User
    // ==========================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await adminAuth.verifyIdToken(token);

    console.log("✅ Logged in User:", decodedToken.uid);

    // ==========================
    // Get User From Firestore
    // ==========================
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = userDoc.data();

    // ==========================
    // Resume Limit Check (admins bypass this)
    // ==========================
    const isAdmin = user.role === "admin";

    if (!isAdmin && user.resumeCount >= user.maxResume) {
      return res.status(403).json({
        success: false,
        message: "Resume limit reached.",
      });
    }

    // ==========================
    // Check Resume File
    // ==========================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    // ==========================
    // Read PDF
    // ==========================
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    console.log("✅ PDF Parsed");

    // ==========================
    // Gemini Analysis
    // ==========================
    console.log("🤖 Sending Resume to Gemini...");

    const aiResponse = await analyzeResume(pdfData.text);

    console.log("✅ Gemini Response Received");

    const analysis = JSON.parse(aiResponse);

    // ==========================
    // Save Resume History
    // ==========================
    await db
      .collection("users")
      .doc(decodedToken.uid)
      .collection("history")
      .add({
        ...analysis,
        createdAt: new Date(),
      });

    // ==========================
    // Increase Resume Count (skip for admins - unlimited)
    // ==========================
    if (!isAdmin) {
      await userRef.update({
        resumeCount: user.resumeCount + 1,
      });
    }

    // ==========================
    // Delete Uploaded File
    // ==========================
    fs.unlinkSync(req.file.path);

    // ==========================
    // Send Response
    // ==========================
    res.json({
      success: true,
      message: "Your Resume analyzed successfully!",
      analysis,
    });

  } catch (error) {
    console.error("❌ Upload Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;