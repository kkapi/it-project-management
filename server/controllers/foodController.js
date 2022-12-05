const { sequelize, json } = require('sequelize')
const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')
const { Basket, BasketFood, Food, Order } = require('../models/models')


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
        const {method, comment, final_price} = req.body
        try {
            console.log(method)
            console.log(comment)
            const basket = await Basket.findOne({where: {userId: id, isActive: true}})
            const basketId = basket.id
            basket.final_price = final_price
            basket.save()
            const order = await Order.create({basketId, pay_method: method, wishes: comment, status: 'Принят'})
            basket.isActive = false
            basket.save()
            const newBasket = await Basket.create({userId: id})

            return res.json({order})
        } catch (e) {
            return res.json(e)
        }
    }

    async getOneOrder(req, res, next) {
        const {id} = req.params
        console.log(id)
        try {
            const order = await Order.findOne({where: {id}})
            const foods = await BasketFood.findAll({where: {basketId: order.basketId}, include: [Food]})
            console.log(order)
            return res.json({order, foods})

        } catch (e) {
            return res.json(e)
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
            const userOrders = await Order.findAll({where: {basketId: bsId}})

            console.log(bsId)
            return res.json(userOrders)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new FoodController()