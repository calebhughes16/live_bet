const GameSchedule = require('../models/gameschedule');
require("dotenv").config(); 
const axios = require("axios");
const getAllGameSchedules = async () => {
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLGamesForWeek`,
        params: {week: 'all'},
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
const addGameSchedulesToDatabase = async (req, res) => {
    try {
        const { body } = await getAllGameSchedules();
        console.log(body, body.length);
        for(var i=0; i< body.length; i++) {
            const newSchedule = new GameSchedule(body[i]);
            await newSchedule.save();
        }
    } catch (error) {
        console.log(error);
    }
}
  

module.exports = {
    addGameSchedulesToDatabase
}