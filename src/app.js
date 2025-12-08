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
connectDB().then(() => {
  console.log("Database connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
