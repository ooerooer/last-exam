"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { $api } from "../../../../../api/interceptors";
import { IUserMe } from "@/app/types/profile.types";
import { UpDate } from "../../../../../api/api-service/prodile.service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};
const ModalApp = ({ toggle, open, setOpen, modalOpen }: any) => {
  const [file, setFile] = React.useState("")
  const close = () => {
    setOpen(false)
  }

  const handleModal = async (formData: FormData) => {
    let payload: IUserMe = {
      description: formData.get("description"),
      avatar: file ? file : "/userImage.jpg"
    }
    const response = await UpDate(payload)
    if (response.status === 200) {
      window.location.reload()
    }
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = e.target.files && e.target.files[0]
    let form = new FormData()
    form.append("file", file as Blob)
    const response = await $api.post("/upload", form)
    setFile(response?.data?.path)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex justify-between">
              <h1 className="text-center text-[25px]">Update user</h1>
              <button className="text-[25px]" onClick={() => setOpen(false)}>
                <IoMdClose />
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="gap-[50px]">
              <div className="flex flex-col items-center relative">
                <Image
                  src={`http://localhost:8080/${modalOpen?.avatar} ` ? `http://localhost:8080/${modalOpen?.avatar}` : "/noavatar.png"}
                  width={200}
                  height={200}
                  alt="image"
                  className="rounded-[50%]"
                />
                <input
                  type="file"
                  onChange={handleImage}
                  className="w-[100%] h-[100%] absolute opacity-0 top-0"
                />
                <h1 className="text-[20px] mt-[8px]">{modalOpen?.first_name}</h1>
              </div>
              <div className="flex flex-col mt-[50px]">
                <form action={handleModal} className="flex flex-col gap-[10px] items-center">
                  <TextField
                    id="outlined-basic"
                    name="description"
                    label="Description"
                    variant="outlined"
                    defaultValue={modalOpen?.first_name}
                  />
                 
                  <button className='p-[10px] bg-[#151c2c] text-white rounded-sm w-[63%]'>Update</button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalApp;