const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

// ---------------------- LOGIN ----------------------
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).send("Email and password are required");
    }

    // 1. Find user
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).send("Invalid email ");
    }
    const bodypassword = await bcrypt.compare(password, user.password);
    console.log(bodypassword);
    console.log(password);
    console.log(user.password);
    
    
    
    if (!bodypassword) {
      return res.status(400).send("Invalid  password");
    }

    // 3. Generate JWT
    const token = user.getJWT();

    // 4. Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production (https)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------------------- SIGNUP ----------------------
authRouter.post("/signup", async (req, res) => {
  try {
    // Step 1: Validate input
    validateSignUpData(req);

    const { password } = req.body;
    if (!password) {
      return res.status(400).send("Password is required");
    }

    // Step 2: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    // Step 3: Save user
    const user = new User(req.body);
    await user.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);

    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).send("Email already registered");
    }

    return res.status(400).send(error.message);
  }
});
// ---------------------- LOGOUT ----------------------
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.send("Logged out successfully");
});

module.exports = authRouter;
