const express = require("express");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/LearnNodeJSDB")
  .then(async () => {
    await URL.createCollection();
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/url", urlRoute);
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

  return res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => {
  console.log("Server started!");
});
