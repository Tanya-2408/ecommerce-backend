const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

/**
 * Cursor-based pagination
 * NO skip-limit
 */
exports.getProducts = async (req, res) => {
  try {
    const { cursor } = req.query;

    let query = {};
    if (cursor) {
      query._id = { $gt: cursor };
    }

    const products = await Product.find(query)
      .sort({ _id: 1 })
      .limit(5);

    res.json({
      nextCursor: products.length ? products[products.length - 1]._id : null,
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Text search
 */
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({
      $text: { $search: q }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create product with image upload (Cloudinary)
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "ecommerce-products"
      });
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images: imageUrl ? [imageUrl] : []
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
