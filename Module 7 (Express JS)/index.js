const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from home page!");
});

app.get("/about", (req, res) => {
  return res.send(
    `Hello ${req.query.name ? req.query.name : "User"}, you are at the about page!`,
  );
});

app.listen(4000, () => {
  console.log("Server started!");
});
