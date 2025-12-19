const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // 🔥 important
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    age: { type: Number, min: 18 },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    photoUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid photo URL");
        }
      },
    },

    about: { type: String, maxlength: 200 },

    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

/* 🔑 Generate JWT */
userSchema.methods.getJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

/* 🔍 Validate password */
userSchema.methods.validatePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
