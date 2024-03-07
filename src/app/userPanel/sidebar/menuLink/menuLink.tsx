'use client'
import React, { ReactNode } from 'react'
import styles from "./menuLink.module.css"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubItem {
    title: string;
    path: string;
    icon: ReactNode;
}

const MenuLink = ({ menu }: Readonly<{
    menu: SubItem;
}>) => {
    const pathname = usePathname();
    return (
        <div>
            {
                <Link href={menu.path} className={`${styles.container} ${pathname === menu.path && styles.active}`}>
                    {menu.icon}
                    {menu.title}
                </Link>
            }
        </div>
    )
}

export default MenuLink