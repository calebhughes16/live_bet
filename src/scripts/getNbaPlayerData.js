const axios = require("axios");
const fs = require("fs");
const mysql = require("mysql");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Data successfully written to file");
      }
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url =
  "https://api.sportsdata.io/v3/nba/scores/json/Players?key=5a1766d4c84447c6957da1c0996208b6";
fetchData(url);
