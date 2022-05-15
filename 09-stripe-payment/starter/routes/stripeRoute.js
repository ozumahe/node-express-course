const express = require("express");
const router = express.Router();
const stripe = require("../controllers/stripeController");

router.route("/").post(stripe);

module.exports = router;
