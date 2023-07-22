const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Endpoint to get all users
router.get('/users', usersController.getAllUsers);

// Endpoint to add a new user
router.post('/users', usersController.addUser);

// Endpoint to update a user by ID
router.put('/users/:id', usersController.updateUser);

// Endpoint to delete a user by ID
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
