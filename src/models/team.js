//Player
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
   teamAbv: {
    type: String,
    required: true
  },
  teamCity: {
    type: String,
    required: true
  },
  currentStreak: Object,
  loss: String,
  teamName: {
    type: String,
    required: true
  },
  nflComLogo1: String,
  teamID: String,
  tie: String,
  pa: String,
  pf: String,
  espnLogo1: String,
  wins: String
}, {timestamps: true});

module.exports = mongoose.model('team', TeamSchema);