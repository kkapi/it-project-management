const Router = require('express')
const router = new Router()
const foodRouter = require('./foodRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/food', foodRouter)

module.exports = router