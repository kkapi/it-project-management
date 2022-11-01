const UserModel = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDtos')
const ApiError = require('../error/ApiError')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.User.findOne({where: {email}})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.User.create({email, password: hashPassword, activationLink})
       
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user)
        
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }   
    }

    async activate(activationLink) {
        const user = await UserModel.User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.User.findOne({where: {
            email: email
        }})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
            
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens =  tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }   
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnathorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData  || !tokenFromDb) {
            throw ApiError.UnathorizedError();
        }

        const user = await UserModel.User.findOne({where:{
            id: userData.id
        }})
        const userDto = new UserDto(user);
        const tokens =  tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }   
    }

    async getAllUsers() {
        const users = await UserModel.User.findAll();
        return users;
    }

    async recover(email) {
        const user = await UserModel.User.findOne({where: {
            email: email
        }})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const password = uuid.v4();        
        const hashPassword = await bcrypt.hash(password, 1);
        user.password = hashPassword;
        await user.save();
        await mailService.sendRecovery(email, password)
    }
}

module.exports = new UserService();