import React, { ReactNode } from 'react'
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,

} from "react-icons/md"
import { IoPersonAddSharp } from 'react-icons/io5';
import styles from "./sidebar.module.css"
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';

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
                title: "Add Users",
                path: "/dashboard/addUsers",
                icon: <IoPersonAddSharp />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdDashboard />,
            },
            {
                title: "Guides",
                path: "/dashboard/guides",
                icon: <MdShoppingBag />,
            },
            {
                title: "Users Guides",
                path: "/dashboard/usersGuides",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Profile",
                path: "/dashboard/profile",
                icon: <MdSupervisedUserCircle />,
            },
        ]
    },
]

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    src="/noavatar.png"
                    className={styles.userImage}
                    alt=''
                    width='50'
                    height='50'
                />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Usmonov Javohir</span>
                    <span className={styles.userTitle}>Admin</span>
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