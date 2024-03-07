import axios from "axios";
import Cookies from "js-cookie"

const API_URL = "http://localhost:8080/"

const $api = axios.create({
    baseURL:API_URL
})
const $apiAuth = axios.create({
    baseURL:API_URL
})


$api.interceptors.request.use((config)=>{
    let accessToken = Cookies.get("token")
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})
export {$apiAuth,$api}  