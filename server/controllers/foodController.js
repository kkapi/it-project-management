const { json } = require('sequelize')
const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')
const { Basket, BasketFood, Food } = require('../models/models')


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

    
}

module.exports = new FoodController()