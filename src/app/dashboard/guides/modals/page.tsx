"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { IGuides } from "@/app/types/guides.types";
import { addGuides, updateGuides } from "../../../../../api/api-service/guides.service";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const GuidesModal = ({ open, setOpen, editGuides, setEditGuides }: any) => {
    const toggle = () => {
        setOpen(false);
        setEditGuides("");
    };

    const handleModal = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let payload: IGuides = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
        };

        if (editGuides) {
            // const data = { payload, _id: updateGuides._id };
           const response =  await updateGuides({ ...payload, _id: editGuides._id });
        } else {
            await addGuides(payload);
        }
        toggle();
    };

    return (
        <div>
            <Modal className="rounded"
                open={open}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1>Add Guides</h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="flex items-center gap-[50px]">
                            <div className="flex flex-col">
                                <form
                                    onSubmit={handleModal}
                                    className="flex flex-col w-[300px] gap-[10px] text-lg"
                                >
                                    <TextField
                                        className="text-[10px]"
                                        id="outlined-basic"
                                        name="title"
                                        label="Title"
                                        defaultValue={editGuides?.title}
                                    />
                                    <TextField
                                        className="text-lg"
                                        id="outlined-basic"
                                        name="content"
                                        label="Content"
                                        defaultValue={editGuides?.content}
                                    />
                                    <button
                                        type="submit"
                                        className="p-[5px] bg-slate-800 text-white rounded w-[160px] h-[40px] my-2 ml-[80px]"
                                    >
                                        Enter the modal
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default GuidesModal;