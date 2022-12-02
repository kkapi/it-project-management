const Router = require('express')
const router = new Router()
const foodController = require('../controllers/foodController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', checkRole('MODERATOR'), foodController.create)
router.post('/delete', checkRole('MODERATOR'), foodController.delete)
router.get('/all', authMiddleware, foodController.getAll)
router.get('/page', authMiddleware, foodController.getFoodPage)
router.get('/:id', authMiddleware, foodController.getOne)
router.post('/basket', authMiddleware, foodController.getBasket)
router.post('/basket/food', authMiddleware, foodController.addBasketFood)

module.exports = router