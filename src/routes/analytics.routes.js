const express = require("express");
const router = express.Router();
const {
  monthlySales,
  bestSellingProducts,
  customerInsights
} = require("../controllers/analytics.controller");

router.get("/monthly-sales", monthlySales);
router.get("/best-selling", bestSellingProducts);
router.get("/customers", customerInsights);

module.exports = router;
