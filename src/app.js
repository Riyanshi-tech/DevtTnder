const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

// SIGNUP USER
app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      gender: req.body.gender,
      age: req.body.age,
      password: req.body.password,
    });

    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET ONE USER
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.query.emailId });
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE USER
app.delete("/user", async (req, res) => {
  try {
    if (!req.body.userId) return res.status(400).send("UserId is required");

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
    const { userId, ...updates } = req.body;
        


    if (!userId) return res.status(400).send("UserId required");
const ALLOWED_UPDATES = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "gender",
  "age",
  "skills",
  "emailId",
];
console.log("ALLOWED_UPDATES:", ALLOWED_UPDATES);
        console.log("UPDATES RECEIVED:", Object.keys(updates));

    const isUpdateAllowed = Object.keys(updates).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) throw new Error("update not allowed");
    if(updates.skills.length>10) throw new Error("Too many skills added");

    await User.findByIdAndUpdate(userId, updates, {
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
