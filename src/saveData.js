const axios = require("axios");
const fs = require("fs");

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    const rawData = response.data;

    // Process data to extract and format the desired information
    const processedData = rawData.map((player) => ({
      playerID: player.PlayerID.toString(),
      longName: player.FanDuelName,
      team: player.Team,
      teamID: player.TeamID.toString(),
      jersey:
        player.Jersey || player.Jersey == 0 ? player.Jersey.toString() : null,
      position: player.Position,
    }));

    // Save processed data to a JSON file
    fs.writeFile(
      "players.json",
      JSON.stringify(processedData, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Processed data successfully written to file");
        }
      }
    );

    return processedData;
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url =
  "https://api.sportsdata.io/v3/nba/scores/json/Players?key=5a1766d4c84447c6957da1c0996208b6";
fetchData(url);
