const { Router } = require('express');
const dishesRoutes = Router();

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const ensuranceAuthenticated = require('../middlewares/ensuranceAuthenticated')

const uploadConfig = require('../config/upload')
const multer = require('multer')
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensuranceAuthenticated)

dishesRoutes.post('/', upload.single('image'), dishesController.create)
dishesRoutes.put('/:id', upload.single('image'), dishesController.update)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)


module.exports = dishesRoutes