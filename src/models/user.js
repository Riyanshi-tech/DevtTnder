const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true ,minlength:4, maxlength:20},
  lastName: { type: String, required: true ,minlength:4, maxlength:20 },
  emailId: { type: String, required: true, unique: true,trim: true },
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
}, { timestamps: true });

const User = mongoose.model('Users', userSchema);
module.exports = User;