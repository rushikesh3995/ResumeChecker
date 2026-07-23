const express = require("express");
const { improveResume } = require("../services/geminiService");

const router = express.Router();

router.post("/improve", async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }
const improvedResume = await improveResume(resumeText);

    res.json({
      success: true,
      improvedResume,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;