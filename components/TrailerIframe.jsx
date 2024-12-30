import React from 'react'
import { XMarkIcon} from '@heroicons/react/24/outline';
function TrailerIframe({TrailerId,YTtrailer,onClose}) {
    
    return (
        <>{YTtrailer && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-[150]'>
            <div className="flex flex-col 
            w-fit h-fit bg-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[15px]
            " >
                <div className='h-[50px] w-full flex  px-5 items-center justify-between'>
                    <p className='text-xl font-light'>Trailer</p>
                    <i onClick={onClose}
                        className='w-6 h-6 flex items-center justify-center cursor-pointer
                      lg:hover:bg-stone-800
                      sm:max-lg:bg-stone-800 rounded-[30%]'><XMarkIcon className='h-4 w-4' /></i>
                </div>
                <div className='lg:w-[940px] sm:max-md:w-screen 
                md:max-lg:w-[640px] aspect-video'>
                <iframe
                    className='w-full h-full'
                    src={`https://www.youtube.com/embed/${TrailerId}`}
                    frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                ></iframe></div>
                </div>
                </div>
        )
        }
    </>
  )
}

export default TrailerIframe