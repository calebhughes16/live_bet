//Player
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  espnID: {
    type: String,
    required: true
  },
  espnName: {
    type: String,
    required: true
  },
  sleeperBotID: String,
  espnIDFull: String,
  weight: String,
  jerseyNum: String,
  cbsShortName: String,
  team: String,
  yahooPlayerID: String,
  age: String,
  espnLink: String,
  yahooLink: String,
  bDay: String,
  espnHeadshot: String,
  isFreeAgent: String,
  rotoWirePlayerIDFull: String,
  cbsLongName: String,

  injury:{
    type: Object
  },
  teamID: String,
  pos: String,
  school: String,
  cbsPlayerID: String,
  longName: String,
  rotoWirePlayerID: String,
  height: String,
  cbsPlayerIDFull: String,
  lastGamePlayed: String,
  playerID: String,
  exp: String
}, {timestamps: true});

module.exports = mongoose.model('player', PlayerSchema);