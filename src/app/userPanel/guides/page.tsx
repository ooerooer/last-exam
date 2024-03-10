"use client";
import React, { useEffect, useState } from "react";
import { getGuides } from "../../../../api/api-service/guides.service";
import Sidebar from "../sidebar/sidebar";
import { IGuides } from "@/app/types/guides.types";

const Guides = () => {
    const [guides, setGuides] = useState([]);

    const GetGuides = async () => {
        const response = await getGuides();
        setGuides(response?.data?.data);
    };

    useEffect(() => {
        GetGuides();
    }, []);

    return (
        <div className="flex">
            <div className="sticky z-30 top-0">
                <Sidebar />
            </div>
            <div>
                <div className="w-[100%] flex flex-wrap justify-center p-[10px] gap-[20px] mt-[30px]">
                    {guides?.map((item: IGuides, index) => {
                        return (
                            <div key={index} className="w-[300px] p-[15px] rounded-xl border flex flex-col gap-[20px] bg-[#182237] hover:bg-[#192b47]">
                                <h1 className="text-[25px] text-center">Rule</h1>
                                <h4>{item.title}: title</h4>
                                <h4>{item.content}: content</h4>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default Guides;