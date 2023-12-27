// URL of the API or resource you are trying to fetch
let playerFirstName = "Kenyan";
let playerLastName = "Drake";
const url = `https://www.pro-football-reference.com/players/${playerLastName.slice(
  0,
  1
)}/${playerLastName.slice(0, 4)}${playerFirstName.slice(0, 2)}00.htm`;
console.log(url);

// https://www.pro-football-reference.com/players/D/DrakKe00.htm

// Define your custom headers
const headers = new Headers({
  "Content-Type": "application/json",
  // Add other headers as needed
});

// Use the fetch API with additional options
fetch(url, {
  method: "GET",
  headers: headers,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // or response.text() if the response is text
  })
  .then((data) => {
    console.log(data); // Handle the data from the response
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
