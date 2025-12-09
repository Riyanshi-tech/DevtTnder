const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(error){res.status(500).send("Internal Server Error");}
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // Validate body before doing anything
    validateEditProfileData(req.body);
    const user = req.user;
    const updates = req.body;
    // Update user object
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });
    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
profileRouter.patch("/profile/change-password", userAuth, async (req, res) => {
  try {
    const { Password, newPassword } = req.body;
    if (!Password || !newPassword) {
      return res.status(400).send("Old and new password are required");
    }

    if (newPassword.length < 6) {
      return res.status(400).send("New password must be at least 6 characters");
    }
    const user = req.user;
    const isMatch = await bcrypt.compare(Password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect old password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = profileRouter;