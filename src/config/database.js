const mongoose = require('mongoose');  
const connectDB = async () => {  
 await mongoose.connect(
    "mongodb+srv://riyanshichaudhary449_db_user:dLgrTOjmnbVd0QWx@cluster0.4mh94l1.mongodb.net/devTinder"
);}
module.exports = connectDB;
