import React from 'react'

function loading() {
  return (
      <div  className=" text-blue-400 w-300px h-300px min-h-screen flex flex-row items-center flex-wrap
      justify-center lg:pl-[80px]">
      <div className='animate-spin h-[80px] w-[80px]
       border-x-slate-200 border-t-slate-200 border-b-red-400 border-solid border-[10px] rounded-full'>
      </div>
      </div>
  )
}

export default loading