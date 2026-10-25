const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");
const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");
const router = express.Router();

router.post("/", restrictToLoggedInUsersOnly, handleGenerateNewShortURL);

module.exports = router;
