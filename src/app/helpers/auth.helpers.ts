import Cookies from "js-cookie"

export const saveCookies = async(token: string)=>{
    Cookies.set("token", token)
}

export const getCookies = async(token: string)=>{
    return Cookies.set("token", token)
}