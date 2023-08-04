import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import placeholder from '../public/palceholder.png';

function MovieCard({movieId,poster,movieTitle}) {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  return (
    <Link href={`/movie/${movieId}?id=${movieId}`} as={`/movie/${movieId}-${movieTitle}`}
            className='mx-[5px] flex flex-col snap-end items-center justify-start h-fit
           flex-grow-0 flex-shrink-0 lg:basis-[200px] sm:max-lg:basis-[150px]'> 
            <Image src={`${baseImageUrl}${poster}`} className=' lg:h-[250px] 
            sm:max-lg:h-[180px]
            select-none rounded-md bg-cover
           ' width={200} height={90} alt={`${movieTitle}`}
              placeholder={placeholder}
              blurDataURL={placeholder}
            />
             <p className='hover:underline pt-3 sm:max-lg:hidden'>{movieTitle}</p>
          </Link>
  )
}

export default MovieCard