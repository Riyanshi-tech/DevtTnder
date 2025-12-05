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
    validateEditProfileData(req);

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

module.exports = profileRouter;