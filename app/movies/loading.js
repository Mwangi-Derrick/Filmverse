import Sidebar from '@/components/Sidebar'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import React from 'react'

function loading() {
  return (
      <div  className=" text-blue-400 w-300px h-300px min-h-screen flex flex-row items-center flex-wrap
      justify-center lg:pl-[80px]">
          <Sidebar />
          <ArrowPathIcon className='animate-spin h-10 w-10 text-red-500' />
      </div>
  )
}

export default loading