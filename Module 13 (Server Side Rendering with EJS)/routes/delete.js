const express = require("express");
const router = express.Router();
const { deleteUrl } = require("../controllers/url");

router.post("/", deleteUrl);

module.exports = router;
