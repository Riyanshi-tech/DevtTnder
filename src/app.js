const express = require('express');

const app = express();
 app.use(
   "/user",
   (req, res, next) => {
     console.log("This is middleware");
     next();
     //   res.send("Hello World");
  //  },
  //  (req, res, next) => {
  //    console.log("This is middleware");
  //    next();
  //    //   res.send("Hello World");
  //  },
  //  (req, res, next) => {
  //    console.log("This is middleware");
  //    next();
  //    //   res.send("Hello World");
  //  },
  //  (req, res, next) => {
  //    console.log("This is middleware");
  //    next();
  //    //   res.send("Hello World");
  //  },
  //  (req, res,next) => {
  //    console.log("This is middleware");
  //    res.send("Hello from second handler");
    }
 );
  app.use(
   "/user",
   (req, res, next) => {
     console.log("This is middleware");
     next();
   }
  );
  app.use(
   "/user",
   (req, res, next) => {
     console.log("This is middleware");
     res.send("Hello from third handler");
   }
 );
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
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 