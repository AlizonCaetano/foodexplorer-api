const AppError = require('../utils/AppError');
const knex = require('../database/knex')
const DiskStorage = require("../providers/DiskStorage")

class DishesController{
    async create(req, res){
        const { title, description, category, price, ingredients } = req.body
        const user_id = req.user.id
        
        if(!user_id){
            throw new AppError('User ID is required!')
        }

        const checkDishAlreadyExists = await knex('dishes').where({title}).first()
    
        if(checkDishAlreadyExists){
            throw new AppError('This name has already been used')
        }

        const imageFileName = req.file.filename
        const diskStorage = new DiskStorage()
        const filename = await diskStorage.saveFile(imageFileName)
        
        const [dish_id] = await knex('dishes').insert({
            user_id,
            image: filename, 
            title,
            description,
            price,
            category,
        })

        let ingredientsInsert
        if( typeof(ingredients) == 'string'){
            ingredientsInsert = {
                name: ingredients,
                dish_id,
                user_id
            }
        } else {
            ingredientsInsert = ingredients.map(name => {
                return {
                    name,                
                    dish_id,
                    user_id
                }
            })
        } 

        await knex('ingredients').insert(ingredientsInsert)

        return res.status(201).json()  
    }

    async update(req, res) {
        const { image, title, description, category, price, ingredients } = req.body
        const { id } = req.params

        const dish = await knex('dishes').where({ id }).first()
        
        let filename
        if(req.file){
            const imageFileName = req.file.filename
            const diskStorage = new DiskStorage()
            await diskStorage.deleteFile(dish.image);
            filename = await diskStorage.saveFile(imageFileName)
        }

        dish.image = image == 'null' ? dish.image : filename
        dish.title = title ?? dish.title
        dish.description = description ?? dish.description
        dish.category = category ?? dish.category
        dish.price = price ?? dish.price


        let ingredientsInsert
        if( typeof(ingredients) == 'string'){
            ingredientsInsert = {
                name: ingredients,
                dish_id: dish.id,
                user_id: dish.user_id
            }
        } else {
            ingredientsInsert = ingredients.map(name => {
                return {
                    name,                
                    dish_id: dish.id,
                    user_id: dish.user_id
                }
            })
        } 
        console.log(price)
        await knex('dishes').where({ id }).update(dish)
        await knex("ingredients").where({ dish_id: id}).delete()
        await knex('ingredients').where({ dish_id: id }).insert(ingredientsInsert)

        return res.status(201).json()
    }

    async delete(request, response) {
        const { id } = request.params

        await knex('dishes').where({ id }).delete()

        return response.status(202).json()
    }

    async show(req, res) {
        const { id }  = req.params

        const dish = await knex('dishes').where({ id }).first()
        const ingredients = await knex('ingredients').where({ dish_id: id }).orderBy('name')

        return res.status(201).json({
            ...dish,
            ingredients
        })
    }

    async index(req, res){
        const { search } = req.query
        
        let dishes

        const searchTerms = search.split(' ').map(term => term.trim())
        const checkIngredientsInSearch = await knex('ingredients')
        .whereLike('name', searchTerms)

        if (checkIngredientsInSearch.length > 0) {
            const searchTerms = search.split(' ').map(term => term.trim())

            
            dishes = await knex('dishes')
                .select([
                    'dishes.id',
                    'dishes.title',
                    'dishes.description',
                    'dishes.category',
                    'dishes.price',
                    'dishes.image',
                ])
                .whereLike('dishes.title', `%${search}%`)
                .whereIn('name', searchTerms)
                .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
                .groupBy('dishes.id')
                .orderBy('dishes.title')

        } else {
            dishes = await knex('dishes')
                .whereLike('title', `%${search}%`)
                .orderBy('title')
        }

        
        const dishesIngredients = await knex('ingredients') 
        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id);

            return {
                ...dish,
                ingredients: dishIngredient
            }
        })
        
        return res.status(200).json(dishesWithIngredients)
    }
}
     
module.exports = DishesController