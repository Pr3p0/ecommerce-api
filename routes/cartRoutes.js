const router = require("express").Router();
const Cart = require("../models/Cart");

// Add to cart
router.post("/", async (req, res) => {
  const cart = new Cart(req.body);
  await cart.save();
  res.send(cart);
});

// Get cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

module.exports = router;