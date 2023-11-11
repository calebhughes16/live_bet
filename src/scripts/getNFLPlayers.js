const axios = require("axios");

const options = {
  method: "GET",
  url: "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList",
  headers: {
    "X-RapidAPI-Key": "12498b12e2msh6daa1f8bc3401a1p10b50bjsna12ce8439db3",
    "X-RapidAPI-Host":
      "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
