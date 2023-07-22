const pool = require('../config/db');

const getUsersTable = async () => {
  try {
    console.log("Model: Get users table");
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error while fetching users data: ${error.message}`);
  }
};

const addUsersTable = async (addData) => {
  try {
    console.log("Model: Add users table");
    const { id, username, email, password } = addData;
    const query = 'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, username, email, password];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error while adding user data: ${error.message}`);
  }
};

const updateUsersTable = async (updateData) => {
  try {
    console.log('Model: Update users table');
    const { id, username, email, password } = updateData;
    const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
    const values = [username, email, password, id];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error while updating user data: ${error.message}`);
  }
};

const deleteUsersTableById = async (deleteData) => {
  try {
    console.log('Model: Delete users with id');
    const { id } = deleteData;
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error while deleting user data: ${error.message}`);
  }
};

module.exports = {
  getUsersTable,
  addUsersTable,
  updateUsersTable,
  deleteUsersTableById
};
