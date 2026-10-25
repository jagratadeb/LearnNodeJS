const express = require("express");
const router = express.Router();
const { deleteUrl } = require("../controllers/url");
const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");

router.post("/", restrictToLoggedInUsersOnly, deleteUrl);

module.exports = router;
