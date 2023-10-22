"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PaginationUI from './PaginationUI';
import Link from 'next/link';
import Image from 'next/image';
import { FunnelIcon } from '@heroicons/react/24/solid';
function ShowsWrapper({ fetchShows,genreType }) {
    const [shows,setShows] = useState(null)
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || 1
    useEffect(() => {
        async function fetchData () {
            const data = await fetchShows(page)
            setShows(data.results);
        }
        fetchData();
    }, [page])
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
    const showTilteUrlSegment = (name) => {
      return  name.replace(/\s+/g,"-")
    }
  return (
      <div className='flex flex-col pt-[60px]'>
          <div className='w-full h-fit flex items-center justify-between px-5'>
              <h1 className='flex items-center w-fit h-5 py-6 text-3xl font-medium
    sm:max-lg:text-xl 
   capitalize'>{genreType} Shows</h1>
              <button className='w-[100px] h-[35px] rounded-md text-black cursor-pointer
               bg-red-500 flex items-center font-semibold justify-center'>
                  Filter <FunnelIcon className='w-5 h-5 mx-1' /></button>
          </div>
          {shows && (<div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:flex flex-wrap
          items-center justify-center min-h-screen
          p-3'>
              {shows.map((show) => (<Link key={show.id}
                  href={`/show/${show.id}-${showTilteUrlSegment(show.name)}`}
                  className='flex flex-col w-auto h-auto items-center justify-center m-1 group'>
                  <div className='w-full h-auto'>
                      <img src={`${baseImageUrl}${show.poster_path}`}
                          loading='lazy'
                          alt=''
                          width="250px" height="300px"
                      className='lg:group-hover:scale-[1.02] transition-all duration-700 ease-in-out 
                      select-none rounded-md w-full object-cover h-full'/>
                  </div><div className='w-full h-fit flex justify-center'>
                  <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              className='lg:group-hover:text-brown-700 transition-colors duration-700
              ease-in-out pt-3 lg:text-[16px]
              truncate
              sm:max-lg:text-[12px]'>{show.name}</p></div>
                  
              </Link>))}
          </div>)}
          <PaginationUI/>
    </div>
  )
}

export default ShowsWrapper