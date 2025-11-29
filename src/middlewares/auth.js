const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userAuth = async (req,res,next)=>{
try{const {token} = req.cookies;
const decodedObj =  await jwt.verify(token, "Dev@Tinder$790");
const {userId} = decodedObj;
const user = await User.findById(userId);
if(!user){
 return res.status(404).send("User not found"); 
}
next();
}catch(error){
 res.status(401).send("Unauthorized");}
};
module.exports = {
    userAuth
};

