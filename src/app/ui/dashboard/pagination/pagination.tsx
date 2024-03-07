"use client"

import React from 'react'
import styles from './pagination.module.css'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const Pagination = ({ count }: { count: number | undefined }) => {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams ? searchParams : "");
    const page = Number(params.get("page")) || 1;
    const ITEM_PER_PAGE = 2;
    const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < Number(count);

    const handleChangePage = (type: string) => {
        type === "prev" ? params.set("page", (page - 1).toString())
            : params.set("page", (page + 1).toString());
        replace(`${pathname}?${params}`);
    }

    return (
        <div className={styles.container}>
            <button className={styles.btn} disabled={!hasPrev} onClick={() => handleChangePage("prev")} >Previous</button>
            <button className={styles.btn} disabled={!hasNext} onClick={() => handleChangePage("next")} >Next</button>
        </div>
    )
}

export default Pagination