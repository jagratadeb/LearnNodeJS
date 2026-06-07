const express = require("express");
const path = require("path");
const connectToMongoDB = require("../connect");
const URL = require("../models/url");
const urlRoute = require("../routes/url");
const deleteRoute = require("../routes/delete");
const staticRoute = require("../routes/staticRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "..", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use("/delete", deleteRoute);

// Redirect handler (keep last)
app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );

  if (!entry || !entry.redirectUrl)
    return res.status(404).send("Short URL not found");
  return res.redirect(entry.redirectUrl);
});

app.listen(8000, () => console.log("Example server listening on 8000"));
