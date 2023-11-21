require("dotenv").config(); 
const axios = require("axios");
const getLiveGameBox = async (req, res) => {
    const { gameID }  = req.params;
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLBoxScore`,
        params: {gameID},
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };  
    try {
        const { data } = await axios.request(options);
        if(data.body.error) return res.json({error: data.body.error});
        return res.json({ data: data.body })
    } catch (error) {
        return res.status(500).json({msg: "Server error"})
    }
}  

const getDailyScoreBoard = async (req, res) => {
    const { gameDate, gameID }  = req.body;
    let params = {};
    if(gameDate) params = {...params, gameDate};
    if(gameID) params = {...params, gameID};
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLScoresOnly`,
        params,
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };  
    try {
        const { data } = await axios.request(options);
        if(data.error) return res.json({error: data.error});
        return res.json({ data: data.body })
    } catch (error) {
        return res.status(500).json({msg: "Server error"})
    }
}  

module.exports = {
    getLiveGameBox,
    getDailyScoreBoard
}