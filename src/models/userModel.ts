import pool from '../config/database';

// Function to insert a new user into the database
export const createUser = async (username: string, password: string) => {
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );
  
  // Return the newly created user
  return result.rows[0];
};

// Function to get all users
export const retrieveUsers = async() => {
  const result = await pool.query('SELECT id, username FROM users');
  return result;
}