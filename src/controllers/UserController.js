const AppError = require('../utils/AppError')
const knex = require('../database/knex')

const { hash, compare } = require('bcryptjs')

const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')


class UserController{
    async create(req, res){
        const { name, email, password } = req.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)
        await userCreateService.execute({ name, email, password })

        return res.status(201).json()
    }

    async update(req, res){
        const  { name, email, password, old_password } = req.body
        if(!name || !email || !password){
            throw new AppError('Name, email and password are required!')
        }

        const user_id  = req.user.id
        const userCheck = await knex('users').where({ id: user_id }).first()
        if(!userCheck){
            throw new AppError('User not found!')
        }
        
        const checkUserWithUpdatedEmail = await knex('users').where({ email }).first()
        

        if(checkUserWithUpdatedEmail && checkUserWithUpdatedEmail.id !== user_id){
            throw new AppError('This email already in use.')
        }

        userCheck.name = name ?? userCheck.name
        userCheck.email = email ?? userCheck.email

        if (password && !old_password) {
            throw new AppError('Old password is required!');
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, userCheck.password)
            if(!checkOldPassword){
                throw new AppError('Alert: Old password is wrong!')
            }

            userCheck.password = await hash(password, 8)
        }

        await knex('users')
        .where({ id: user_id })
        .update({
            name: userCheck.name, 
            password: userCheck.password,
            email: userCheck.email,
            updated_at: knex.raw('current_timestamp')
        })

        return res.status(201).json()
    }
}

module.exports = UserController
