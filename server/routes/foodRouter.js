const Router = require('express')
const router = new Router()
const foodController = require('../controllers/foodController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('MODERATOR'), foodController.create)
router.post('/delete', checkRole('MODERATOR'), foodController.delete)
router.get('/', foodController.getAll)
router.get('/page', foodController.getFoodPage)
router.get('/:id', foodController.getOne)

module.exports = router