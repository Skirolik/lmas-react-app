const sqlite3 = require("sqlite3").verbose();

// Path to your SQLite database file
const DB_PATH = "./data.sqlite";

// Connect to the SQLite database
const db = new sqlite3.Database(DB_PATH);

// Fetch data from the database
const fetchData = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM client_db", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { fetchData };
