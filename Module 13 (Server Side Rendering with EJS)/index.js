const express = require("express");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const { handleGetAll } = require("./controllers/url");
const path = require("path");
const stacticRoute = require("./routes/staticRouter");
const deleteUrl = require("./routes/delete");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

connectToMongoDB("mongodb://localhost:27017/LearnNodeJSDB")
  .then(async () => {
    await URL.createCollection();
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/all", handleGetAll);
app.use("/", stacticRoute);
app.use("/url", urlRoute);
app.use("/delete", deleteUrl);
app.use("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  if (!entry || !entry.redirectUrl) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("Server started!");
});
