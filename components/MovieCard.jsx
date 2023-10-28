import React from 'react'
import Link from 'next/link';
import placeholder from '../public/palceholder.png';
 
function MovieCard({movieId,poster,movieTitle}) {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
    const movietitle = `${movieTitle}`
    const formatedTitlle = movietitle.replace(":", "").replace(/\s+/g, '-').replace(/\//g,'')
  return (
    <Link style={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
      href={`/movie/${movieId}?id=${movieId}`} as={`/movie/${movieId}-${formatedTitlle}`}
            className='mx-[5px] flex flex-col snap-end items-center justify-start h-fit
           flex-grow-0 flex-shrink-0 lg:w-[180px] sm:w-[120px] md:w-[150px] aspect-[18/25] group/movie'> 
            <img src={`${baseImageUrl}${poster}`} className='lg:h-[250px] 
             aspect-[18/25]
            select-none rounded-md bg-cover
           ' width='200px' height='300px'
        alt={`${movieTitle}`}
              placeholder={placeholder}
              blurdataurl={placeholder}
      />
      <div className='w-[180px] h-fit flex justify-center'>
        <p className='group-hover/movie:underline pt-3 sm:max-lg:hidden truncate'>{movieTitle}</p></div>
          </Link>
  )
}

export default MovieCard