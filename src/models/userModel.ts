import pool from '../config/database';

// Insert a new user
export const createUser = async (username: string, password: string) => {
  const result = await pool.query(
    'INSERT INTO authschema.users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, password]
  );

  // Return the newly created user
  return result.rows[0];
};

// Get all users
export const retrieveUsers = async() => {
  const result = await pool.query('SELECT id, username FROM authschema.users');
  return result;
}

// User login
export const getUserByUsername = async (username: string) => {
  const result = await pool.query('SELECT * FROM authschema.users WHERE username = $1', [username]);
  return result.rows[0];
};