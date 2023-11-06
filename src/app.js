async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const games = data.dates[0].games;
    const teams = games[0].teams;
    // const stringdata = JSON.stringify(data, null, 2);
    console.log(teams);
    return data;
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url =
  "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2021-04-01&hydrate=team";
fetchData(url);
