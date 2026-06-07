const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: "Missing url" });
  const shortId = nanoid(8);
  await URL.create({ shortId, redirectUrl: url, visitHistory: [] });
  return res.status(201).render("home", { id: shortId });
}

async function handleGetAll(req, res) {
  const urls = await URL.find().sort({ createdAt: -1 });
  return res.render("home", { urls });
}

async function deleteUrl(req, res) {
  const { shortId } = req.body || {};
  if (!shortId) return res.status(400).json({ error: "Missing shortId" });
  const deletedUrl = await URL.findOneAndDelete({ shortId });
  if (!deletedUrl) {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.redirect("/");
  }
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.json({ message: "URL deleted successfully" });
  }
  return res.redirect("/");
}

module.exports = { handleGenerateNewShortURL, handleGetAll, deleteUrl };
