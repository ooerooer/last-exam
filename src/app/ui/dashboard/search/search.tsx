"use client"

import React, { ChangeEvent } from 'react'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
import { usePathname, useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation'

const Search = ({ placeholder }: { placeholder: string }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams ? searchParams : " ");
        params.set("page", "1");
        if (e.target.value) {
            e.target.value.length > 2 && params.set("q", e.target.value);
        } else {
            params.delete("q")
        }
        replace(`${pathname}?${params}`);
    }

    return (
        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.int} onChange={handleChange} />
        </div>
    )
}

export default Search;