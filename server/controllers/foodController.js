const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')
const {Food, FoodInfo} = require('../models/models')

class FoodController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info} = req.body
            const {img} =  req.files        
            
            const food = await foodService.create(name, price, typeId, img, info)

            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query    
        
        const foods = await foodService.getAll(typeId, limit, page)
       
        return res.json(foods)
    }

    async getOne(req, res) {
        
    }
}

module.exports = new FoodController()