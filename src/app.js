const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

app.use("/products", require("./routes/product.routes"));
app.use("/orders", require("./routes/order.routes"));
app.use("/analytics", require("./routes/analytics.routes"));
app.use("/payments", require("./routes/payment.routes"));

module.exports = app;
