const typeService = require('../service/typeService')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await typeService.create(name)
        res.json(type)
    }

    async getAll(req, res) {
        const types = await typeService.getAll()
        return res.json(types)
    }

    async delete(req, res) {
        const {name} = req.body
        console.log(name)
        const type = await typeService.delete(name)
        res.json(name)
    }
}

module.exports = new TypeController()