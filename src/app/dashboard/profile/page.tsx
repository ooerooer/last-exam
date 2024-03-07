"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { IUserMe } from "@/app/types/profile.types";
import { getUserMe } from "../../../../api/api-service/prodile.service";
import ModalApp from "./modals/modal";

const SingleAdmin = () => {
  const [userMe, setUserMe] = useState<IUserMe>();
  const [open, setOpen] = useState(false);
  const userAdmin = async () => {
    const response = await getUserMe();
    setUserMe(response?.data?.data);
  };
  useEffect(() => {
    userAdmin();
  }, []);
  return (
    <div>
      <ModalApp setOpen={setOpen} open={open} modalOpen={userMe} />
      <div className="">
        <div className="">
          <div className="gap-[50px] border-[white] bg-[#121c35] rounded-xl border-[2px] p-[50px]">
            <div>
              <h1 className="text-[30px] text-center pt-[30px]">Shaxsiy ma'lumot</h1>
              <Image
                src={
                  `http://localhost:8080/${userMe?.avatar}` ? `http://localhost:8080/${userMe?.avatar}` : "/userImage.jpg"
                } width={250} height={250} alt="image" className="w-[200px] h-[200px] m-auto my-[10px]" />
            </div>

            <div className="flex justify-around border rounded-lg p-[50px]">
              <div className="flex-col">
                <h1>Ism</h1>
                <h1 className="text-[25px]">{userMe?.first_name}</h1>
                <h1 className="mt-[30px]">Telefon raqam</h1>
                <h1 className="text-[20px]">(+998) 97 782 77 22</h1>
                <h1 className="mt-[30px]">Role</h1>
                <h1 className="text-[20px]">{userMe?.role}</h1>
              </div>

              <div className="flex-col">
                <h1>Familiya</h1>
                <h1 className="text-[25px] ">{userMe?.last_name}</h1>
                <h1 className="mt-[30px]">Tug'ulgan sana</h1>
                <h1 className="text-[20px]">05 Sen,2007</h1>
                <h1 className="mt-[30px]">HH ID</h1>
                <h1>{userMe?._id}</h1>

                <button className="border rounded-xl p-[10px] mt-[20px]" onClick={() => setOpen(true)}>
                  <MdEdit className="text-[25px] hover:text-[#ccc]" /> update click here
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAdmin;