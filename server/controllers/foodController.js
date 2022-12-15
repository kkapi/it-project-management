const { sequelize, json } = require('sequelize')
const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')
const { Basket, BasketFood, Food, Order, User, UserInfo, Card } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FoodController {
    async create(req, res, next) {
        try {
            let {name, description, price, typeId, info} = req.body
            const {img} = req.files        
            
            const food = await foodService.create(name, description, price, typeId, img, info)

            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeImg(req, res, next) {
        try {
            const {id} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const food = await Food.findOne({where: {id}})

            try {
                fs.unlink(path.resolve(__dirname, '..', 'static', food.img), (err) => {
                    if (err) throw err;                  
                    console.log('Deleted');
                });  
            } catch(e) {
                console.log(e)
            }

            food.img = fileName
            food.save()

            return res.json('ok')

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {name} = req.body
        console.log(name)
        const data = foodService.delete(name)
        
        return res.json({data})
    }

    async getAll(req, res) {
        const foods = await foodService.getAll()

        return res.json(foods)
    }

    async getFoodPage(req, res) {
        let {typeId, limit, page} = req.query    
        
        const foods = await foodService.getFoodPage(typeId, limit, page)
       
        return res.json(foods)
    }

    async getOne(req, res) {
        const {id} = req.params

        const food = await foodService.getOne(id)

        return res.json(food)
    }

    async getBasket(req, res) {
        
        const {id} = req.user
        const basket = await Basket.findOne({where: {userId: id, isActive: true}, include: [{model: BasketFood, include: [Food]}], order: [[BasketFood, 'foodId', 'ASC']]})        

        return res.json(basket)

    }

    async addBasketFood(req, res, next) {
        const {id} = req.user
        const {food_id} = req.body
        
        const basket = await Basket.findOne({where: {userId: id, isActive: true}})

        const item = await BasketFood.findOne({where: {foodId: food_id, basketId: basket.id}})

        let basket_food = ''

        if (!item) {
            basket_food = await BasketFood.create({foodId: food_id, basketId: basket.id, amount: 1})          

        } else {
            basket_food = await BasketFood.findOne({where: {foodId: food_id, basketId: basket.id}})
            basket_food.amount = basket_food.amount + 1
            basket_food.save()
        }       

        return res.json(basket_food)        
    }

    async repeat(req, res, next) {
        const {bId, userId} = req.body
        try {
            const basket = await Basket.findOne({where: {isActive: true, userId}})
            await BasketFood.destroy({where: {basketId: basket.id}})

            const food = await BasketFood.findAll({where: {basketId: bId}})
           
            food.map(item => {
                BasketFood.create({foodId: item.foodId, basketId: basket.id, amount: item.amount})
                console.log('----------')
                console.log(item.id)
                console.log(item.amount)
                console.log(bId)
                console.log('----------')
            })

            return res.json(food)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteBasketFood(req, res, next) {
        const {bfId} = req.body
        
        try {
            const data = await BasketFood.destroy({where: {id: bfId}})

            return res.json(data)
        } catch (e) {
            return res.json(e)
        }
    }

    async changeAmount(req, res, next) {
        const {bfId, amount} = req.body
        try {
            const basketFood = await BasketFood.findOne({where: {id: bfId}})
            basketFood.amount = amount
            basketFood.save()

            return res.json(amount)
        } catch (e) {
            return res.json(e)
        }
    }

    async createOrder(req, res, next) {
        const {id} = req.user
        const {method, comment, final_price, wish_time} = req.body
        try {
            console.log(method)
            console.log(comment)
            const userInfo = await UserInfo.findOne({where: {userId: id}})
            const basket = await Basket.findOne({where: {userId: id, isActive: true}})
            const basketId = basket.id
            basket.final_price = final_price
            basket.save()
            const order = await Order.create({basketId, pay_method: method, wishes: comment, status: 'Принят', name: userInfo.name, phone: userInfo.phone, address: userInfo.address, sum: final_price, wish_time})
            
            const dateTime = new Date(order.createdAt)
            const date = dateTime.toLocaleDateString()
            let time = dateTime.toLocaleTimeString()

            let testTime = time.split(':')
            time = testTime[0] + ':' + testTime[1]
            
            order.date = date
            order.registration_time = time
            order.save()
            basket.isActive = false
            basket.save()
            const newBasket = await Basket.create({userId: id})

            return res.json({order})
        } catch (e) {
            console.log('---------!!!!!!!!!!!!!---------')
            console.log(e)
            return res.json(e)
        }
    }

    async getOneOrder(req, res, next) {
        const {id} = req.params
        console.log(id)
        try {
            const order = await Order.findOne({where: {id}})
            const foods = await BasketFood.findAll({where: {basketId: order.basketId}, include: [Food]})
            const basket = await Basket.findOne({where: {id: order.basketId}})
            const price = basket.final_price
            console.log(order)
            return res.json({order, foods, price})

        } catch (e) {
            return res.json(e)
        }
    }

    async payOrder(req, res, next) {
        const {number, period, cvc, name, sum} = req.body
        try {
            const card = await Card.findOne({where: {number, period, cvc, name}})
            if (!card) {
                return next(ApiError.badRequest('Карта не найдена'))
            }
            console.log(card.balance - Number(sum))

            if (card.balance - Number(sum) < 0) {
                return next(ApiError.badRequest('Недостаточно средств'))
            } else {
                card.balance = card.balance - Number(sum)
                card.save()
            }

            return res.json({result: "success"})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setOrderStatus(req, res, next) {
        const {id, status} = req.body
        try {
            const order = await Order.findOne({where: {id}})
            order.status = status
            order.save()
            return res.json(order.status)
        } catch (e) {
            console.log(e)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll({order: [
                ['id', 'DESC'],                
            ]})
            return res.json(orders)

        } catch (e) {
            console.log(e)
        }
    }

    async changeInfo(req, res, next) {
        const {id, name, description, price} = req.body
        try {
            const food = await Food.findOne({where: {id}})

            console.log(req.body)

            if (name) {
                food.name = name
            }

            if (description) {
                food.description = description
            }

            if (price) {
                food.price = price
            }

            food.save()

            return res.json(food)
        } catch (e) {
            console.log(e)
        }
    }
    
    async getUserOrdres(req, res, next) {
        const {id} = req.user
        try {
            const basketsId = await Basket.findAll({attributes: ['id'], where: {userId: id}})
            let bsId = []
            basketsId.map(item => {
                bsId.push(item.id)
            })
            const userOrders = await Order.findAll({where: {basketId: bsId}, order: [['id', 'DESC'],]})

            console.log(bsId)
            return res.json(userOrders)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new FoodController()