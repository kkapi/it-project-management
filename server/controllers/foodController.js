const { json } = require('sequelize')
const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')
const { Basket, BasketFood } = require('../models/models')


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

    async getBasket(req, res, next) {
        const {id} = req.user

        const basket = await Basket.findOne({where: {userId: id, isActive: true}, include: BasketFood})

        console.log(id)

        return res.json(basket)
    }

    async addBasketFood(req, res, next) {
        const {id} = req.user
        const {food_id} = req.body

        console.log(req.body)
        console.log(id)

        const foodId = food_id
        
        const basket = await Basket.findOne({where: {userId: id, isActive: true}})

        const basketId = basket.id

        const item = await BasketFood.findOne({where: {foodId, basketId}})

        let basket_food = ''

        if (!item) {
            basket_food = await BasketFood.create({foodId, basketId})
        }        

        return res.json(basket_food)        
    }

    
}

module.exports = new FoodController()