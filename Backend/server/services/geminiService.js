






// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ==========================
// // Analyze Resume
// // ==========================
// async function analyzeResume(resumeText) {
//   try {
//     console.log("Creating Gemini model...");

//     const model = genAI.getGenerativeModel({
//       // model: "gemini-2.5-flash",
//       model: "gemini-2.5-flash-lite",
//     });

//     console.log("Sending prompt to Gemini...");

//     const result = await model.generateContent(`
// You are an ATS Resume Analyzer.

// Analyze the following resume and return ONLY valid JSON.

// Resume:
// ${resumeText}

// Return:
// {
//   "atsScore": 0,
//   "strengths": [],
//   "weaknesses": [],
//   "missingKeywords": [],
//   "suggestions": []
// }
// `);

//     console.log("Gemini replied successfully.");

//     return result.response.text();

//   } catch (error) {
//     console.log("========= GEMINI ERROR =========");
//     console.error(error);
//     console.log("===============================");
//     throw error;
//   }
// }

// // ==========================
// // Improve Resume
// // ==========================
// async function improveResume(resumeText) {
//   try {
//     const model = genAI.getGenerativeModel({
//       // model: "gemini-2.5-flash",
//       model: "gemini-2.5-flash-lite",
//     });

//     const result = await model.generateContent(`
// You are a professional Resume Writer.

// Rewrite the following resume to make it ATS-friendly.

// Rules:
// - Improve the professional summary.
// - Improve project descriptions.
// - Improve skills section.
// - Use professional language.
// - Keep the resume truthful.
// - Return plain text only.

// Resume:
// ${resumeText}
// `);

//     return result.response.text();

//   } catch (error) {
//     console.log("========= IMPROVE ERROR =========");
//     console.error(error);
//     throw error;
//   }
// }

// module.exports = {
//   analyzeResume,
//   improveResume,
// };









const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================
// Analyze Resume
// ==========================
async function analyzeResume(resumeText) {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Resume:
${resumeText}

Return ONLY this JSON:

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}
`;

    const response = await ai.models.generateContent({
      // model: "models/gemini-2.5-flash",
    //  model: "models/gemini-2.5-pro",
    model: "models/gemini-3.1-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("========= GEMINI ANALYZE ERROR =========");
    console.error(error);
    throw error;
  }
}

// ==========================
// Improve Resume
// ==========================
async function improveResume(resumeText) {
  try {
    const prompt = `
You are a professional Resume Writer.

Rewrite the following resume to make it ATS-friendly.

Rules:
- Improve professional summary.
- Improve project descriptions.
- Improve skills.
- Keep everything truthful.
- Return plain text only.

Resume:
${resumeText}
`;

    const response = await ai.models.generateContent({
      // model: "models/gemini-2.5-flash",
    //  model: "models/gemini-2.5-pro",
    model: "models/gemini-3.1-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("========= GEMINI IMPROVE ERROR =========");
    console.error(error);
    throw error;
  }
}

module.exports = {
  analyzeResume,
  improveResume,
};