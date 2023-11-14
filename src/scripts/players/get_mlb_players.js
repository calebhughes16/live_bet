const fs = require("fs");
const axios = require("axios");

async function fetchData(url) {
  try {
    // Read team data from file
    const teamDataRaw = fs.readFileSync("teamData.json", "utf8");
    const teamData = JSON.parse(teamDataRaw).teams;

    const response = await axios.get(url);
    const data = response.data;

    if (data.people) {
      const playerInfo = data.people.map((player) => {
        // Find the team by ID and get the abbreviation
        const team = teamData.find(
          (t) => t.id === (player.currentTeam ? player.currentTeam.id : -1)
        );
        const teamAbbreviation = team ? team.abbreviation : "No team";

        return {
          playerID: player.id.toString(),
          fullName: player.fullName,
          team: teamAbbreviation,
          teamID: player.currentTeam
            ? player.currentTeam.id.toString()
            : "No team ID",
          jerseyNym: player.primaryNumber ? player.primaryNumber : "9999",
          position: player.primaryPosition
            ? player.primaryPosition.abbreviation
            : "No position",
          // Add more fields as needed
        };
      });

      fs.writeFileSync("data.json", JSON.stringify(playerInfo, null, 2));
      console.log("Data successfully written to file");
    } else {
      console.log("No player data found");
    }
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url = "https://statsapi.mlb.com/api/v1/sports/1/players";
fetchData(url);
