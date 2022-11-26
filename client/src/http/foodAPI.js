import { $authHost, $host } from "./index"

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createFood = async (food) => {
    const {data} = await $authHost.post('api/food', food)
    return data
}

export const fetchFood = async () => {
    const {data} = await $host.get('api/food')
    return data
}

export const fetchOneFood = async (id) => {
    const {data} = await $host.get('api/food/' + id)
    return data
}

