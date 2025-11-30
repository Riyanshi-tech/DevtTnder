const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());


// SIGNUP USER
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).send("Email already registered");
    }

    return res.status(400).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // 2. Validate password using model method
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // 3. Generate JWT
    const token = user.getJWT();

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,   // enable when using https
      // sameSite: "strict",
    });

    res.send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/SendConnectionRequest",userAuth,async(req,res)=>{
  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " " + user.lastName +" "+ "request sent");
});
// // GET ONE USER
// app.get("/user", async (req, res) => {
//   try {
//     const user = await User.findOne({ emailId: req.query.emailId });
//     if (!user) return res.status(404).send("User not found");
//     res.json(user);
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// // DELETE USER
// app.delete("/user", async (req, res) => {
//   try {
//     if (!req.body.userId) return res.status(400).send("UserId required");

//     await User.findByIdAndDelete(req.body.userId);
//     res.send("User deleted successfully");
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// // UPDATE USER
// app.patch("/user", async (req, res) => {
//   try {
//     const { userId, ...updates } = req.body;
//     if (!userId) return res.status(400).send("UserId required");

//     const ALLOWED = [
//       "firstName",
//       "lastName",
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//       "emailId",
//     ];

//     const allowed = Object.keys(updates).every((k) => ALLOWED.includes(k));
//     if (!allowed) return res.status(400).send("update not allowed");

//     if (updates.skills && updates.skills.length > 10) {
//       return res.status(400).send("Too many skills (max 10)");
//     }

//     await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//       runValidators: true,
//     });

//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// // GET ALL USERS
// app.get("/feed", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// START SERVER
connectDB().then(() => {
  console.log("Database connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
