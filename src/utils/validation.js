const validator = require("validator");

function validateSignUpData(req) {
  const { firstName, lastName, emailId, gender, age, password } = req.body;

  if (!firstName || !lastName || !emailId || !gender  || !password) {
    throw new Error("All fields are required for sign up");
  }

  if (
    firstName.length < 2 ||
    firstName.length > 20 ||
    lastName.length < 2 ||
    lastName.length > 20
  ) {
    throw new Error("First and Last names must be 2–20 characters long");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  }

  if (!["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Gender must be male, female, or other");
  }

  if (age && !validator.isInt(age.toString(), { min: 18, max: 100 })) {
    throw new Error("Age must be between 18 and 100");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  return true;
}

module.exports = { validateSignUpData };
