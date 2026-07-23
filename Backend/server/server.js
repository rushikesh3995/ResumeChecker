// const express = require("express");
// const cors = require("cors");

// const uploadRoutes = require("./routes/uploadRoutes");
// const testRoutes = require ("./routes/testRoutes")
// const app = express();

// // app.use("/api", testRoutes);
// app.use(cors());
// app.use(express.json());

// app.use("/api", uploadRoutes);
// app.use("/", testRoutes);

// app.get("/", (req, res) => {
//   res.send("ResumeChecker API is Running 🚀");
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });















const { db } = require("./config/firebaseAdmin");
const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const testRoutes = require("./routes/testRoutes");
const improveRoutes = require("./routes/improveRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);
app.use("/api", adminRoutes);
app.use("/api", paymentRoutes);
app.use("/", testRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("ResumeChecker API is Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle Server Errors
server.on("error", (err) => {
  console.error("❌ Server Error:", err);
});

// Handle Process Exit
process.on("exit", (code) => {
  console.log(`⚠ Process exited with code ${code}`);
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Promise Rejection:", reason);
});


db.collection("test")
  .doc("connection")
  .set({
    message: "Backend Connected Successfully",
    time: new Date(),
  })
  .then(() => console.log("✅ Firestore Connected"))
  .catch((err) => console.log(err));


  app.use("/api", improveRoutes);