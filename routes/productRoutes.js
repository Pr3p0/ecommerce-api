const router = require("express").Router();
const Product = require("../models/Product");

// // Add product
// router.post("/", async (req, res) => {
//   const product = new Product(req.body);
//   await product.insertMany();
//   res.send(product);
// });
// // Add product (Handles single or multiple products)
router.post("/add", async (req, res) => {
    try {
        // Pass req.body directly to the main Product model
        const savedProducts = await Product.insertMany(req.body);
        res.status(201).json(savedProducts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;