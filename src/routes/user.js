const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const ConnectionRequest = require("../models/connectionRequest");
userRouter.get("/",userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user ? req.user._id : null;
    const connectionRequests = await ConnectionRequest.find({
     toUserId: loggedInUserId,
    }) 
    res.json({
        message: "Connection requests fetched successfully",
        data: connectionRequests,
    })
  } catch (error) {
    res.status(500).send("Server error");
  }
});
module.exports = userRouter;