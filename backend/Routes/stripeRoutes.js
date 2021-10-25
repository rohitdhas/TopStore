const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { createCheckout, webHookEndpoint } = require('../controller/StripeController');

router.get("/create-checkout", createCheckout);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), webHookEndpoint);

module.exports = router;
