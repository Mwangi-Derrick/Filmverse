"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
function page({ params }) {
  const movieId = params.movieId
  const [movieInfo, setInfo] = useState(null)
  const img_Url = "https://image.tmdb.org/t/p/w500/"
  console.log(params)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const key = '31893f5365efe0cdf393794446aae7a6'
      const results = await
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos,credits`)
      let data = await results.json();
      console.log(data)
      setInfo(data);
      return data
    }
    fetchMovieDetails();
  }, [])

  return (<>
    {movieInfo &&
      <div style={{
        backgroundImage: ` linear-gradient(to top, rgba(0, 0, 0, 1),
        rgba(0,0,0,0.9),rgba(0,0,0,0.8), rgba(0, 0, 0, 1)), 
         url(${img_Url}${movieInfo.poster_path})`
      }}
        className=' flex items-start  text-white h-full w-full
       bg-no-repeat bg-cover  aspect-square bg-center justify-center 
        '>
        <section className='flex lg:flex-row w-[90%] sm:max-lg:items-center
         justify-around pt-7 sm:max-lg:flex-col sm:max-lg:justify-center'>
        <div className='flex flex-col lg:w-[30%] sm:max-md:w-[60%] md:max-lg:w-[50%] '>
          <Image src={`${img_Url}${movieInfo.poster_path}`}
              width={300} height={90} alt=''
            className='w-full lg:h-[400px] sm:max-md:h-[250px] rounded-md md:max-lg:h-[350px]'/>
            <Link href={`/${movieId}#play=${movieInfo.videos?.results[0]?.key}`}>
              <button className='w-full h-[50px] hover:bg-neutral-900 text-neutral-900
              text-lg font-semibold
            hover:text-red-500 transition-all duration-700
            my-[20px] rounded-md
           bg-red-500'>Watch Trailer</button></Link>
          </div>
          <div className='flex flex-col lg:w-[60%] sm:max-lg:items-start sm:max-lg:w-full'>
            <div className='flex items-start flex-col pb-5'>
              <h1 className='font-bold lg:text-4xl sm:max-lg:text-3xl'>{movieInfo.title}</h1>
              <div className='flex w-full h-fit mt-4 text-xl sm:max-lg:text-sm ' >
                <p className='pr-3 w-[130px]'>{movieInfo.release_date}</p>
                <span className='flex flex-wrap'>
                {movieInfo?.genres.map((genre,index) => (
                  <p key={genre.id} className='pr-1'>
                    {index > 0 &&  '|' + ' '}
                    {`${genre.name}`}</p>
                ))    
                }
                </span>
              </div>
            </div>
            <article className='flex flex-col pb-2'>
              <span className='pb-[15px]  w-full h-[25px] lg:text-xl sm:max-lg:text-base font-bold
               items-center
               flex justify start'>
              <p className='pb-1 border-b-[4px] border-b-red-500 border-solid'>STORY</p>
              </span>
              <p className='lg:text-xl md:max-lg:text:base font-light'>
              {movieInfo.overview}
              </p>
            </article>
            </div>
       </section>
      </div>
    }
    </>
    )

}

export default page


