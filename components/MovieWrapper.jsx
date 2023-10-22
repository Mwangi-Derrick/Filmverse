"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PaginationUI from './PaginationUI';
import { FunnelIcon } from '@heroicons/react/24/solid';

function MovieWrapper({ call,genreType}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const receiveData = async () => {
      const data = await call(currentPage);
      setMovies(data.results);
    };
    receiveData();
  }, [currentPage]);
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  let movietitles;
  if (movies) {
   movietitles = movies.map((item)=>(item.title).replace(":","").replace(/\s+/g,'-'))
  }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-[60px]'>
      <div className='w-full h-fit flex items-center justify-between px-5'>
              <h1 className='flex items-center w-fit h-5 py-6 text-3xl font-medium
    sm:max-lg:text-xl pr-9
   capitalize'>{genreType} Movies</h1>
              <button className='w-[100px] h-[35px] rounded-md text-black cursor-pointer
               bg-red-500 flex items-center font-semibold justify-center'>
                  Filter <FunnelIcon className='w-5 h-5 mx-1' /></button>
          </div>
      {movies && (
        <div className='sm:grid sm:grid-cols-2 md:grid-cols-5 gap-3 min-h-screen
      pt-3 px-3 w-full h-full xl:grid-cols-6 3xl:flex flex-wrap justify-center'>
          {movies.map((movie, index) => (<Link key={movie.id}
            href={`/movie/${movie.id}?id=${movie.id}`}
            as={`/movie/${movie.id}-${movietitles[index]}`}
            className=' flex flex-col items-center justify-start
            my-1 group
           '><div className='h-fit w-full flex justify-center'>
              <img
                layout='responsive'
                loading='lazy'
              src={`${baseImageUrl}${movie.poster_path}`} className='
              lg:group-hover:scale-[1.02] transition-all duration-700 ease-in-out 
            select-none rounded-md w-full
           ' width="200px" height="300px" alt={`${movie.title}`}
            /></div><div className='w-full h-[60px] flex justify-center'>
            <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              className='lg:group-hover:text-brown-700 transition-colors duration-700
              ease-in-out pt-3 lg:text-[16px] truncate
              sm:max-lg:text-[12px]'>{movie.title}</p></div>
          </Link>
          ))}
        </div>
      )}
       <PaginationUI/>
    </div> 
  );
}

export default MovieWrapper;
