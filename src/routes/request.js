const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status value");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("Target user not found");
      }

      // 1️⃣ block self request
      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .send("You cannot send a connection request to yourself");
      }

      // 2️⃣ correct duplicate check - only check pair (A,B) or (B,A)
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send("Connection request already exists between these users");
      }

      // 3️⃣ create and save
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error.message || "Error in sending request");
    }
  }
);

module.exports = requestRouter;
