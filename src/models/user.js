const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        emailId: { type: String, required: true, unique: true },  
    }
);
const User = mongoose.model('Users', userSchema);
module.exports = User;