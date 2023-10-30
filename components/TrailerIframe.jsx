import React from 'react'
import { XMarkIcon} from '@heroicons/react/24/outline';
function TrailerIframe({TrailerId,YTtrailer,onClose}) {
    
    return (
        <>{YTtrailer &&(
            <div className="flex flex-col 
            w-fit h-fit bg-black fixed rounded-[15px]
            top-[5%] z-[150]" >
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
        )
        }
    </>
  )
}

export default TrailerIframe