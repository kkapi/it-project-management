const jwt = require('jsonwebtoken')

class TokenService {
    generateJWT = (id, email, role, isBlocked) => {
        return jwt.sign(
            {id, email, role, isBlocked},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
    }
}

module.exports = new TokenService()