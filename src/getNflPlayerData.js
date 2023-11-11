const axios = require("axios");
const fs = require("fs");
const mysql = require("mysql");

const options = {
  method: "GET",
  url: "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBoxScore",
  params: {
    gameID: "20231105_BUF@CIN",
    fantasyPoints: "false",
  },
  headers: {
    "X-RapidAPI-Key": "12498b12e2msh6daa1f8bc3401a1p10b50bjsna12ce8439db3",
    "X-RapidAPI-Host":
      "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com",
  },
};

function findPlayerByID(playerID) {
  const playerData = readLocalDataFile();
  for (let i = 0; i < playerData.length; i++) {
    if (playerData[i].playerID === playerID) {
      return playerData[i].longName;
    }
  }
  return null;
}

function readLocalDataFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the local data file:", error);
    throw error;
  }
}

function getFirstTouchdown(scoringPlays) {
  for (const play of scoringPlays) {
    if (play.scoreType === "TD") {
      const scorerID =
        play.playerIDs.length >= 2 ? play.playerIDs[1] : play.playerIDs[0];
      let scoringPlayer = {
        scorerID: scorerID,
        score: play.score,
        scoreTime: play.scoreTime,
      };
      const playerData = readLocalDataFile();

      for (let i = 0; i < playerData.length; i++) {
        if (playerData[i].playerID === scorerID) {
          scoringPlayer.scorerName = playerData[i].longName;
          break;
        }
      }
      return scoringPlayer;
    }
  }
  return null;
}

function getLastTouchdown(scoringPlays) {
  for (let i = scoringPlays.length - 1; i >= 0; i--) {
    const play = scoringPlays[i];
    if (play.scoreType === "TD") {
      const scorerID =
        play.playerIDs.length >= 2 ? play.playerIDs[1] : play.playerIDs[0];
      let scoringPlayer = {
        scorerID: scorerID,
        score: play.score,
        scoreTime: play.scoreTime,
      };

      const playerData = readLocalDataFile();

      for (let j = 0; j < playerData.length; j++) {
        if (playerData[j].playerID === scorerID) {
          scoringPlayer.scorerName = playerData[j].longName;
          return scoringPlayer;
        }
      }
    }
  }
  return null;
}

async function fetchData() {
  try {
    const response = await axios.request(options);
    const body = response.data.body;
    const players = response.data.body.playerStats;
    const scoringPlays = response.data.body.scoringPlays;
    const player = findPlayerByID("2508256");
    const firstTD = getFirstTouchdown(scoringPlays);
    const lastTD = getLastTouchdown(scoringPlays);
    console.log(scoringPlays);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
