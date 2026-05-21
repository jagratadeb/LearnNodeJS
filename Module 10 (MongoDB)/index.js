// Steps for MongoDB:
// 1. Install mongoose: npm install mongoose
// 2. Connect to MongoDB using mongoose.connect().
// 3. Define a schema using mongoose.Schema, which describes the structure of your data.
// 4. Define a model using mongoose.model, which provides an interface for interacting with your data.
// 5. Use the model to perform CRUD operations in your routes.

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/LearnNodeJSDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

// Parse form data from incoming requests.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Log each request to a file.
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err) => {
      if (err) console.error("Failed to write log:", err);
      next();
    },
  );
});

// Example middleware that runs before the routes.
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

// Another example middleware in the chain.
app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

// Read request headers and send a custom response header.
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

// Return a single user by id.
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user === undefined) {
    return res
      .status(404)
      .json({ status: "Error", message: "User not available!" });
  }
  return res.status(200).json(user);
});

// Create a new user.
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ message: "success" });
});

// Update an existing user.
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const index = users.findIndex((user) => user.id == id);
  if (index === -1) {
    return res
      .status(404)
      .json({ status: "Error", message: "User not available!" });
  }
  const originalUser = users[index];
  const updatedUser = users.splice(index, 1, {
    ...originalUser,
    ...body,
  });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to save" });
      }
      return res.status(200).json({ status: "Updated!", user: updatedUser[0] });
    },
  );
});

// Delete a user by id.
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id == id);

  if (index === -1) {
    return res
      .status(404)
      .json({ status: "Error", message: "User not found!" });
  }
  const deletedUser = users.splice(index, 1);
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to save" });
      }
      return res
        .status(200)
        .json({ status: "Deleted!", deletedUser: deletedUser[0] });
    },
  );
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
