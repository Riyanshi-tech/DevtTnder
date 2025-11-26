const mongoose = require("mongoose");
const validator = require("validator");

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

    password: { type: String, required: true, minlength: 6,validator(value) {
        if (!validator.isStrongPassword(value)  ) {
          throw new Error("Password cannot contain 'password'");
            }}},

    age: { type: Number, min: 18 },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },

    photoUrl: { type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid URL format for photoUrl");
        }
      },
    },

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
