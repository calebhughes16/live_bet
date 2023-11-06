const fs = require("fs");

function readLocalDataFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the local data file:", error);
    throw error;
  }
}

const players = readLocalDataFile().body;

const filteredPlayers = players.map((player) => ({
  playerID: player.playerID,
  longName: player.longName,
  team: player.team,
  teamID: player.teamID,
  jerseyNum: player.jerseyNum,
  position: player.pos,
}));

const dataToWrite = JSON.stringify(filteredPlayers, null, 2);

// Write the string to a file
fs.writeFile("filteredPlayers.json", dataToWrite, "utf8", (err) => {
  if (err) {
    console.log("An error occurred:", err);
    return;
  }
  console.log('Filtered data saved to "filteredPlayers.json".');
});
