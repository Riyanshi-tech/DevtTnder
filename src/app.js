const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
   const user = new User({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     emailId: req.body.emailId,
   });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET ONE USER (use query param)
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.query.emailId });
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE USER
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE USER
app.patch("/user", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET ALL USERS
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// CONNECT DB + START SERVER
connectDB().then(() => {
  console.log("Database connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
