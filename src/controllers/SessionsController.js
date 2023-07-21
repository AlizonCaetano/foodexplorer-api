const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')
const authConfig = require('../config/auth')
const { sign } = require('jsonwebtoken')

class SessionsController{
    async create(req, res) {
        const { email, password } = req.body
        const user = await knex('users').where({email}).first()

        if(!user){
            throw new AppError('Email/password incorrect, try again.', 401)
        }

        const matchPassword = await compare(password, user.password)

        if(!matchPassword){
            throw new AppError('Email/password incorrect, try again.', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return res.json({ user, token })
    }
}

module.exports = SessionsController