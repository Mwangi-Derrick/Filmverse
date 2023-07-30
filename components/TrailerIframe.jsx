import React, { useState } from 'react'
import { XCircleIcon} from '@heroicons/react/24/solid';
function TrailerIframe({TrailerId,YTtrailer,onClose}) {
    
    return (
        <>{YTtrailer &&(
            <div className="flex flex-col  w-[80%] h-[500px] bg-black fixed top-[15%]" >
                <div className='h-[50px] w-full flex  px-5 items-center justify-between'>
                    <p className='text-2xl font-base'>Trailer</p>
                    <i onClick={onClose}
                        className='w-7 h-7 flex items-center justify-center cursor-pointer
              rounded-[50%]'><XCircleIcon className='h-6 w-6' /></i>
                </div>
                <iframe
                    className='w-full h-[100%]'
                    src={`https://www.youtube.com/embed/${TrailerId}`}
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                ></iframe>
            </div>
        )
        }
            </>
  )
}

export default TrailerIframe