"use client"
import React, { useEffect, useState } from 'react'
import { getUserMe } from '../../../../api/api-service/prodile.service'
import { IUserMe } from '../../types/user.types'
import Sidebar from '../sidebar/sidebar'

export default function Profile() {
    const [userme, setUserme] = useState<IUserMe>([])

    const GetUserme = async () => {
        const response = await getUserMe()
        setUserme(response?.data?.data)
    }

    useEffect(() => {
        GetUserme()
    }, [])


    return (
        <div className="flex items-center gap-[100px]">
            <Sidebar />
            <div className="border w-[250px] p-[25px] rounded-lg">
                <div className="">
                    <img src={`http://localhost:8080/${userme?.avatar}`} alt="noavatar" className="w-[200px]" />
                </div>
                <div className="">
                    <ul className="border w-[100%] p-[25px] rounded-lg mt-[10px]">
                        <li className='my-[5px]'>First Name: <i>{userme.first_name}</i></li>
                        <li className='my-[5px]'>Last Name: <i>{userme.last_name}</i></li>
                        <li className='my-[5px]'>Age: {userme.age}</li>
                        <li className='my-[5px]'>Username: {userme.username}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}