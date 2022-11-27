import {makeAutoObservable} from "mobx"

export default class FoodStore {
    constructor() {
        this._types = []
        this._foods = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 12

        makeAutoObservable(this)
    }

    setTypes(types) {        
        this._types= types
    }

    setFoods(foods) {
        this._foods = foods
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    get types() {
        return this._types
    }

    get foods() {
        return this._foods
    }

    get selectedType() {
        return this._selectedType
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

    get totalCount() {
        return this._totalCount
    }
}