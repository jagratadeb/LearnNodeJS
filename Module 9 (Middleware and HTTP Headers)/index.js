// HTTP status codes used in this file:
// 200 - OK
// 201 - Created
// 400 - Bad Request
// 404 - Not Found
// 500 - Internal Server Error

const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Parse form data from incoming requests.
app.use(express.urlencoded({ extended: false }));

// Log each request to a file.
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
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
app.get("/api/users", (req, res) => {
  // Custom headers should start with "x".
  res.setHeader("x-custom-header", "Jagrata Deb");
  console.log(req.headers);
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
app.post("/api/users", (req, res) => {
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
  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to save" });
      }
      return res.status(201).json({ status: "Success!", id: users.length });
    },
  );
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
