const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
});

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user === undefined) {
    return res
      .status(404)
      .json({ status: "Error", message: "User not available!" });
  }
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
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
      return res.json({ status: "Success!", id: users.length });
    },
  );
});

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
      return res.json({ status: "Updated!", user: updatedUser[0] });
    },
  );
});

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
      return res.json({ status: "Deleted!", deletedUser: deletedUser[0] });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
