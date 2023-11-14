async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // const stringdata = JSON.stringify(data, null, 2);
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem fetching the data: ", error);
  }
}

const url = "https://statsapi.mlb.com/api/v1/sports/1/players";
fetchData(url);
