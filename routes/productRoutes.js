const router = require("express").Router();
const Product = require("../models/Product");

// // Add product
// router.post("/", async (req, res) => {
//   const product = new Product(req.body);
//   await product.insertMany();
//   res.send(product);
// });
// // Add product (Handles single or multiple products)
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
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

// PATCH: Update a product by its ID
router.patch("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Remove a product by its ID
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;