// const express = require("express");
// const analyzeResume = require("../services/geminiService");

// const router = express.Router();

// router.get("/test-ai", async (req, res) => {
//   try {
//     const result = await analyzeResume(
//       "React Developer with 2 years experience in JavaScript, Node.js, Express and PostgreSQL."
//     );

//     res.send(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// module.exports = router;







// const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const router = express.Router();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// router.get("/test-ai", async (req, res) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-flash-latest",
//     });

//     const result = await model.generateContent(
//       "Say Hello from Gemini AI"
//     );

//     res.json({
//       success: true,
//       response: result.response.text(),
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

// router.get("/models", async (req, res) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
//     );

//     const data = await response.json();

//     res.json(data);

//   } catch (err) {
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// module.exports = router;








const express = require("express");
require("dotenv").config();

const router = express.Router();

router.get("/models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;