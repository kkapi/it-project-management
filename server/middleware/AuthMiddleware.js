const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {       
        const token = req.headers.authorization.split(' ')[1]        
        if (token === 'null') {            
            return res.status(401).json({message: "Не авторизован"})
        }     
      
        const data = jwt.verify(token, process.env.SECRET_KEY)        
        decoded = {
            id: data.id,
            email: data.email,
            role: data.role,
            isBlocked: data.isBlocked
        }

        if (decoded.isBlocked) {
            return res.status(403).json({message: "Заблокирован"})
        }
        
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};