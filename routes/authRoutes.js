const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try{
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  await user.save();
  res.status(201).send("User registered successfully");
    } catch (error) {
        // This will tell you exactly what went wrong
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
 try {
        const { email, password } = req.body;
        
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Success!
        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

module.exports = router;