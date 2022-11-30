const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, UserInfo} = require('../models/models')
const userService = require('../service/userService')
const tokenService = require('../service/tokenService')
const mailService = require('../service/mailService')
const uuid = require('uuid')
const validationService = require('../service/validationService')
const { json } = require('sequelize')

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body

        if (!email && !password) {
            return next(ApiError.badRequest('Введите email и пароль'))
        }

        if (!email) {
            return next(ApiError.badRequest('Введите email'))
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

        const validEmail = validationService.validateEmail(email)
        if(!validEmail) {
            return next(ApiError.badRequest('Некорректный email'))
        }

        const validPassword = validationService.validatePassword(password)
        if(!validPassword) {
            return next(ApiError.badRequest('Пароль должен содержать от 5 до 20 символов, иметь хотя бы одну цифру, иметь хотя бы один специальный символ [#$&*_-]'))
        }

        try {
            const user = await userService.createUser(email, password, role)
        } catch (e) {
            return next(ApiError.internal('Не удалось создать пользователя'))
        }
        
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
                return next(ApiError.badRequest('Введите email и пароль'))
            }

            if (!email) {
                return next(ApiError.badRequest('Введите email'))
            }

            if (!password) {
                return next(ApiError.badRequest('Введите пароль'))
            }

            const validEmail = validationService.validateEmail(email)
            if(!validEmail) {
                return next(ApiError.badRequest('Некорректный email'))
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

            const token = tokenService.generateJWT(user.id, user.email, user.role, user.isBlocked)
            console.log(token)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
        
    }

    async getAll(req, res, nex) {
        const users = await User.findAll({include: UserInfo})
        
        return res.json(users)
    }

    async getOneUser(req, res, next) {
        try {
            const {id} = req.user

            const user = await User.findOne(
                {
                    where: id,               
                },
            )

            const info = await UserInfo.findOne(
                {
                    where: {userId: id},                    
                },
            )
            
            const data = {
                email: user.email,
                role: user.role,
                isBlocked: user.isBlocked,
                name: info.name,
                phone: info.phone,
                address: info.address
            }
            
            return res.json(data)
        } catch(e) {
            console.log(e)
        }
    }

    async check(req, res, next) {  
        const token = tokenService.generateJWT(req.user.id, req.user.email, req.user.role, req.user.isBlocked)
        return res.json({token})
    }

    async sendRecovery(req, res, next) {
        try {
            const {email} = req.body            
            console.log(email)
            if (!email) {
                return next(ApiError.badRequest('Введите email'))
            }

            const validEmail = validationService.validateEmail(email)
            if(!validEmail) {
                return next(ApiError.badRequest('Некорректный email'))
            }

            const user = await User.findOne({
                where: {
                    email: email,
                    isActivated: true
                }
            })

            if (!user) {
                return next(ApiError.internal('Подтвержденный пользователь с таким email не найден'))
            }

            const recoveryLink = `${process.env.CLIENT_URL}/recoverypass/${user.recoverLink}`

            const data = await mailService.sendRecoveryMail(user.email, recoveryLink)           
           
            return res.json({data})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async resetPassword(req, res, next) {
        try {
            const {password} = req.body
            const recoverLink = req.params.link;
            console.log(recoverLink)

            const user = await User.findOne({
                where: {
                    recoverLink
                }
            })

            if (!user) {
                return next(ApiError.internal('Некорректная ссылка воcстановления'))
            }            

            const newRecoverLink = uuid.v4();
            const hashPassword = await bcrypt.hash(password, 3)

            user.password = hashPassword
            user.recoverLink = newRecoverLink

            await user.save()

            return res.status(200).json({message: 'successReset'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changePassword(req, res, next) {
        const {password} = req.body
        const {id} = req.user

        const user = await User.findOne({
            where: {id}
        })

        const hashPassword = await bcrypt.hash(password, 3)

        user.password = hashPassword
        await user.save()

        return res.status(200).json({message: 'successChange'})
    }

    async changeInfo(req, res, next) {
        console.log("hi---------------")
        const {name, phone, address} = req.body
        const {id} = req.user

        console.log(address)

        const userInfo = await UserInfo.findOne({
            where: {userId: id}
        })

        if (name) {
            userInfo.name = name
        }

        if (phone) {
            userInfo.phone = phone
        }

        if (address) {
            userInfo.address = address
        }

        userInfo.save()

        return res.status(200).json({message: 'successInfoChange'})
    }
}

module.exports = new UserController()