"use client"

import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import { IGuides } from "@/app/types/guides.types";
import { Button } from "@mui/material";
import { deleteGuides, getGuides } from "../../../../api/api-service/guides.service";
import GuidesModal from "./modals/page";

const editObj = {
    title: "",
    content: "",
}

const Guides = () => {
    const [open, setOpen] = useState(false);
    const [guides, setGuides] = useState([]);
    const [editGuides, setEditGuides] = useState<IGuides>(editObj);
    const [searchTerm, setSearchTerm] = useState("");

    const GetGuides = async () => {
        const response = await getGuides();
        setGuides(response?.data?.data);
    };

    useEffect(() => {
        GetGuides();
    }, []);

    const deletModal = (id: number) => {
        deleteGuides(id);
    };
    const editModal = (item: IGuides) => {
        setEditGuides(item);
        setOpen(true);
    };

    const filteredGuides = guides && guides.length > 0 ? guides.filter((guide: IGuides) =>
        guides.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div>
            <div className="sticky z-30 top-0">
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="m-2 p-2 border rounded text-black"
                />
            </div>
            <div className="flex">
                <GuidesModal
                    open={open}
                    setOpen={setOpen}
                    editGuides={editGuides}
                    setEditGuides={setEditGuides}
                />
                <div>

                    <Button variant="contained" className="ml-[5%] mt-[2%] bg-slate-800" onClick={() => setOpen(true)}>open MODAL</Button>

                    <div className="w-[100%] flex flex-wrap justify-center p-[10px] gap-[20px]">
                        {filteredGuides?.map((item: IGuides, index: number) => (
                            <div key={index} className="w-[300px] p-[15px] rounded-xl border flex flex-col gap-[20px] bg-[#182237] hover:bg-[#192b47]">
                                <h1 className="text-[25px] text-center">Rule</h1>
                                <h4>{item.title}: title</h4>
                                <h4>{item.content}: content</h4>

                                <div className="flex">
                                    <Stack direction="row" spacing={2} className="ml-[4px]">
                                        <Button onClick={() => deletModal(item._id)} variant="outlined" className="bg-red-700 rounded text-[white]">Delete</Button>
                                    </Stack>
                                    <Stack direction="row" spacing={2} className="ml-[60px]">
                                        <Button onClick={() => editModal(item)} variant="outlined" className=" bg-green-700 rounded text-[white]">Edit</Button>
                                    </Stack>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Guides;