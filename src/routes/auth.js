const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

/* ---------------- SIGNUP ---------------- */
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { password } = req.body;

    // Validate password BEFORE hashing
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      return res.status(400).send("Weak password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email already registered");
    }
    res.status(400).send(error.message);
  }
});

/* ---------------- LOGIN ---------------- */
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).send("Email and password are required");
    }
    emailId = emailId.toLowerCase();

    const user = await User.findOne({ emailId: emailId.toLowerCase() });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/* ---------------- LOGOUT ---------------- */
authRouter.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.send("Logged out successfully");
});

module.exports = authRouter;
