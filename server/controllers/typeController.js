const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
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
}

module.exports = new TypeController()