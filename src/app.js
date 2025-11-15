const express = require('express');
const connectDB=require('./config/database'); // Ensure database connection is established
const app = express();
const User = require('./models/user'); // Import the User model
app.use(express.json()); // Middleware to parse JSON bodies
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
   
  });
  try {
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);

  try {
    const users = await User.findOne({emailId: userEmail});
    console.log(users);
    // res.send(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updatedData = req.body;
  try {
     const user = await User.findByIdAndUpdate({_id :userId}, updatedData, {
       returnDocument: true,
       runValidators: true
     });

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error"); 
  }
}); 
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();  
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    }); 
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
// app.get("/getuserdata", (req, res) => {
//   throw new Error("Simulated server error");
//   res.send("Hello from get user data"); 
// });
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
// app.use("/admin", (req, res, next) => {
//   const token = "xyzzz" ;
//   const isAdminAuthenticated = token === "xyz"; // Simulating admin authentication

//   if (!isAdminAuthenticated) {
//     return res.status(403).send("Forbidden: Admins only");
//   }
//   next();
// });
// app.get("/admin/getalldata", (req, res) => {
//   res.send("Hello from admin get all data");
// });
// app.get("/admin/secretinfo", (req, res) => {
//   res.send("Hello from admin secret info");
// });
//  app.use(
//    "/user",
//    (req, res, next) => {
//      console.log("This is middleware");
//      next();
//      //   res.send("Hello World");
//   //  },
//   //  (req, res, next) => {
//   //    console.log("This is middleware");
//   //    next();
//   //    //   res.send("Hello World");
//   //  },
//   //  (req, res, next) => {
//   //    console.log("This is middleware");
//   //    next();
//   //    //   res.send("Hello World");
//   //  },
//   //  (req, res, next) => {
//   //    console.log("This is middleware");
//   //    next();
//   //    //   res.send("Hello World");
//   //  },
//   //  (req, res,next) => {
//   //    console.log("This is middleware");
//   //    res.send("Hello from second handler");
//     }
//  );
//   app.use(
//    "/user",
//    (req, res, next) => {
//      console.log("This is middleware");
//      next();
//    }
//   );
//   app.use(
//    "/user",
//    (req, res, next) => {
//      console.log("This is middleware");
//      res.send("Hello from third handler");
//    }
//  );
//  app.get("/user/:userid", (req, res) => { 
//   console.log(req.params);
//   res.send({ name: "John Doe", age: 30 });
// });
// app.post("/user", (req, res) => {
//   console.log("Creating user");
//   res.send("User created");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello Test");
// });
// app.delete("/user/:userid", (req, res) => {
//   console.log("Deleting user");
//   res.send("User deleted");
// });
