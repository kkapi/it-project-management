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

export const changeImage = async (food) => {
    const {data} = await $authHost.put('api/food/changeimg', food)
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

export const createOrder = async (comment, method, final_price, wish_time) => {
    const {data} = await $authHost.post('api/food/order/create', {comment, method, final_price, wish_time})
    return data
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get('api/food/order/one/' + id)
    return data
}

export const getUserOrders = async () => {
    const {data} = await $authHost.get('api/food/userorders')
    return data
}

export const getAllOrders = async () => {
    const {data} = await $authHost.get('api/food/order/all')
    return data
}

export const setNewStatus = async (id, status) => {
    const {data} = await $authHost.put('api/food/order/status', {id, status})
    return data
}

export const payOrder = async (number, period, cvc, name, sum) => {
    const {data} = await $authHost.put('api/food/order/payment', {number, period, cvc, name, sum})
    return data
}

export const changeFoodInfo = async (id, name, description, price) => {
    const {data} = await $authHost.put('api/food/changeinfo', {id, name, description, price})
    return data
}

export const repeatOrder = async (userId, bId) => {
    const {data} = await $authHost.post('api/food/repeat', {userId, bId})
    return data
}