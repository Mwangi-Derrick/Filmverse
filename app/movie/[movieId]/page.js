"use client"
import MovieCarousel from "@/components/MovieCarousel";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
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
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos,credits,recommendations`)
      let data = await results.json();
      console.log(data)
      setInfo(data);
      return data
    }
    fetchMovieDetails();
  }, [])
  let hours = "00"
  let minutes = "00"
  let cast = undefined;
  let directors = undefined;
  if (movieInfo) {
    hours = Math.floor((movieInfo.runtime) / 60).toString()
    minutes = (movieInfo.runtime % 60).toString()
    cast = movieInfo.credits.cast
    directors = movieInfo?.credits?.crew.
      filter((person) => person.known_for_department === "Directing").splice(0,5)
  }
  console.log(movieInfo)
  const runtime = ` ${hours}h ${minutes}min`
  return (movieInfo && (
    <div 
    style={{
      backgroundImage: ` linear-gradient(to top, rgba(0, 0, 0, 1),
        rgba(0,0,0,0.9),rgba(0,0,0,0.8), rgba(0, 0, 0, 1)), 
         url(${img_Url}${movieInfo.backdrop_path})`
    }}
      className=' flex  items-center  text-white h-full w-full flex-col
       justify-start bg-no-repeat bg-cover  aspect-square bg-center
        '>
      
      <section className='flex lg:flex-row w-[90%] h-fit sm:max-lg:items-center
         justify-around pt-7 sm:max-lg:flex-col sm:max-lg:justify-center'>
        <div className='flex flex-col lg:w-[25%] sm:max-md:w-[60%] md:max-lg:w-[50%] '>
          <Image src={`${img_Url}${movieInfo.poster_path}`}
            width={300} height={90} alt=''
            className='w-full lg:h-[400px] sm:max-md:h-[300px] rounded-md md:max-lg:h-[350px]' />
          <Link href={`/${movieId}#play=${movieInfo.videos?.results[0]?.key}`}>
            <button className='w-full h-[50px] hover:bg-neutral-900 text-neutral-900
              text-lg font-semibold flex items-center justify-center
            hover:text-red-500 transition-all duration-700
            my-[20px] rounded-md
           bg-red-500'><PlayCircleIcon className="h-5 w-5 mx-1"/> Play Trailer</button></Link>
        </div>
        <div className='flex flex-col lg:w-[70%] sm:max-lg:items-start sm:max-lg:w-full'>
          <div className='flex items-start flex-col pb-5'>
            <h1 className='font-bold lg:text-4xl sm:max-lg:text-3xl'>{movieInfo.title}</h1>
            <div className='flex w-full h-fit mt-4 text-xl sm:max-lg:text-sm ' >
              <p className='pr-2 lg:w-fit sm:max-lg:w-[80px] flex items-start'>{movieInfo.release_date}</p>
              <span className='flex flex-wrap items-center'>
                <p className='pr-1 flex items-center'>
                  <p className='pr-2'>|</p>{runtime}</p>
                {movieInfo?.genres.map((genre, index) => (
                  <p key={genre.id} className='px-1 flex items-center'>
                    {index === 0 && '|' + ' '}
                    {index > 0 && ',' + ' '}
                    {`${genre.name}`}</p>
                ))
                }
              </span>
            </div>
            <p className="pt-3 text-slate-200 font-light font-sans">{movieInfo.tagline }</p>
          </div>
          
          <article className='flex flex-col pb-2'>
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center 
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>STORY</p>
            </span>
            <p className='lg:text-xl md:max-lg:text:base font-light '>
              {movieInfo.overview}
            </p>
            <span className='py-[20px] mt-3  w-full h-[25px] lg:text-base sm:max-lg:text-sm font-bold
               items-center
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>CAST & CREW</p></span>
            <div className='w-full h-fit flex items-start justify-start'>
              <ul>
                <p className='text-base font-semibold'>Cast</p>
                {
                  cast?.splice(0, 5).map((actor) =>
                  (
                    <li key={actor.id}>{actor.name}</li>
                    ))
                }
              </ul>
              <ul className='ml-5'>
                <p className='text-base font-semibold'>{ directors?.length > 1 ? "Directors":"Director"}</p>
                {
                  directors?.map((person) => (
                    <li key={person.id} >{person.name }</li>
                  ))
                }
              </ul>
            </div>
            <section className="flex mt-[20px]">
            <div className="flex flex-col mr-[150px]">
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center 
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>INFORMATION</p>
                </span>
                <ul>
                <p className='text-base font-semibold'>Production Companies</p>
                  {movieInfo?.production_companies.map((company) => (
                    <li>{company.name}</li>
                  )
                  )}
                </ul>
                <ul className="mt-2">
                <p className='text-base font-semibold'>Production Countries</p>
                  {movieInfo?.production_countries.map((country) => (
                    <li>{ country.name}</li>
                ))}
                </ul>
              </div>
              <div className="flex flex-col">
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center 
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>LANGUAGES</p>
                </span>
                <ul>
                  {movieInfo?.spoken_languages.map((language) => (
                    <li>{ language.english_name}</li>
                ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </section>
     {movieInfo.recommendations.results && <MovieCarousel data={movieInfo.recommendations.results} title={`movies like${movieInfo.title}`} />}
      </div>
  )
  )
}  

export default page


