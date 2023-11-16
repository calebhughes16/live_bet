const Player = require('../models/player');
const Team = require('../models/team');

require("dotenv").config(); 
const axios = require("axios");
const { fetchNFLTeamsFromRemoteId }= require("./teamController")
const getAllTeamsFromDatabase = async () => {
    return await Team.find({});
}
const addNFLPlayersToDatabase = async (req, res) => {
    try {
      const teams = await getAllTeamsFromDatabase();
      for (const team of teams) {
  
        const remoteteam = await fetchNFLTeamsFromRemoteId(team.remoteId);
        for (const player of remoteteam.players) {
          const newPlayer = new Player({
            name: player.name,
            remoteId: player.id,
            teamId: team._id,
            position: player.position,
            jerseyNumber: player.jersey,
            srId: player.sr_id
          });
          await newPlayer.save();
        }
      }
      res.status(200).json({
        message: 'NFL players added to the database.'
      });
  
    } catch (error) {
      console.log(error);
  
    }
}
  

module.exports = {
    addNFLPlayersToDatabase
}