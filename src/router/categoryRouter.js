const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Endpoint to get all categories
router.get('/categories', categoryController.getAllCategories);

// Endpoint to add a new category
router.post('/categories', categoryController.addCategory);

// Endpoint to update a category by ID
router.put('/categories/:id', categoryController.updateCategory);

// Endpoint to delete a category by ID
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
