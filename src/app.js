var express = require('express');
var app = express();
const { router } =  require('./routes/nfl');

app.get('/', function (req, res) {
  res.send('DefiBookie backend is running');
});

app.use("/nfl", router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});