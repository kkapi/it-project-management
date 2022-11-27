const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const foodRouter = require('./foodRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/food', foodRouter)

module.exports = router