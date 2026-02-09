const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/order.controller");

router.post("/", placeOrder);

module.exports = router;
