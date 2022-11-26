import {makeAutoObservable} from "mobx"

export default class FoodStore {
    constructor() {
        this._types = []

        this._foods = []

        this._selectedType = {}

        makeAutoObservable(this)
    }

    setTypes(types) {        
        this._types= types
    }

    setFoods(foods) {
        this._foods = foods
    }

    setSelectedType(type) {
        this._selectedType = type
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
}