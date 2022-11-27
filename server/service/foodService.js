const {Food, FoodInfo} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class FoodService {
    async create(name, price, typeId, img, info) {
            try {
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const food = await Food.create({name, price, typeId, img: fileName})

                if (info) {
                    info = JSON.parse(info)
                    info.forEach(i =>
                        FoodInfo.create({
                            title: i.title,
                            description: i.description,
                            foodId: food.id
                        })
                    )
                }    
                
                return food
            } catch (e) {
                console.log(e)
            }            
    }

    async getAll(typeId, limit, page) {
        page = page || 1
        limit = limit || 9

        let offset = page * limit - limit
        let foods

        if(!typeId) {
            foods = await Food.findAndCountAll({limit, offset})
        }

        if(typeId) {
            foods = await Food.findAndCountAll({where:{typeId}}, limit, offset)
        }

        return foods
    }

    async getOne(id) {
        
        const food = await Food.findOne(
            {
                where: {id},
                include: [{model: FoodInfo, as: 'info'}]
            },
        )
        return food
    }
}

module.exports = new FoodService()