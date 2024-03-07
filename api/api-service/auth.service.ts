import axios from "axios";
import { saveCookies } from "@/app/helpers/auth.helpers";
export const PostAuth =async(data: any)=>{
    try{
        const response = await axios.post("http://localhost:8080/users/login", data)
        saveCookies(response?.data?.data?.token)
        return response?.data
    }catch(error){
        console.log(error, "error")
    }
}