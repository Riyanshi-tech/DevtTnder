const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  age: { type: Number, min: 18, max: 100 },

  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Invalid gender value");
      }
    },
  },

  photo: { type: String, required: false },
  about: { type: String, required: false },
  skills: { type: [String], required: false },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;