const { Client } = require("pg");
const { rows } = require("pg/lib/defaults");
const client = new Client("postgres://localhost:5432/juicebox-dev");
// user functions
// getAllUsers
async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username,password, name, location, active
        FROM users;
        `
  );
  return rows;
}
// createUser
async function createUser({ username, password, name, location }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, name, location)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `,
      [username, password, name, location]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// updateUser
async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// getUserById
async function getUserById(userId) {
  // first get the user (NOTE: Remember the query returns
  // (1) an object that contains
  // (2) a `rows` array that (in this case) will contain
  // (3) one object, which is our user.
  // if it doesn't exist (if there are no `rows` or `rows.length`), return null

  // if it does:
  // delete the 'password' key from the returned object
  // get their posts (use getPostsByUser)
  // then add the posts to the user object with key 'posts'
  // return the user object
  try {
    const { rows } = client.query(`SELECT * FROM users WHERE "id"= ${userId};`);
    // if it doesn't exist (if there are no `rows` or `rows.length`), return null
    if (rows.length === 0) {
      return null;
      // if it does:
      // delete the 'password' key from the returned object
      // get their posts (use getPostsByUser)
      // then add the posts to the user object with key 'posts'
      // return the user object
    } else {
    }
  } catch (error) {
    throw error;
  }
}
// Posts functions
// createPosts
async function createPost({ authorId, title, content }) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
            INSERT INTO posts(authorId, title, content)
            VALUES ($1,$2,$3)
            ON CONFLICT (authorId) DO NOTHING
            RETURNING *;
            `,
      [authorId, title, content]
    );
    return post;
  } catch (error) {
    throw error;
  }
}
// UpdatePost
async function updatePost(
  id,
  fields = {
    title,
    content,
    active,
  }
) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [post],
    } = await client.query(
      `
              UPDATE posts
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
            `,
      Object.values(fields)
    );
    return post;
  } catch (error) {
    throw error;
  }
}
// getAllPosts
async function getAllPosts() {
  try {
    const { rows } = await client.query(
      `SELECT id,"authorId",title, content, active 
            FROM posts;
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// getPostsByUser
async function getPostsByUser(userId) {
  try {
    const { rows } = client.query(
      `SELECT * FROM posts WHERE "authorId"=${userId}`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
};
