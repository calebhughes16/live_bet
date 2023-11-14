require('dotenv').config()
const axios = require("axios");

const getCurrentSeasonSchedule = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/games/current_season/schedule.json?api_key=${process.env.API_KEY}`)
}

const getCurrentWeekSchedule = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/games/current_week/schedule.json?api_key=${process.env.API_KEY}`)
}

const getDailyChangeLog = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/league/:year/:month/:day/changes.json?api_key=${process.env.API_KEY}`)
}

const getDailyTransactions = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/league/:year/:month/:day/transactions.json?api_key=${process.env.API_KEY}`)
}

const getPlayerByPlayer = async (req, res) => {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/games/:game_id/pbp.json?api_key=${process.env.API_KEY}`)
}

module.exports = {
    getCurrentSeasonSchedule,
    getCurrentWeekSchedule,
    getDailyChangeLog,
    getDailyTransactions,
    getPlayerByPlayer
}