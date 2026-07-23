const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

console.log("===== TEST FILE RUNNING =====");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  console.log("Using model: gemini-2.0-flash");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Say Hello",
  });

  console.log(response.text);
}

test().catch(console.error);