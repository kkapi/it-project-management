import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log("Я БЛЯТЬ ИНТЕРЦЕПТОР")   
    console.log("ПРИВЯЗЫВАЮ ЕБУЧИЙ ТОКЕН: " + config.headers.authorization)
    console.log("ИЗ ЕБУЧЕГО ЛОКА СТОРАДЖА: " + localStorage.getItem('token'))
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}