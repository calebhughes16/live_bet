const fs = require("fs");
const axios = require("axios");

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.teams) {
      const teamInfo = data.teams.map((team) => ({
        teamName: team.name,
        teamAbbrev: team.abbreviation,
        teamID: team.id,
      }));

      fs.writeFileSync("teamData.json", JSON.stringify(teamInfo, null, 2));
      console.log("Data successfully written to file");
    } else {
      console.log("No player data found");
    }
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url = "https://statsapi.mlb.com/api/v1/teams";
fetchData(url);
