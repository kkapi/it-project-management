const ApiError = require('../error/ApiError')
const foodService = require('../service/foodService')

class FoodController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info} = req.body
            const {img} = req.files        
            
            const food = await foodService.create(name, price, typeId, img, info)

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
        let {typeId, limit, page} = req.query    
        
        const foods = await foodService.getAll(typeId, limit, page)
       
        return res.json(foods)
    }

    async getOne(req, res) {
        const {id} = req.params

        const food = await foodService.getOne(id)

        return res.json(food)
    }
}

module.exports = new FoodController()