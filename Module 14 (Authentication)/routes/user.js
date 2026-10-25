const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controllers/user");
const { handleUserLogin } = require("../controllers/user");

router.post("/", handleUserSignup);

// POST /user/login handles form submissions from the login page
router.post("/login", handleUserLogin);

module.exports = router;
