"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import PaginationUI from './PaginationUI';
function MovieWrapper({ call }) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const receiveData = async () => {
      const data = await call(currentPage);
      console.log(data.results);
      setMovies(data.results);
    };
    receiveData();
  }, [currentPage]);
  console.log(movies)
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  let movietitle;
  if (movies) {
   movietitle = movies.map((item)=>(item.title).replace(":","").replace(/\s+/g,'-'))
  }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {movies && (
        <div className='sm:grid sm:grid-cols-2 md:grid-cols-5
      pt-3 px-3  w-full h-full xl:grid-cols-6 3xl:flex flex-wrap justify-center'>
          {movies.map((movie, index) => (<Link key={movie.id}
            href={`/movie/${movie.id}?id=${movie.id}`}
            as={`/movie/${movie.id}-${movietitle[index]}`}
            className='mx-[5px] flex flex-col  items-center justify-start h-full
            my-1 group
           '>
            <Image layout='responsive'
              src={`${baseImageUrl}${movie.poster_path}`} className='
              lg:group-hover:scale-[1.02]  transition-all duration-700 ease-in-out 
            select-none rounded-md h-[20px] 
           ' width={1900} height={1000} alt={`${movie.title}`}
            />
            <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              className='lg:group-hover:text-brown-700 transition-colors duration-700
              ease-in-out pt-3  lg:text-[16px]
              sm:max-lg:text-[12px]'>{movie.title}</p>
          </Link>
          ))}
        </div>
      )}
       <PaginationUI/>
    </div> 
  );
}

export default MovieWrapper;
