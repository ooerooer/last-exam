import { IUserMe } from "@/app/types/profile.types";
import { $api } from "../interceptors";

export const getUserMe = async () => {
  try {
    const response = await $api.get("/users/me");
    return response
  } catch (error) {
    console.log(error);
  }
};


export const UpDate  = async (payload:IUserMe)=>{
  try{
    const response:any = $api.patch("users/me",payload)
    return response
  }catch(error){
    console.error(error);
  }
}