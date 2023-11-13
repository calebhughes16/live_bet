var express = require('express');
var nflController = require("../controllers/nflController");
const router = express.Router();

router.get('/current_season', nflController.getCurrentSeasonSchedule);

module.exports = { router };