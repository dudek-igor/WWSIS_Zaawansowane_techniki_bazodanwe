const mysql = require("mysql2");
const { promisify } = require("util");
const config = require("config");

const pool = mysql.createPool(config.get("dbConfig"));

pool.query = promisify(pool.query);

pool
  .query("SELECT 1+1")
  .then(() => {
    console.log(`============= Database =============`);
    console.log("😎 Database connection has been established successfully.");
  })
  .catch(() => {
    console.error(`============= Database =============`);
    console.error("☠️ Unable to connect to the database.");
  });

module.exports = { pool };
