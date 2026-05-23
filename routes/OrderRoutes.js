const router = require("express").Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;