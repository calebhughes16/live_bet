const Team = require('../models/team');
require("dotenv").config(); 
const axios = require("axios");
const getTeams = async () => {
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLTeams`,
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };  
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
          console.error(error);
    }
}
const addNFLTeamsToDatabase = async (req, res) => {
    try {
        const { body } = await getTeams();
        console.log(body, body.length);
        for(var i=0; i< body.length; i++) {
            const newTeam = new Team(body[i]);
            await newTeam.save();
        }
    } catch (error) {
        console.log(error);
    }
}
  

module.exports = {
    addNFLTeamsToDatabase
}