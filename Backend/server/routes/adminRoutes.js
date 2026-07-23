const express = require("express");
const { db } = require("../config/firebaseAdmin");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// ==========================
// GET all users + their upload counts
// ==========================
router.get("/admin/users", verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, users });
  } catch (error) {
    console.error("❌ Admin Users Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================
// PATCH a user's resume limit (or reset their count)
// ==========================
router.patch("/admin/users/:uid/limit", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    const { maxResume, resumeCount } = req.body;

    const update = {};
    if (maxResume !== undefined) update.maxResume = Number(maxResume);
    if (resumeCount !== undefined) update.resumeCount = Number(resumeCount);

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: "Nothing to update." });
    }

    await db.collection("users").doc(uid).update(update);

    res.json({ success: true, message: "User updated." });
  } catch (error) {
    console.error("❌ Admin Update User Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================
// GET every resume analysis across all users (searchable history)
// ==========================
router.get("/admin/history", verifyAdmin, async (req, res) => {
  try {
    // collectionGroup lets us query every "history" subcollection at once,
    // across every user, in a single call.
    const snapshot = await db.collectionGroup("history").get();

    // Build a quick uid -> {name, email} lookup so each history item
    // can show who it belongs to.
    const usersSnapshot = await db.collection("users").get();
    const userMap = {};
    usersSnapshot.docs.forEach((doc) => {
      userMap[doc.id] = doc.data();
    });

    const history = snapshot.docs.map((doc) => {
      const uid = doc.ref.parent.parent.id; // users/{uid}/history/{docId}
      const owner = userMap[uid] || {};

      return {
        id: doc.id,
        uid,
        ownerName: owner.name || "Unknown",
        ownerEmail: owner.email || "Unknown",
        ...doc.data(),
      };
    });

    // Most recent first
    history.sort((a, b) => {
      const aTime = a.createdAt?._seconds || 0;
      const bTime = b.createdAt?._seconds || 0;
      return bTime - aTime;
    });

    res.json({ success: true, history });
  } catch (error) {
    console.error("❌ Admin History Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================
// GET all payment verification requests
// ==========================
router.get("/admin/payments", verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db
      .collection("payments")
      .orderBy("submittedAt", "desc")
      .get();

    const payments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, payments });
  } catch (error) {
    console.error("❌ Admin Payments Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================
// PATCH approve or reject a payment request
// ==========================
router.patch("/admin/payments/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "approved" | "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const paymentRef = db.collection("payments").doc(id);
    const paymentSnap = await paymentRef.get();

    if (!paymentSnap.exists) {
      return res.status(404).json({ success: false, message: "Payment not found." });
    }

    const payment = paymentSnap.data();

    // Update the payment request itself
    await paymentRef.update({
      status,
      reviewedAt: new Date(),
      reviewedBy: req.uid,
    });

    // If approved, upgrade the user's account to premium
    if (status === "approved") {
      await db.collection("users").doc(payment.uid).update({
        plan: "premium",
        paymentStatus: true,
        maxResume: 9999,
      });
    }

    res.json({ success: true, message: `Payment ${status}.` });
  } catch (error) {
    console.error("❌ Admin Payment Update Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
