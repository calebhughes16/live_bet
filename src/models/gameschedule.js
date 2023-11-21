//Player
const mongoose = require('mongoose');

const GameScheduleSchema = new mongoose.Schema({
  gameID: {
    type: String,
    required: true
  },
  seasonType: {
    type: String,
    required: true
  },
  away: String,
  gameDate: String,
  espnID: String,
  teamIDHome: String,
  gameStatus: String,
  gameWeek: String,
  teamIDAway: String,
  home: String,
  espnLink: String,
  cbsLink: String,
  gameTime: String,
  gameTime_epoch: String,
  season: String,
  neutralSite: String
}, {timestamps: true});

module.exports = mongoose.model('gameschedule', GameScheduleSchema);