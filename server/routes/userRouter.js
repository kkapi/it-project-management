const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/sendrecovery', userController.sendRecovery)
router.post('/reset/:link', userController.resetPassword)
router.post('/changepass', authMiddleware, userController.changePassword)
router.post('/changeinfo', authMiddleware, userController.changeInfo)
router.post('/changestatus', checkRole(['ADMIN']), userController.changeStatus)
router.post('/changerole', checkRole(['ADMIN']), userController.changeRole)
router.get('/auth', authMiddleware, userController.check)
router.get('/activate/:link', userController.activate)
router.get('/one/:id', authMiddleware, userController.getOneUser)
router.get('/all', checkRole(['ADMIN']), userController.getAll)

module.exports = router