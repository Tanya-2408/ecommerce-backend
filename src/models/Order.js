const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        price: Number
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PLACED", "CANCELLED"],
      default: "PLACED"
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

// ✅ DOMAIN-SPECIFIC INDEX
orderSchema.index({ status: 1, paymentStatus: 1 });

// ✅ PARTIAL INDEX
orderSchema.index(
  { paymentStatus: 1 },
  { partialFilterExpression: { paymentStatus: "PAID" } }
);

module.exports = mongoose.model("Order", orderSchema);
