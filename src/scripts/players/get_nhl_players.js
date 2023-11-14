const fs = require("fs");
const axios = require("axios");

async function fetchData(url, team, teamID, isFirstTeam) {
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-RapidAPI-Key": "12498b12e2msh6daa1f8bc3401a1p10b50bjsna12ce8439db3",
      "X-RapidAPI-Host": "api-hockey.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const players = [
      ...response.data.defensemen,
      ...response.data.goalies,
      ...response.data.forwards,
    ];

    const playerInfo = players.map((player) => ({
      playerID: player.id,
      longName: `${player.firstName.default} ${player.lastName.default}`,
      team: team,
      teamID: teamID,
      jerseyNum: player.sweaterNumber,
      position: player.positionCode,
      // Add more fields as needed
    }));

    // Append to file
    if (isFirstTeam) {
      fs.writeFileSync("playerData.json", "[\n", "utf8"); // Start of JSON array
    }

    fs.appendFileSync(
      "playerData.json",
      JSON.stringify(playerInfo, null, 2) + (isFirstTeam ? "" : ",\n"),
      "utf8"
    );
  } catch (error) {
    console.error(error);
  }
}

async function processTeams() {
  const teamData = JSON.parse(fs.readFileSync("teamData.json", "utf8"));
  for (let i = 0; i < teamData.length; i++) {
    const team = teamData[i];
    const url = `https://api-web.nhle.com/v1/roster/${team.teamAbbrev}/current`;
    await fetchData(url, team.teamAbbrev, team.teamID, i === 0);
  }

  // End of JSON array
  fs.appendFileSync("playerData.json", "\n]", "utf8");
}

processTeams();
