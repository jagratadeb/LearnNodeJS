// Simple Express + Mongoose example for managing users.
// Purpose: demonstrate connecting to MongoDB, defining a User model,
// and implementing robust REST endpoints for common operations.

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/LearnNodeJSDB";

// Small helper: map incoming body (snake_case or camelCase) to model fields.
function mapBodyToUpdates(body = {}) {
  const updates = {};
  if (!body) return updates;
  if (body.first_name) updates.firstName = body.first_name;
  if (body.last_name) updates.lastName = body.last_name;
  if (body.job_title) updates.jobTitle = body.job_title;
  if (body.email) updates.email = body.email;
  if (body.gender) updates.gender = body.gender;
  // also accept camelCase directly
  ["firstName", "lastName", "jobTitle", "email", "gender"].forEach((k) => {
    if (body[k] !== undefined) updates[k] = body[k];
  });
  return updates;
}

// connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message || err);
    process.exitCode = 1;
  });

// Define User schema and model
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// GET /api/users - list users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}).lean();
    return res.status(200).json({ message: "success", users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /api/users/:id - get user by _id
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});

// POST /api/users - create
app.post("/api/users", async (req, res) => {
  try {
    const body = req.body || {};
    const firstName = body.first_name || body.firstName;
    const lastName = body.last_name || body.lastName;
    const email = body.email;
    const gender = body.gender;
    const jobTitle = body.job_title || body.jobTitle;

    if (!firstName || !email) {
      return res
        .status(400)
        .json({ error: "firstName and email are required" });
    }

    const created = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle,
    });
    return res.status(201).json({ message: "created", user: created });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "Failed to create user" });
  }
});

// PATCH /api/users/:id - update by _id
app.patch("/api/users/:id", async (req, res) => {
  try {
    const updates = mapBodyToUpdates(req.body);
    if (Object.keys(updates).length === 0)
      return res.status(400).json({ error: "No updatable fields provided" });

    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ message: "updated", user: updated });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid request" });
  }
});

// PATCH /api/users/by-email - update by email (clients only need to know email)
app.patch("/api/users/by-email", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const updates = mapBodyToUpdates(req.body);
    if (Object.keys(updates).length === 0)
      return res.status(400).json({ error: "No updatable fields provided" });

    const updated = await User.findByIdAndUpdate(user._id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    return res.status(200).json({ message: "updated", user: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE /api/users/:id - delete by _id
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ message: "deleted", user: deleted });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid id" });
  }
});

// DELETE /api/users/by-email - delete by email
app.delete("/api/users/by-email", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email required" });
    const deleted = await User.findOneAndDelete({ email }).lean();
    if (!deleted) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ message: "deleted", user: deleted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete" });
  }
});

// Generic 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Start server
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
