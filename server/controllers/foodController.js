const uuid = require('uuid')
const path = require('path')
const {Food} = require('../models/models')
const ApiError = require('../error/ApiError')

class FoodController {
    async create(req, res, next) {
        try {
            const {name, price, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const food = await Food.create({name, price, typeId, img: fileName})
            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        } 
    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit =  limit ||  9
        let offset = page * limit - limit
        let foods
        
        if (!typeId) {
            foods =  await Food.findAndCountAll({limit, offset})
        }

        if (typeId) {
            foods =  await Food.findAndCountAll({where:{typeId}, limit, offset})

        }
        return res.json(foods)

    }

    async getOne(req, res) {

    }
}

module.exports = new FoodController()