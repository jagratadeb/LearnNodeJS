const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
