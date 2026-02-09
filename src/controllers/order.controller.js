const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, items } = req.body;

    let totalAmount = 0;

    // 1️⃣ Reduce stock
    for (let item of items) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity }
        },
        {
          $inc: { stock: -item.quantity }
        },
        { new: true, session }
      );

      if (!product) {
        throw new Error("Insufficient stock");
      }

      totalAmount += item.price * item.quantity;
    }

    // 2️⃣ Create order
    const order = await Order.create(
      [
        {
          userId,
          items,
          totalAmount
        }
      ],
      { session }
    );

    // 3️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      order: order[0]
    });
  } catch (error) {
    // ❌ Rollback everything
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      error: error.message
    });
  }
};
