import { PlayIcon } from '@heroicons/react/24/solid'
import React from 'react'

function Media({ videos,updateVideo ,showVideo}) {
  console.log(videos)
  
  console.log(showVideo)
  const showVideoIframe = (video) => {
    showVideo();
    updateVideo(video);
  }
  return (
   
    <div className='w-[90%] flex flex-col items-start'>
       <h2 className='w-full lg:text-3xl h-fit flex justify-start py-2'>Videos</h2> 
      <div className='flex w-full h-fit items-center justify-start
       carousel-scrollbar overflow-x-scroll gap-1'>
        {videos.map(video => (<div
          className='aspect-video h-[300px] bg-center bg-no-repeat bg-cover rounded-md 
          flex items-center justify-center'
          style={{
            backgroundImage:  `url(https://i.ytimg.com/vi/${video.key}/hqdefault.jpg)`
          }}>
          <button onClick={() => {showVideoIframe(video) }}
            className='w-[60px] h-[60px] bg-black bg-opacity-70 group rounded-full flex items-center 
         justify-center'><PlayIcon className='w-9 h-9 group-hover:text-slate-300' /></button>
        </div>))}
      </div>
    </div>
  )
}

export default Media