const { getUsersTable, addUsersTable, updateUsersTable, deleteUsersTableById } = require('../model/usersModel');
const { checkIdUser } = require('../helper/validating');
const bcrypt = require('bcryptjs');

const usersController = {
  getUsersOnly: async (req, res) => {
    try {
      const resultGetUsers = await getUsersTable();
      if (resultGetUsers) {
        res.status(200).json({ "status": 200, "message": "Successfully retrieved users data", data: resultGetUsers.rows });
      }
    } catch (error) {
      console.error(`Error while fetching users data: ${error.message}`);
      res.status(500).json({ "status": 500, "message": "An error occurred while fetching users data" });
    }
  },
  addUsersOnly: async (req, res) => {
    const { id, username, email, password } = req.body;
    try {
      const isIdExists = await checkIdUser(id);
      if (isIdExists) {
        return res.status(400).json({ "status": 400, "message": "ID is already used" });
      }

      // Perform validation for other input data
      if (!username || !email || !password) {
        return res.status(400).json({ "status": 400, "message": "User data is incomplete" });
      }

      const userHash = await bcrypt.hash(password, 10);
      let addDataUsers = {
        id: parseInt(id),
        username: username,
        email: email,
        password: userHash
      };
      const resultAddUsers = await addUsersTable(addDataUsers);
      res.status(201).json({ "status": 200, "message": "Successfully added users data", addData: resultAddUsers.rows });
    } catch (error) {
      console.error(`Error while adding users data: ${error.message}`);
      res.status(500).json({ "status": 500, "message": "An error occurred while adding users data" });
    }
  },
  updateUsersOnly: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      let dataUpdateUsers = {
        id: parseInt(id),
        username: username,
        email: email,
        password: password // You can perform validation for other input data as in addUsersOnly if needed
      };
      const resultUpdateUsers = await updateUsersTable(dataUpdateUsers);
      res.status(200).json({ "status": 200, "message": "Successfully updated users data", updateData: resultUpdateUsers.rows });
    } catch (error) {
      console.error(`Error while updating users data: ${error.message}`);
      res.status(500).json({ "status": 500, "message": "An error occurred while updating users data" });
    }
  },
  deleteUsersById: async (req, res) => {
    const { id } = req.params;
    try {
      let dataDeleteUsers = {
        id: parseInt(id)
      };
      const resultDeleteUsers = await deleteUsersTableById(dataDeleteUsers);
      res.status(200).json({ "status": 200, "message": "Successfully deleted users data", deleteData: resultDeleteUsers.rows });
    } catch (error) {
      console.error(`Error while deleting users data: ${error.message}`);
      res.status(500).json({ "status": 500, "message": "An error occurred while deleting users data" });
    }
  }
};

module.exports = usersController;
