const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      default: 0
    },
    images: [String],
    rating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// ✅ COMPOUND INDEX (ESR rule)
productSchema.index({ category: 1, price: 1 });

// ✅ TEXT INDEX (search)
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
