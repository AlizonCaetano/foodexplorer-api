const { Router } = require('express')
const routes = Router()

const sessionsRouter = require('./sessions.routes')
const userRoutes = require('./user.routes')
const dishesRouter = require('./dishes.routes')
const ingredientsRouter = require('./ingredients.routes')

routes.use('/sessions', sessionsRouter)
routes.use('/user', userRoutes)
routes.use('/dishes', dishesRouter)
routes.use('/ingredients', ingredientsRouter)



module.exports = routes