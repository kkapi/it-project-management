const  jwt = require('jsonwebtoken')
const models = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await models.Token.findOne({userId: user_id})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await models.Token.create({userId: user_id, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await models.Token.destroy({where: {refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await models.Token.findOne({where: {refreshToken}})
        return tokenData;
    }
}

module.exports = new TokenService();