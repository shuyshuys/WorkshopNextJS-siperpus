import React from 'react'
import Link from 'next/link';
import Layout from '@/widget/Layout'

const Header = () => {
    return (
        <div className='bg-fuchsia-600 w-full h-16 shadow-lg'>
            <Link href="/">
                <h1 className='text-center text-2xl text-white font-semibold pt-3'>
                    SI Library
                </h1>
            </Link>
        </div>
    );
}

export default Header