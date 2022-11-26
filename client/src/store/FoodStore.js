import {makeAutoObservable} from "mobx"

export default class FoodStore {
    constructor() {
        this._types = [
                   
        ]

        this._foods = [
            {id: 1, name: 'Кола', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 2, name: 'Пепси', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 3, name: 'Солянка', price: 199, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 4, name: 'Сухарики', price: 49, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 5, name: 'Кола', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 6, name: 'Пепси', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 7, name: 'Солянка', price: 199, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 8, name: 'Сухарики', price: 49, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 9, name: 'Кола', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 10, name: 'Пепси', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 11, name: 'Солянка', price: 199, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
            {id: 12, name: 'Сухарики', price: 49, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'},
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