const { Router } = require('express')
const ingredientsRouter = Router()

const IngredientsController = require('../controllers/IngredientsController')
const ingredientsController = new IngredientsController()

const ensuranceAuthenticated = require('../middlewares/ensuranceAuthenticated')

ingredientsRouter.get('/', ensuranceAuthenticated, ingredientsController.index)

module.exports = ingredientsRouter