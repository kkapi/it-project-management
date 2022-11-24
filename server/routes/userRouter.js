const Router = require('express')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userController')

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/recovery', userController.reqRecover);
router.get('/setPass/:link', userController.setPass);
router.post('/changePass', userController.changePass);
router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}), 
    userController.registration
);

module.exports = router