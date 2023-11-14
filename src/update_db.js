const mysql = require("mysql");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");

  // Create the "players" table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS players (
      playerID VARCHAR(255) NOT NULL,
      longName VARCHAR(255) NOT NULL,
      team VARCHAR(255) NOT NULL,
      teamID VARCHAR(255) NOT NULL,
      jerseyNum VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      PRIMARY KEY (playerID)
    )`;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created or already exists.");
  });

  //   // Read the JSON file
  const playersData = JSON.parse(fs.readFileSync("data.json", "utf8"));

  async function insertPlayers(playersData) {
    for (const player of playersData) {
      const insertQuery = "INSERT IGNORE INTO players SET ?";
      try {
        const result = await new Promise((resolve, reject) => {
          connection.query(insertQuery, player, (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        });

        if (result.affectedRows === 0) {
          console.log(
            `Record for playerID: ${player.playerID} already exists.`
          );
        } else {
          console.log(`Record inserted for playerID: ${player.playerID}`);
        }
      } catch (err) {
        console.error(
          `Error inserting record for playerID: ${player.playerID}`,
          err
        );
      }
    }
  }

  // Call the function
  insertPlayers(playersData)
    .then(() => {
      console.log("All players have been processed.");
      connection.end();
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
});
