import React, { ReactNode, useEffect, useState } from 'react'
import {
    MdSupervisedUserCircle,
    MdOutlineSupervisedUserCircle,

} from "react-icons/md"
import styles from "./sidebar.module.css"
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { IUserMe } from '@/app/types/user.types';
import { getUserMe } from '../../../../api/api-service/prodile.service';

interface MenuItem {
    title: String;
    list: subMenuItem[];
}

interface subMenuItem {
    title: string;
    path: string;
    icon: ReactNode;
}

const menuItems: MenuItem[] = [
    {
        title: "Users",
        list: [
            {
                title: "Guides",
                path: "/userPanel/guides",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Profile",
                path: "/userPanel/profile",
                icon: <MdOutlineSupervisedUserCircle />,
            },
        ]
    },
]

const Sidebar = () => {
    const [userme, setUserme] = useState<IUserMe>([]);

    const GetUserme = async () => {
        const response = await getUserMe()
        setUserme(response?.data?.data)
    }

    useEffect(() => {
        GetUserme()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.user}>

                <img src={`http://localhost:8080/${userme?.avatar}`} alt="noavatar" className="w-[70px]" />

                <div className={styles.userDetail}>
                    <span className={styles.username}>{userme.first_name} {userme.last_name}</span>
                    <span className={styles.userTitle}>{userme.role}</span>
                </div>
            </div>

            <ul>
                {
                    menuItems.map((item, index) => (
                        <li key={index}>
                            <span className={styles.cat}>{item.title}</span>
                            {
                                item.list.map(list => (
                                    <MenuLink key={list.title} menu={list} />
                                ))
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar