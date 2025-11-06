const express = require('express');

const app = express();
app.use("/hello", (req, res) => {
  res.send('Hello  my World')
}); 
app.use("/host", (req, res) => {
  res.send("Hello Host");
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});