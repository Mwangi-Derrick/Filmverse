"use client"
import Link from 'next/link';
import React, {useState,useEffect } from 'react'
const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
function TvShowCard({TvShow}) {
  const showTitle = TvShow.name.replace(/\s+/g,"-")
  
  return (
    <div className='w-fit h-fit relative'>
    <Link style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
      href={`/show/${TvShow.id}-${showTitle}`} 
      className='mx-[5px] flex flex-col snap-end items-center justify-start 
      flex-grow-0 flex-shrink-0  sm:w-[120px] md:w-[150px] lg:w-[180px] aspect-[18/25] group/card'>
          <img width="200px" height="300px"
        src={`${baseImageUrl}${TvShow.poster_path}`}
        alt={`${TvShow.title}`}
        loading='lazy'
        layout='responsive'
        className='aspect-[18/25]
            select-none rounded-md bg-cover'
        placeholder='blur'
        blurdataurl='./placeholder.png'
        style={{
          maxWidth: "100%",
        height:"auto"}} />
      <div className='sm:w-[120px] md:w-[150px] lg:w-[180px] h-fit flex justify-center'>
        <p className='group-hover/card:underline pt-3 sm:max-lg:hidden truncate'>{TvShow.name}</p></div>
      </Link>
      </div>
  )
}

export default TvShowCard;