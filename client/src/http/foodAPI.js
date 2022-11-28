import { $authHost, $host } from "./index"

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
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
    const {data} = await $host.get('api/food')
    return data
}

export const fetchFood = async (typeId, page, limit = 12) => {
    const {data} = await $host.get('api/food/page', {params: {
        typeId, page, limit
    }})
    return data
}

export const fetchOneFood = async (id) => {
    const {data} = await $host.get('api/food/' + id)
    return data
}