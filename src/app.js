var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const mongoose = require("mongoose");
require("dotenv").config(); 
const { router } =  require('./routes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('DefiBookie backend is running');
});

app.use("/nfl", router);


mongoose
  .connect(process.env.MONGO_URI || '')
  .then(async () => {
    console.log("Connected to the database! ❤️")
    // set port, listen for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
      console.log('DefiBookie backend is listening on port 3000!');
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database! 😭", err);
    process.exit();
  });