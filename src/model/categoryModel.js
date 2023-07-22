const pool = require('../config/db');

const getCategory = async () => {
  try {
    console.log("Model: Get category table");
    const results = await pool.query(`SELECT * FROM category`);
    return results.rows;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

module.exports = {
  getCategory,
};
