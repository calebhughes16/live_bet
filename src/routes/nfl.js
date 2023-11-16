var express = require('express');
const router = express.Router();
var teamController = require("../controllers/teamController");
var playerController = require("../controllers/playerController");

router.get("/addNFLTeamsToDatabase", teamController.addNFLTeamsToDatabase);
router.get("/addNFLPlayersToDatabase", playerController.addNFLPlayersToDatabase);

module.exports = { router };