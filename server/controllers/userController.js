const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const userService = require('../service/userService')
const tokenService = require('../service/tokenService')

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже сущесвтует'))
        }

        const user = await userService.createUser(email, password, role)
        
        const token = tokenService.generateJWT(user.id, user.email, user.role)

        return res.json({token})
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            console.log(activationLink)
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res) {
        
    }

    async check(req, res, next) {
        
    }
}

module.exports = new UserController()