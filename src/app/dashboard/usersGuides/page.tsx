"use client"

import React, { useEffect, useState } from "react";
import { IGuides } from "@/app/types/guides.types";
import { getGuides } from "../../../../api/api-service/guides.service";

const Guides = () => {
    const [guides, setGuides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const GetGuides = async () => {
        const response = await getGuides();
        setGuides(response?.data?.data);
    };

    useEffect(() => {
        GetGuides();
    }, []);

    const filteredGuides = guides.filter((guide: IGuides) =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ml-[400px]">
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
                <div>

                    <div className="w-[100%] flex flex-wrap justify-center p-[10px] gap-[20px]">
                        {filteredGuides.map((item: any, index: number) => (
                            <div key={index} className="w-[300px] p-[15px] rounded-xl border flex flex-col gap-[20px] bg-[#182237] hover:bg-[#192b47]">
                                <h1 className="text-[25px] text-center">Rule</h1>
                                <h4>{item.title}: title</h4>
                                <h4>{item.content}: content</h4>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Guides;