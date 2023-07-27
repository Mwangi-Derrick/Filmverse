import React from 'react'
import Link from 'next/link';
import { HomeIcon, BookmarkIcon } from "@heroicons/react/24/outline";

function Sidebar() {
  return (
      <aside className='h-screen w-[80px] fixed left-0 top-[60px] bg-neutral-900
      flex items-center flex-col sm:max-lg:hidden'>
          <Link href="/" className='w-full  flex items-center flex-col justify-center text-white
          text-[12px]'>
             <i className='py-3 '> <HomeIcon className='w-5 h-5 ' /></i>Home</Link>
             <Link href='/' className='w-full flex items-center flex-col justify-center text-white
          text-[12px]'>
             <i className='py-3 '><BookmarkIcon className='w-5 h-5 ' /></i>Watch Later</Link>
    </aside>
  )
}

export default Sidebar