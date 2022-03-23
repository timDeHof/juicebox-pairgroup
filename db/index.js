const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

// function to get all users info
async function getAllUsers() {
  const { rows } = await client.query(`SELECT id, username FROM users;`);
  return rows;
}

// export helper functions
module.exports = { client, getAllUsers };
