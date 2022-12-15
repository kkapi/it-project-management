const {Food, FoodInfo} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FoodService {
    async create(name, description, price, typeId, img, info) {
        try {
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const food = await Food.create({name, description, price, typeId, img: fileName})

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

    async delete(name) {
        try {
            const food = await Food.findOne({
                where: {
                    name
                }
            })            

            try {
                fs.unlink(path.resolve(__dirname, '..', 'static', food.img), (err) => {
                    if (err) throw err;                  
                    console.log('Deleted');
                });  
            } catch(e) {
                console.log(e)
            }                     

            const data = await Food.destroy({
                where: {
                    name
                }
            })            
    
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async getAll() {
        const foods = await Food.findAll({order: [['id', 'DESC']]}) 
        return foods
    }

    async getFoodPage(typeId, limit, page) {
        page = page || 1
        limit = limit || 12

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