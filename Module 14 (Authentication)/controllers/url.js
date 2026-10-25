const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGetAll(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const urls = await URL.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    return res.render("home", { urls });
  } catch (error) {
    console.error("Error in handleGetAll:", error);
    return res.status(500).json({ error: "Failed to fetch URLs" });
  }
}

async function deleteUrl(req, res) {
  try {
    const body = req.body || {};
    const { shortId } = body;
    if (!shortId) {
      return res.status(400).json({ error: "Missing shortId in request body" });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const deletedUrl = await URL.findOneAndDelete({
      shortId,
      createdBy: req.user._id,
    });

    if (!deletedUrl) {
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(404).json({ error: "URL not found" });
      }
      return res.redirect("/");
    }

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ message: "URL deleted successfully" });
    }
    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body || {};
    const { url } = body;
    if (!url) {
      return res.status(400).json({ error: "Missing url in request body" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const shortId = nanoid(8);
    const created = await URL.create({
      shortId: shortId,
      redirectUrl: url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    return res.status(201).render("home", { id: shortId });
  } catch (error) {
    console.error("Error in handleGenerateNewShortURL:", error);
    return res.status(500).json({ error: "Failed to create short URL" });
  }
}

module.exports = { handleGenerateNewShortURL, handleGetAll, deleteUrl };
