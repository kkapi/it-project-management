import { $authHost, $host } from "./index"

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $authHost.get('api/type')
    return data
}

export const deleteType = async (type) => {
    const {data} = await $authHost.post('api/type/delete', type)
    
    return data
}

export const createFood = async (food) => {
    const {data} = await $authHost.post('api/food', food)
    return data
}

export const deleteFood = async (food) => {
    const {data} = await $authHost.post('api/food/delete', food)
    return data
}

export const getAllFood = async () => {
    const {data} = await $authHost.get('api/food/list/all')
    return data
}

export const fetchFood = async (typeId, page, limit = 12) => {
    const {data} = await $authHost.get('api/food/page', {params: {
        typeId, page, limit
    }})
    return data
}

export const fetchOneFood = async (id) => {
    const {data} = await $authHost.get('api/food/one/' + id)
    return data
}

export const addBasketFood = async (food_id) => {
    const {data} = await $authHost.post('api/food/basket', {food_id})
    return data
}

export const deleteBasketFood = async (bfId) => {
    const {data} = await $authHost.post('api/food/basket/delete', {bfId})
    return data
}

export const changeAmount = async (bfId, amount) => {
    const {data} = await $authHost.post('api/food/basket/amount', {bfId, amount})
    return data
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/food/basket')
    return data
}