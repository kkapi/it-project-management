const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const userService = require('../service/userService')
const tokenService = require('../service/tokenService')

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body

        if (!email && !password) {
            return next(ApiError.badRequest('Введите eamil и пароль'))
        }

        if (!email) {
            return next(ApiError.badRequest('Введите eamil'))
        }

        if (!password) {
            return next(ApiError.badRequest('Введите пароль'))
        }
        
        const candidate = await User.findOne({
            where: {
                email,
                isActivated: true
            }
        })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const user = await userService.createUser(email, password, role)
        
        return res.json({email})
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

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email && !password) {
                return next(ApiError.badRequest('Введите eamil и пароль'))
            }

            if (!email) {
                return next(ApiError.badRequest('Введите eamil'))
            }

            if (!password) {
                return next(ApiError.badRequest('Введите пароль'))
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                return next(ApiError.internal('Пользователь с таким email не найден'))
            }

            if (!user.isActivated) {
                return next(ApiError.internal('Подтвердите аккаунт по почте'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }

            const token = tokenService.generateJWT(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
        
    }

    async check(req, res, next) {        
        const token = tokenService.generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()