"use client"
import { IGuides } from "@/app/types/guides.types";
import { $api } from "../interceptors";

export const addGuides = async (payload:IGuides)=>{
    try{
        const response = await $api.post("/guides", payload)
        if (response?.status === 201) {
            window.location.reload()
        }
    }catch(error){
        console.log(error);
    }
}


export const getGuides = async()=>{
   try{
    const response = await $api.get("/guides?page%5Boffset%5D=1&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=asc")
    return response
   }catch(error){
    console.log(error)
   }
}


export const deleteGuides = async(id:number)=>{
    try{
        const response = await $api.delete(`/guides/${id}`)
        if (response?.status === 200) {
            window.location.reload()
        }
    }catch(error){
        console.log(error);
    }
}


export const updateGuides = async(data:any)=>{
    console.log(data._id)
    try{
        const response = await $api.patch(`/guides/${data?._id}`, data)
        // if (response?.status === 200) {
        //     window.location.reload()
        // }
        return response
    }catch(error){
        console.log(error);
    }
}
