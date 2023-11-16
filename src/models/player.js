//Player
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team'
  },
  remoteId: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  position: String,
  age: Number,
  jerseyNumber: Number,
  srId: {
    type: String
  },
  headshot: {
    type: String
  },
  teamName: {
    type: String
  },
  odds: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'props'
      },
      value: {
        type: Number
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
      }
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('player', PlayerSchema);

