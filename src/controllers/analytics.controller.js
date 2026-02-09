const Order = require("../models/Order");

/**
 * 1️⃣ Monthly Sales Analytics
 * Shows revenue + order count per month
 */
exports.monthlySales = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { paymentStatus: "PAID" } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json(data);
};

/**
 * 2️⃣ Best-Selling Products
 * Finds products sold the most
 */
exports.bestSellingProducts = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        totalSold: { $sum: "$items.quantity" }
      }
    },
    { $sort: { totalSold: -1 } }
  ]);

  res.json(data);
};

/**
 * 3️⃣ Customer Spending Insights
 * Shows how much each customer spent
 */
exports.customerInsights = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { paymentStatus: "PAID" } },
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalAmount" }
      }
    },
    { $sort: { totalSpent: -1 } }
  ]);

  res.json(data);
};
