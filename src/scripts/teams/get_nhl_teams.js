const fs = require("fs");

async function fetchData(url) {
  const axios = require("axios");

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
    const data = await response.data.data;

    const teamInfo = data
      .map((team) => ({
        teamName: team.fullName,
        teamAbbrev: team.rawTricode,
        teamID: team.id, // Assuming 'teamID' is the correct field name
      }))
      .sort((a, b) => a.teamName.localeCompare(b.teamName));

    fs.writeFileSync(
      "teamData.json",
      JSON.stringify(teamInfo, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Data successfully written to file");
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

const url = "https://api.nhle.com/stats/rest/en/team";
fetchData(url);
