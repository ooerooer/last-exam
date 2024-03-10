"use client"

import React, { useEffect, useState } from 'react';
import { deleteUsers, getUsers } from '../../../../api/api-service/users.service';
import { IUserGet } from '@/app/types/user.types';
import Image from 'next/image';
import EditModal from './modals/edit';

const ITEMS_PER_PAGE = 6;

export default function Page() {
    const [users, setUsers] = useState<IUserGet[]>([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        const data = await getUsers();
        setUsers(data?.data?.data);
    };

    const handleDelete = async (id: string | undefined) => {
        const data = await deleteUsers(id);
        window.location.reload();
    };

    const handleEdit = async (item: any) => {
        setEdit(item);
        setOpen(true);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <input
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md p-2 mb-4 text-[#000]"
            />

            <div className="flex justify-between flex-wrap items-center">
                <div className="hidden">
                    <EditModal open={open} edit={edit} setOpen={setOpen} setEdit={setEdit} />
                </div>
                {currentUsers.map(item => (
                    <div key={item._id} className="w-[300px] h-[400px] bg-[#fff] mb-[20px] rounded-lg p-[15px] box-border">
                        <div className="flex justify-start items-center">
                            <div className="flex gap-[15px]">
                                <img className="w-[50px] h-[50px] rounded-[50%]" src={"/noavatar.png"} alt="avatar" />

                                <div className="flex-col gap-[2px]">
                                    <h1 className="text-[black] text-[17px]">{item.username}</h1>
                                    <p className="text-[grey] text-[14px]">{item.role}</p>
                                </div>
                            </div>
                        </div>

                        <Image className="w-[100%] h-[170px] mt-[10px]" src={"http://localhost:8080/" + item.avatar || "/noavatar.png"} width={300} height={300} alt="image" />

                        <p className="w-[100%] h-[30px] text-[#000] mt-[10px]">{item.description}</p>

                        <div className="flex justify-between items-center mt-[10px]">
                            <h5 className="text-[gray]">{item.age} years old</h5>
                            <h6 className="text-[#000]">{item.first_name}{item.last_name}</h6>
                        </div>

                        <div className="flex justify-between mt-[10px]">
                            <button onClick={() => handleEdit(item)} className="py-2 px-5 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-75">Edit</button>
                            <button onClick={() => handleDelete(item?._id)} className="py-2 px-5 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-75">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded">
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}