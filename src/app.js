const express = require('express');

const app = express();
 app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ name: "John Doe", age: 30 });
});
app.post("/user", (req, res) => {
  console.log("Creating user");
  res.send("User created");
});
app.use("/test", (req, res) => {
  res.send("Hello Test");
});
app.delete("/user", (req, res) => {
  console.log("Deleting user");
  res.send("User deleted");
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});