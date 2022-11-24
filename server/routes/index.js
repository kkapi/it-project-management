const Router = require('express').Router;
const router = new Router();

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
// router.use('/type', typeRouter)
// router.use('/product', productRouter)

module.exports = router



