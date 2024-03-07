"use client"
import React, { ChangeEvent, useState } from 'react'
import { IUser } from '../../types/user.types';
import { $api } from '../../../../api/interceptors';
import { createUsers } from '../../../../api/api-service/users.service';
import { redirect } from 'next/navigation';

const AddUsers = () => {

    const [file, setFile] = useState("");

    const handleImage = async (e: any) => {
        e.preventDefault()
        const file = e.target.files[0]
        const form = new FormData()
        form.append('file', file as Blob)
        const respons = await $api.post('/upload', form)
        console.log(respons?.data?.path)
        setFile(respons?.data?.path)
    }

    const handleForm = async (formData: FormData) => {
        let first_name = formData.get("first_name")
        let last_name = formData.get("last_name")
        let age = Number(formData.get("age"))
        let role = formData.get("role")
        let username = formData.get("username")
        let password = formData.get("password")
        let description = formData.get("description");

        let payload: IUser = {
            first_name,
            last_name,
            age,
            role,
            username,
            password,
            description,
            avatar: file,
        }

        const respons: any = await createUsers(payload)
        console.log(respons?.status, 'status');

        if (respons?.status === 201) {
            redirect("/dashboard/users")
        } else {
            console.log("error");
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form action={handleForm} className="w-[900px] h-[580px] bg-[#B5C0D0] my-[65px] rounded-2xl p-[40px]">

                <div className='flex gap-[20px]'>
                    <input type="text" placeholder='first_name' name='first_name' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                    <input type="text" placeholder='last_name' name='last_name' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                    <input type="number" placeholder='age' name='age' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                </div>
                <div className='flex gap-[20px] mt-[20px]'>

                    <select name="role" className='text-black rounded-lg'>
                        <option value="" hidden>select your employee</option>
                        <option value="employee">employee</option>
                    </select>

                    <input type="text" placeholder='username' name='username' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                    <input type="password" placeholder='password' name='password' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000]' />
                </div>

                <div className='flex gap-[20px] mt-[20px]'>
                    <textarea name="description" placeholder='description' className='w-[100%] h-[300px] resize-none rounded-md p-[20px] text-[black]'></textarea>
                </div>

                <div className="flex gap-[30px] mt-[20px]">
                    <input type="file" onChange={handleImage} className='text-[black] ' />
                    <button className='w-[100%] h-[50px] rounded-lg bg-[#161f34] hover:bg-[#182237]'>send</button>
                </div>

            </form>
        </div>
    )
}

export default AddUsers