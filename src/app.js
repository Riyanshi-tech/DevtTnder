const express = require("express");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");  
app.use("/auth", authRouter);
app.use("/user", profileRouter);
app.use("/request", requestRouter);
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
