"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, ChangeEvent } from 'react';
import { $api } from '../../../../../api/interceptors';
import { updateUsers } from '../../../../../api/api-service/users.service';
import AddUsers from '../../addUsers/page';
import { IUser } from '@/app/types/user.types';
import Image from 'next/image';
import { TextField } from '@mui/material';

export default function EditModal({ open, edit, setOpen, setEdit }: { open: boolean; edit: any, setOpen: any, setEdit: any }) {

    const [file, setFile] = useState("");

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const toggle = () => {
        setOpen(false);
        setEdit('');
    }

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file: File | null = e.target.files && e.target.files[0]
        const form = new FormData()
        form.append('file', file as Blob)
        const response = await $api.post('/upload', form)
        console.log(response?.data?.path)
        setFile(response?.data?.path)
    }

    const handleModal = async (formData: FormData) => {
        let first_name = formData.get("first_name") as string;
        let last_name = formData.get("last_name") as string;
        let avatar = file ? file : "/noavatar.jpg"
        let age = Number(formData.get("age"));
        let role = formData.get("role") as string
        let username = formData.get("username") as string;
        let password = formData.get("password") as string;
        let description = formData.get("description") as string;

        let payload: IUser = {
            avatar: file ? file : edit?.avatar,
            first_name: first_name ? first_name : edit?.first_name,
            age: age ? age : edit?.age,
            last_name: last_name ? last_name : edit?.last_name,
            role: role ? role : edit?.role,
            username: username ? username : edit?.username,
            password: password ? password : edit?.password,
            description: description ? description : edit?.description
        }

        if (edit !== "") {
            const response = await updateUsers({ ...payload, _id: edit._id })
            return response
        } else {
            const response = await AddUsers({ ...payload })
            return response
        }
    };
    
    return (
        <div>
            <Modal
                open={open}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1 className='text-[black] text-center'>Add user</h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <div className="flex flex-col items-center relative">
                                <Image
                                    src={`http://localhost:8080/${edit?.avatar}` || "/noavatar.jpg"}
                                    width={70}
                                    height={70}
                                    alt="image" />
                                <input type="file" onChange={handleFileChange} />
                            </div>
                            <div className="flex flex-col mt-[10px]">
                                <form
                                    action={handleModal}
                                    className="flex flex-col w-[300px] gap-[10px]">
                                    {" "}
                                    <TextField defaultValue={edit?.first_name} id="outlined-basic" name="first_name" label="Firstname" variant="outlined" />
                                    <TextField defaultValue={edit?.last_name} id="outlined-basic" name="last_name" label="Lastname" variant="outlined" />
                                    <input defaultValue={edit?.age} type="number" className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none text-[black]" name="age" placeholder="number" />
                                    <select defaultValue={edit?.role} name="role" className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none text-[black]" >
                                        <option value="employee">Employee</option>
                                    </select>
                                    <TextField defaultValue={edit?.username} id="outlined-basic" name="username" label="username" variant="outlined" />
                                    <TextField defaultValue={edit?.password} id="outlined-basic" name="password" label="password" variant="outlined" />
                                    <TextField defaultValue={edit?.description} id="outlined-basic" name="description" label="Description" variant="outlined" />
                                    <Button type="submit" variant="contained" className="mt-4 btnSubmitModal">
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>

            {/* <Modal
                open={open}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1 className='text-center text-black text-[25px]'>Update Users</h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <div className="flex-col bg-[#182237] p-[15px]">
                            <div className='w-[100%] h-[100px]'>
                                <input type="file" onChange={handleFileChange} />
                                <Image
                                    src={`http://localhost:8080/${edit?.avatar}` || "/noavatar.jpg"} width={270} height={270} alt="image" />
                            </div>

                            <div>

                                <input type="text" defaultValue={edit?.first_name} placeholder='first_name' name='first_name' className=' w-[100%] h-[40px] rounded-md p-[10px] text-[#000] my-[10px]' />
                                <input type="text" defaultValue={edit?.last_name} placeholder='last_name' name='last_name' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000] my-[10px]' />
                                <input type="number" defaultValue={edit?.age} placeholder='age' name='age' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000] my-[10px]' />

                                <select className='text-[black] my-[10px] w-[100%] h-[30px] rounded-lg' name="role" defaultValue={edit?.role}>
                                    <option value="hidden" hidden>selected</option>
                                    <option value="employee" hidden>employee</option>
                                </select>

                                <input type="text" defaultValue={edit?.username} placeholder='username' name='username' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000] my-[10px]' />
                                <input type="text" defaultValue={edit?.password} placeholder='password' name='password' className='w-[100%] h-[40px] rounded-md p-[10px] text-[#000] my-[10px]' />

                                <div className="flex-col">
                                    <textarea name="description" defaultValue={edit?.description} className='my-[10px] w-[100%] h-[70px] text-[black]' placeholder='description'></textarea>
                                    <Button type="submit" variant="contained" className="my-[10px]">edit</Button>
                                </div>

                            </div>

                        </div>

                    </Typography>
                </Box>
            </Modal> */}
        </div>
    );
}