var express = require('express');
const router = express.Router();
var teamController = require("../controllers/teamController");
var playerController = require("../controllers/playerController");
var gameScheduleController = require("../controllers/gamescheduleController");
var liveBetController = require("../controllers/livebetController");

router.get("/addNFLPlayersToDatabase", playerController.addNFLPlayersToDatabase);
router.post("/getPlayerInfo", playerController.getPlayerInfo);

router.get("/addNFLTeamsToDatabase", teamController.addNFLTeamsToDatabase);
router.get("/addGameSchedulesToDatabase", gameScheduleController.addGameSchedulesToDatabase);
router.get("/liveGameBox/:gameID", liveBetController.getLiveGameBox);
router.post("/dailyScoreBoard", liveBetController.getDailyScoreBoard);

module.exports = { router };