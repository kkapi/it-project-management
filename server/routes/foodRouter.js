const Router = require('express')
const router = new Router()
const foodController = require('../controllers/foodController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', checkRole('MODERATOR'), foodController.create)
router.post('/delete', checkRole('MODERATOR'), foodController.delete)
router.get('/list/all', authMiddleware, foodController.getAll)
router.get('/page', authMiddleware, foodController.getFoodPage)
router.get('/one/:id', authMiddleware, foodController.getOne)
router.get('/basket', authMiddleware, foodController.getBasket)
router.post('/basket', authMiddleware, foodController.addBasketFood)
router.post('/basket/delete', authMiddleware, foodController.deleteBasketFood)
router.post('/basket/amount', authMiddleware, foodController.changeAmount)
router.post('/order/create', authMiddleware, foodController.createOrder)
router.get('/order/one/:id', authMiddleware, foodController.getOneOrder)

module.exports = router