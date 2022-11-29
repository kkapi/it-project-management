const {User, Basket, UserInfo} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../service/mailService')

class UserService {
    async createUser(email, password, role) {
        const activationLink = uuid.v4();
        const recoverLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 3)

        const user = await User.create({email, role, password: hashPassword, activationLink, recoverLink})
        const basket = await Basket.create({userId: user.id})
        const userInfo = await UserInfo.create({userId: user.id})          
        
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        return user
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();

        User.destroy({
            where: {
                email: user.email,
                isActivated: false
            }
        })
    }
}

module.exports = new UserService()