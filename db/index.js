const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

// function to get all users info
async function getAllUsers() {
  const { rows } = await client.query(`SELECT id, username FROM users;`);
  return rows;
}

// function to creating a user
async function createUser({ username, password, name, location }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
      [username, password, name, location]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// export helper functions
module.exports = { client, getAllUsers, createUser };
