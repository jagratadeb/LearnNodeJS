const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/LearnNodeJSDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message || err);
    process.exitCode = 1;
  });
