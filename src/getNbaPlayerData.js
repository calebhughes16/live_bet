async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // const games = data.dates[0].games;
    // const teams = games[0].teams;
    // const stringdata = JSON.stringify(data, null, 2);
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url =
  "https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/2023-NOV-10?key=5a1766d4c84447c6957da1c0996208b6";
fetchData(url);
