import React from 'react'
import { XMarkIcon} from '@heroicons/react/24/outline';
function TrailerIframe({TrailerId,YTtrailer,onClose}) {
    
    return (
        <>{YTtrailer &&(
            <div className="flex flex-col 
            w-fit h-fit bg-black fixed rounded-[15px]
            md:max-lg:top-[18%] lg:top-[5%] sm:max-md:top-[21%] z-[150]" >
                <div className='h-[50px] w-full flex  px-5 items-center justify-between'>
                    <p className='text-xl font-light'>Trailer</p>
                    <i onClick={onClose}
                        className='w-6 h-6 flex items-center justify-center cursor-pointer
                      lg:hover:bg-stone-800
                      sm:max-lg:bg-stone-800 rounded-[30%]'><XMarkIcon className='h-4 w-4' /></i>
                </div>
                <div className='lg:w-[940px] lg:h-[530px] sm:max-md:w-screen sm:max-md:h-[56vw]
                md:max-lg:w-[640px] md:max-lg:h-[360px]'>
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