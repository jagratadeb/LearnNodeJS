const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGetAll(req, res) {
  try {
    const urls = await URL.find().sort({ createdAt: -1 });
    return res.end(
      `
      <html>
        <head></head>
        <body>
          <ul>
            ${urls
              .map((url) => {
                return `<li>${url.shortId} - ${url.redirectUrl}</li>`;
              })
              .join("")} 
          </ul>
        </body>
      </html>
      `,
    );
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
    const deletedUrl = await URL.findOneAndDelete({ shortId });

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

    const shortId = nanoid(8);
    const created = await URL.create({
      shortId: shortId,
      redirectUrl: url,
      visitHistory: [],
    });
    return res.status(201).render("home", { id: shortId });
  } catch (error) {
    console.error("Error in handleGenerateNewShortURL:", error);
    return res.status(500).json({ error: "Failed to create short URL" });
  }
}

module.exports = { handleGenerateNewShortURL, handleGetAll, deleteUrl };
