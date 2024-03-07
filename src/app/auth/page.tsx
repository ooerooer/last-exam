"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { PostAuth } from '../../../api/api-service/auth.service';
import { saveCookies } from '../helpers/auth.helpers';

const Auth = () => {

    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        let username = formData.get("username")
        let password = formData.get("password")
        let payload = { username, password }
        console.log(payload)
        const response = await PostAuth(payload)
        if (response?.data?.token) {
            saveCookies(response?.data?.token)
            if (response?.data.role === "admin") {
                router.push("/dashboard")
            } else if (response?.data.role === "employee") {
                router.push("/userPanel")
            }
        }
        console.log(response);
    }

    return (
        <div className='flex justify-center items-center'>
            <form action={handleSubmit} className='w-[400px] h-[400px] rounded-lg mt-[120px] bg-[#1e2c48] p-[20px]'>
                <h1 className='text-center text-[#ffffff] text-[35px]'>Auth</h1>
                <p className='mt-[20px] mb-[10px]'>username</p>
                <input type="text" placeholder='username' name='username' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                <p className='mt-[20px] mb-[10px]'>password</p>

                <input type="text" placeholder='password' name='password' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                <button className='w-[100%] h-[50px] rounded-lg bg-[#161f34] mt-[40px] hover:bg-[#182237]'>send</button>
            </form>
        </div>
    )
}

export default Auth