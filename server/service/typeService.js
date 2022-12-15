const {Type} = require('../models/models')

class TypeService {
    async create(name) {        
        const type = await Type.create({name})
        return type
    }

    async getAll() {
        const types = await Type.findAll({order: [['id', 'DESC']]})
        return types
    }

    async delete(name) {
        
        const data = Type.destroy({
            where: {
                name
            }
        })

        return data
    }

}

module.exports = new TypeService()