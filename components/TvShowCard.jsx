import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
function TvShowCard({TvShow}) {
  const showTitle = TvShow.name.replace(/\s+/g,"-")
  
  return (
    <Link href={`tv/${TvShow.id}-${showTitle}`} 
      className='mx-[5px] flex flex-col snap-end items-center justify-start h-fit
      flex-grow-0 flex-shrink-0 lg:basis-[180px] sm:max-lg:basis-[150px]'>
          <Image width={1900} height={1000}
              src={`${baseImageUrl}${TvShow.poster_path}`} alt={`${TvShow.title}`}
              layout='responsive' className='lg:h-[250px] 
            sm:max-lg:h-[180px]
            select-none rounded-md bg-cover'/>
          <p className='hover:underline pt-3 sm:max-lg:hidden'>{TvShow.name}</p>  
    </Link>
  )
}

export default TvShowCard