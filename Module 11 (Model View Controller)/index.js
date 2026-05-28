const path = require("path");
const express = require("express");
require("./connection");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.redirect("/users"));

app.use("/users", usersRouter);

app.use((req, res) =>
  res.status(404).render("404", {
    title: "Not found",
    path: req.originalUrl,
  }),
);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
