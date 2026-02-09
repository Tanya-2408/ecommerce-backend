const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getProducts,
  searchProducts,
  createProduct
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/search", searchProducts);

// File upload route
router.post("/", upload.single("image"), createProduct);

module.exports = router;
