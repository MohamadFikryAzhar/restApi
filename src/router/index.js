const recipe = require('./recipeRouter')
const category = require('./categoryRouter')
const users = require('./usersRouter')
const app = require('express')
const router = app.Router()

router.use('/recipe',recipe)
router.use('/category',category)
router.use('/users',users)

module.exports = router;