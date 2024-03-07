"use client";
import { IGuides } from "@/app/types/guides.types";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteGuides, getGuides } from "../../../../api/api-service/guides.service";

const UserGuides = () => {
    const [open, setOpen] = useState(false);
    const [guides, setGuides] = useState([]);
    const [editGuides, setEditGuides] = useState<IGuides>()

    const GetGuides = async () => {
        const response = await getGuides();
        setGuides(response?.data?.data);
    };

    useEffect(() => {
        GetGuides();
    }, []);

    const deletModal = (id: string) => {
        deleteGuides(id)
    }
    const editModal = (item: IGuides) => {
        setEditGuides(item)
        setOpen(true)
    }

    return (
        <div className="flex ml-[400px]">
            {guides?.map((item: any) => {
                return <div className="w-[300px] p-[30px] border rounded-lg">

                    <div className="flex">
                        <button className="text-[25px] text-[red] active:bg-slate-200 p-[7px] rounded-3xl transition-all" onClick={() => deletModal(item._id)}><MdDelete /></button>
                        <button className="text-[25px] text-[blue] active:bg-slate-200 p-[7px] rounded-3xl transition-all" onClick={() => editModal(item)}><MdEdit /></button>
                    </div>

                    <h1 className="text-[25px] text-center">Qonun qoidalar</h1>

                    <h1>{item.title}</h1>
                    <h1>{item.content}</h1>
                </div>
            })}
        </div>
    );
};

export default UserGuides;