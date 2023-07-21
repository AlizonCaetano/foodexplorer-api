const { Router } = require('express')
const userRoutes = Router()

const UserController = require('../controllers/UserController')
const userController = new UserController()

const ensuranceAuthenticated = require('../middlewares/ensuranceAuthenticated')

userRoutes.post('/', userController.create)
userRoutes.put('/', ensuranceAuthenticated, userController.update)


module.exports = userRoutes