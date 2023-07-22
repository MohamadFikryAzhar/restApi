const {getCategoryTable} = require('../model/categoryModel')

const categoryController = {
    getCategoryOnly: async (req, res) => {
        console.log('Control: Running get category table')
        try {
          const resultGetCategory = await getCategoryTable();
          console.log(resultGetCategory.rows);
          if (resultGetCategory.rows.length > 0) {
            res.status(200).json({ "status": 200, "message": "Successfully retrieved categories", data: resultGetCategory.rows });
          } else {
            res.status(404).json({ "status": 404, "message": "No category data found" });
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data category: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "An error occurred while trying to fetch categories" });
        }
    }
}

module.exports = categoryController