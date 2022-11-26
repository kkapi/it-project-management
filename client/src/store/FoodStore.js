import {makeAutoObservable} from "mobx"

export default class FoodStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Напитки'},
            {id: 2, name: 'Закуски'},
            {id: 3, name: 'Суши'},
            {id: 4, name: 'Горячее'},
            {id: 5, name: 'Десерты'},         
        ]

        this._foods = [
            {id: 1, name: 'Кола', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 2, name: 'Пепси', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 3, name: 'Солянка', price: 199, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 4, name: 'Сухарики', price: 49, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 1, name: 'Кола', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 2, name: 'Пепси', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 3, name: 'Солянка', price: 199, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 4, name: 'Сухарики', price: 49, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 1, name: 'Кола', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 2, name: 'Пепси', price: 99, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 3, name: 'Солянка', price: 199, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
            {id: 4, name: 'Сухарики', price: 49, img: 'https://billionnews.ru/uploads/posts/2021-11/1636534404_2.jpg'},
        ]

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