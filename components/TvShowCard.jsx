"use client"
import Link from 'next/link';
import React, { Suspense } from 'react'

const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
function TvShowCard({TvShow}) {
  const showTitle = TvShow.name.replace(/\s+/g,"-")
  
  return (
    <Link style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
      href={`/show/${TvShow.id}-${showTitle}`} 
      className='mx-[5px] flex flex-col snap-end items-center justify-start h-fit
      flex-grow-0 flex-shrink-0 lg:basis-[180px] sm:max-lg:basis-[150px] group/card'>
          <img width="200px" height="300px"
        src={`${baseImageUrl}${TvShow.poster_path}`}
        alt={`${TvShow.title}`}
        loading='lazy'
        layout='responsive'
        className='lg:h-[250px] 
            sm:max-lg:h-[180px]
            select-none rounded-md bg-cover'
        placeholder='blur'
        blurDataURL='./placeholder.png'
        style={{
          maxWidth: "100%",
        height:"auto"}} />
      <div className='w-[180px] h-fit flex justify-center'>
        <p className='group-hover/card:underline pt-3 sm:max-lg:hidden truncate'>{TvShow.name}</p></div>
    </Link>
  )
}

export default TvShowCard;