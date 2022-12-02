const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('MODERATOR'), typeController.create)
router.get('/', typeController.getAll)
router.post('/delete', checkRole('MODERATOR'), typeController.delete)

module.exports = router