const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a supported status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
connectionRequestSchema.pre("save", async function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    return next(new Error("fromUserId and toUserId cannot be the same"));
  }

  const exists = await mongoose.model("ConnectionRequest").findOne({
    fromUserId: this.fromUserId,
    toUserId: this.toUserId,
  });

  if (exists) {
    return next(new Error("Request already sent!"));
  }

  next();
});


const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
