import { $authHost, $host } from "./index"
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const sendRecovery = async (email) => {
    const {data} = await $host.post('api/user/sendrecovery', {email})
    return data
}

export const resetPassword = async (link, password) => {
    const {data} = await $host.post('api/user/reset/' + link, {password})
    return data
}

export const getOneUser = async (id) => {
    const {data} = await $authHost.get('api/user/one/' + id)
    return data
}

export const changePassword = async (password) => {
    const {data} = await $authHost.post('api/user/changepass', {password})
    return data
}

export const changeInfo = async (name, phone, address, user_id) => {
    const {data} = await $authHost.post('api/user/changeinfo', {name, phone, address, user_id})
    return data
}

export const getAllUser = async () => {
    const {data} = await $authHost.get('api/user/all')
    return data
}

export const changeUserStatus = async (id, isBlocked) => {
    const {data} = await $authHost.post('api/user/changestatus', {id, isBlocked})
    return data
} 

export const changeUserRole = async (id, role) => {
    const {data} = await $authHost.post('api/user/changerole', {id, role})
    return data
}
