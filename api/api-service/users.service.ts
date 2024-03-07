import { $api } from "../../api/interceptors";
import { IUser, IUserData } from "@/app/types/user.types";

// --------------------------------------------- create ---------------------------------------------------

export const createUsers =async(data: IUser)=>{
    try {
        const response: IUserData = await $api.post("/users", data);
        return response
    } catch (error) {
        console.log(error, "error")
    } 
}
// --------------------------------------------- upload ---------------------------------------------------

export const getUsers = async()=>{
    try{
        const response = await $api.get("/users?q=&page%5Boffset%5D=1&page%5Blimit%5D=20&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=employee")
        return response
    }catch(error){
        console.log(error, "error")
    }
}

// --------------------------------------------- update ---------------------------------------------------

export const updateUsers =async(data: any)=>{
    try {
        const response = await $api.patch(`/users/${data?._id}`, data)
        if(response?.status === 200){
            window.location.reload()
        }
        return response
    } catch (error) {
        console.log(error, "error")
    }
}

// --------------------------------------------- delete ---------------------------------------------------

export const deleteUsers =async(data: any)=>{
    try {
        console.log(data)
        const response = await $api.delete(`/users/${data}`)
        console.log(response)
    } catch (error) {
        console.log(error, "error")
    }
}
