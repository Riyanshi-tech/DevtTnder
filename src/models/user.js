const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 4, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 4, maxlength: 20 },

    emailId: {
      type: String,
      required: true,
      unique: true,
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
      validate(value) {
        if (!validator.isStrongPassword(value, { minSymbols: 0 })) {
          throw new Error(
            "Password must be strong (uppercase, lowercase, number)"
          );
        }
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain the word 'password'");
        }
      },
    },

    age: { type: Number, min: 18 },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase())) {
          throw new Error("Invalid gender value");
        }
      },
    },

    photoUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid URL format for photoUrl");
        }
      },
    },

    about: { type: String, maxlength: 200 },

    skills: {
      type: [String],
      validate(val) {
        if (!Array.isArray(val)) throw new Error("Skills must be an array");
      },
    },
  },
  { timestamps: true }
);


// 🔑 Generate JWT
userSchema.methods.getJWT = function () {
  return jwt.sign({ userId: this._id }, "Dev@Tinder$790", {
    expiresIn: "1d",
  });
};

// 🔍 Validate password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
