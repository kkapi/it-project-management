import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authoriztion = `Bearer ${localStorage.getItem('token')}`
    console.log("АОАОА ИНТЕРЦЕПТОР НАВЕШИВАЕТ ТОКЕН")
    console.log(config.headers.authoriztion)
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}