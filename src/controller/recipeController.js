const {
    getRecipeTable,
    addRecipeTable,
    updateRecipeTable,
    deleteRecipeTableById,
    getRecipeCategoryUserAll,
    getRecipeSearch,
    getRecipeSort
  } = require('../model/recipeModel');
  
  const { checkIdRecipe } = require('../helper/validating');
  
  const recipeController = {
    getRecipesBySearch: async (req, res) => {
      console.log('Control: Running search');
      const { search, searchBy, offset, limit } = req.query;
      try {
        const searchData = {
          searchBy: searchBy || 'name',
          search: search || '',
          offset: offset || 0,
          limit: limit || 5
        };
        const resultGetRecipeSearch = await getRecipeSearch(searchData);
        if (resultGetRecipeSearch.rowCount > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully retrieved recipes by search',
            data: resultGetRecipeSearch.rows
          });
          console.log(resultGetRecipeSearch.rows);
        } else {
          res.status(404).json({
            status: 404,
            message: 'No recipe data found by search',
            data: 'Data not found'
          });
          console.log('Data not found');
        }
      } catch (error) {
        console.error(`Error when trying to fetch recipes by search: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to fetch recipes by search'
        });
      }
    },
  
    getRecipesSorted: async (req, res) => {
      console.log('Control: Running sort');
      const { sortby, sort } = req.query;
      try {
        const sortData = {
          sortby: sortby || 'created_at',
          sort: sort || 'ASC'
        };
        const resultRecipeSort = await getRecipeSort(sortData);
        if (resultRecipeSort.rowCount > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully retrieved recipes by sort',
            data: resultRecipeSort.rows
          });
          console.log(resultRecipeSort.rows);
        } else {
          res.status(404).json({
            status: 404,
            message: 'No recipe data found by sort',
            data: 'Data not found'
          });
          console.log('Data not found');
        }
      } catch (error) {
        console.error(`Error when trying to fetch recipes by sort: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to fetch recipes by sort'
        });
      }
    },
  
    getAllRecipeCategoriesAndUsers: async (req, res) => {
      console.log('Control: Running get all recipe categories and users');
      try {
        const resultGetRecipeAll = await getRecipeCategoryUserAll();
        if (resultGetRecipeAll) {
          res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all recipe categories and users',
            data: resultGetRecipeAll.rows
          });
          console.log(resultGetRecipeAll.rows);
        }
      } catch (error) {
        console.error(`Error when trying to fetch all recipe categories and users: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to fetch all recipe categories and users'
        });
      }
    },
  
    getAllRecipes: async (req, res) => {
      console.log('Control: Running get all recipes');
      try {
        const resultGetRecipe = await getRecipeTable();
        if (resultGetRecipe) {
          res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all recipes',
            data: resultGetRecipe.rows
          });
          console.log(resultGetRecipe.rows);
        }
      } catch (error) {
        console.error(`Error when trying to fetch recipes: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to fetch recipes'
        });
      }
    },
  
    addRecipe: async (req, res) => {
      console.log('Control: Posting recipe data');
      const { id, name, ingredients } = req.body;
      try {
        const isIdExists = await checkIdRecipe(id);
        if (isIdExists) {
          res.status(400).json({
            status: 400,
            message: 'ID already in use'
          });
          return console.log('Control: Cannot post, id conflict detected in this post');
        }
        console.log(`Control: Post success with id ${id}`);
        const addDataRecipe = {
          id: parseInt(id),
          name,
          ingredients
        };
        const resultAddRecipe = await addRecipeTable(addDataRecipe);
        res.status(201).json({
          status: 201,
          message: 'Successfully added recipe data',
          data: resultAddRecipe.rows
        });
        console.log(resultAddRecipe.rows);
      } catch (error) {
        console.error(`Error when trying to add recipe data: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to add recipe data'
        });
      }
    },
  
    updateRecipe: async (req, res) => {
      console.log('Control: Updating recipe data');
      const { id } = req.params;
      const { name, ingredients } = req.body;
      try {
        const dataUpdateRecipe = {
          id: parseInt(id),
          name,
          ingredients
        };
        const resultUpdateRecipe = await updateRecipeTable(dataUpdateRecipe);
        res.status(200).json({
          status: 200,
          message: 'Successfully updated recipe data',
          data: resultUpdateRecipe.rows
        });
        console.log(resultUpdateRecipe.rows);
      } catch (error) {
        console.error(`Error when trying to update recipe data: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to update recipe data'
        });
      }
    },
  
    deleteRecipeById: async (req, res) => {
      console.log('Control: Deleting recipe data by id');
      const { id } = req.params;
      try {
        const dataDeleteRecipe = {
          id: parseInt(id)
        };
        const resultDeleteRecipe = await deleteRecipeTableById(dataDeleteRecipe);
        res.status(200).json({
          status: 200,
          message: 'Successfully deleted recipe data',
          data: resultDeleteRecipe.rows
        });
        console.log(resultDeleteRecipe.rows);
      } catch (error) {
        console.error(`Error when trying to delete recipe data: ${error.message}`);
        res.status(500).json({
          status: 500,
          message: 'An error occurred while trying to delete recipe data'
        });
      }
    }
  };
  
  module.exports = recipeController;
  