const Team = require('../models/team');

require("dotenv").config(); 
const axios = require("axios")

// GET NFL Team

const fetchNFLTeams = async () => {

    return axios.get(`${process.env.NFL_API_BASEURL}/${process.env.LOCALE}/league/hierarchy.json?api_key=${process.env.API_KEY}`)
      .then(response => {
        const conferences = response.data.conferences;
        //console.log(conferences);
        return conferences;
      })
      .catch(error => {
        throw new Error('Error retrieving NFL schedule:', error);
      });
}
  
const addNFLTeamsToDatabase = async (req, res) => {
    try {
        const conferences = await fetchNFLTeams();
        
          // Loop through the fetched data and add contests to the database
          for (const conference of conferences) {
              for (const divisionInfo of conference.divisions) {
                  for (const teamInfo of divisionInfo.teams) {
  
                      const team = new Team({
                          name: teamInfo.name,
                          remoteId: teamInfo.id,
                          alias: teamInfo.alias,
                          srId: teamInfo.sr_id
                      });
                      await team.save();
                  }
              }
          }
            res.json({
                message: 'NFL Teams added to the database.'
            });
    } catch (error) {
          throw new Error(`Error adding NFL contests to the database: ${error.message}`);
    }
}


// GET NFL Players 

const fetchNFLTeamsFromRemoteId = async (remoteId) => {

    return axios.get(`${process.env.NFL_API_BASEURL}/${process.env.LOCALE}/teams/${remoteId}/profile.json?api_key=${process.env.API_KEY}`)
      .then(response => {
        const team = response.data;
        return team;
      }).catch(error => {
        throw new Error('Error retrieving NFL TeamProfile:', error);
      })
}

module.exports = {
    fetchNFLTeamsFromRemoteId,
    addNFLTeamsToDatabase,
    fetchNFLTeams
}