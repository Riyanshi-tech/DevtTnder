const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 4, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 4, maxlength: 20 },

    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: { type: String, required: true, minlength: 6 },

    age: { type: Number, min: 18 },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },

    photoUrl: { type: String },

    about: { type: String, minlength: 0, maxlength: 200 },

    skills: {
      type: [String],
      validate(val) {
        if (!Array.isArray(val)) throw new Error("Skills must be an array");
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
