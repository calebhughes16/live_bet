require('dotenv').config()
const axios = require("axios");

const getCurrentSeasonSchedule = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/games/current_season/schedule.json?api_key=${process.env.API_KEY}`)
}

module.exports = {
    getCurrentSeasonSchedule
}