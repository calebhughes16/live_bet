//Team

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  remoteId: {
    type: String,
    required: true
  },
  alias: {
    type: String,
  },
  srId: {
    type: String,
  }, 
}, {timestamps:true});

module.exports = mongoose.model('team', TeamSchema);