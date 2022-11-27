const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/activate/:link', userController.activate)
router.post('/sendrecovery', userController.sendRecovery)
router.post('/reset/:link', userController.resetPassword)

module.exports = router