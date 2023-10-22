"use client"
import React, { useEffect, useState } from 'react'
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import TrailerIframe from "@/components/TrailerIframe";
import PeopleCarousel from './PeopleCarousel';
import MovieCarousel from './MovieCarousel';
export default function MovieDetails({details}) {
    const [movieInfo, setInfo] = useState(null)
    const img_Url = "https://image.tmdb.org/t/p/w500/"
    useEffect(() => { setInfo(details) }, [details])
  let hours=""
  let minutes=""
  let cast = undefined;
  let directors = undefined;
  let Trailer;
  let initialDateFormat;
  let reversedDate;
  let dateParts;
  if (movieInfo && movieInfo.release_date) {
    cast = movieInfo?.credits?.cast.slice(0,5)
    directors = movieInfo?.credits?.crew.
      filter((person) => person.known_for_department === "Directing").splice(0, 5)
    //remove any duplicate names that may arise using the javaScript Set object
    directors = [...new Set(directors?.map((person) => person.name))]
    Trailer = movieInfo?.videos?.results.filter((video) => video.type === "Trailer").splice(0, 1)
    initialDateFormat = movieInfo?.release_date.replace(/-/g, "/");
    dateParts = initialDateFormat.split('/');
    reversedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
    hours = Math.floor((movieInfo.runtime) / 60).toString()
  minutes = (movieInfo.runtime % 60).toString()
  }
  const runtime = `${hours}${hours>1?"hrs":"hr"} ${minutes}min`
  /*add a usestate hook to handle the trailer 
  view functionality whenever a user clicks the watch trailer button*/
  const [YTtrailer, setTrailer] = useState(false);
  //add an event handler function to set the trailer usestate to true
  const watchTrailer = () => {
    setTrailer(true)
  }
  const closeTrailer = () => {
    setTrailer(false)
  }
  return (movieInfo && (
          <div 
      className='flex items-center text-white h-full w-full flex-col
       justify-start bg-neutral-950 bg-opacity-70 backdrop-blur-sm backdrop-brightness-[60%] 
       pt-12 pb-[60px] relative
        '>
      <section className='flex lg:flex-row w-[90%] h-fit sm:max-lg:items-center
         justify-around pt-7 sm:max-lg:flex-col sm:max-lg:justify-center'>
        <div className='flex flex-col lg:w-[25%] sm:max-md:w-full md:max-lg:w-[50%] '>
          <img src={`${img_Url}${movieInfo.poster_path}`}
            loading='lazy'
            width='300px' height='400px' alt=''
            className='w-full aspect-[171/200] rounded-md' />
           <button onClick={watchTrailer}
            className='w-full h-[50px] hover:bg-neutral-900 text-neutral-900
              text-lg font-semibold flex items-center justify-center
            hover:text-red-500 transition-colors duration-700
            my-[20px] rounded-md
            sm:max-lg:h-[40px]
           bg-red-500'><PlayCircleIcon className="h-5 w-5 mx-1" /> Play Trailer</button>
        </div>
        <div className='flex flex-col lg:w-[70%] sm:max-lg:items-start sm:max-lg:w-full'>
          <div className='flex items-start flex-col pb-5'>
            <h1 className='font-bold lg:text-4xl sm:max-lg:text-3xl'>{movieInfo.title}</h1>
            <div className='flex w-full h-fit mt-4 text-xl sm:max-lg:text-sm gap-1' >
              <p className='lg:w-fit sm:max-lg:w-[80px] flex items-start'>{reversedDate}</p>
              <span className='flex flex-wrap items-center gap-1'>
                <p>|</p>
                <p>{runtime}</p>
                <p>|</p>
                {movieInfo?.genres?.map((genre, index) => (
                  <p key={genre.id} className=' flex items-center'>
                    {index > 0 && ','}
                    {`${genre.name}`}</p>
                ))
                }
              </span>
            </div>
            <p className="pt-3 text-slate-200 font-light font-sans italic">{movieInfo.tagline}</p>
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
                <p className='text-base font-semibold lg:text-base sm:max-lg:text-sm'>Cast</p>
                {
                  cast?.map((actor) =>
                  (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={actor.id}>{actor.name}</li>
                    ))
                }
              </ul>
              <ul className='ml-5'>
                {directors?.length > 0 && <p className='text-base lg:text-base sm:max-lg:text-sm
               font-semibold'>{directors?.length > 1 ? "Directors" : "Director"}</p>}
                {
                  directors?.map((person) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px] "
                      key={person} >{person}</li>
                  ))
                }
              </ul>
            </div>
            <section className="flex mt-[20px] w-full h-fit sm:max-lg:flex-col">
            <div className="flex flex-col mr-[80px] w-fit h-fit items-start">
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center mb-1
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>INFORMATION</p>
                </span>
                <ul>
                  <p className='lg:text-base sm:max-lg:text-sm 
                 font-semibold'>Production Companies</p>
                  {movieInfo?.production_companies?.map((company) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]
                    w-[180px] h-fit flex items-center justify-between"
                      key={company.name}>{company.name}</li>
                  )
                  )}
                </ul>
                <ul className="mt-2">
                  <p className='lg:text-base sm:max-lg:text-sm 
                font-semibold'>Production Countries</p>
                  {movieInfo?.production_countries?.map((country) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={country.name}>{country.name}</li>
                ))}
                </ul>
              </div>
              <div className="flex flex-col">
             <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center sm:max-lg:mt-3
               flex justify start'>
              <p className='pb-1 border-b-[3px]  border-b-red-500 border-solid'>LANGUAGES</p>
                </span>
                <ul className="sm:max-lg:mt-1">
                  {movieInfo?.spoken_languages?.map((language) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={language.english_name}>{language.english_name}</li>
                ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
          </section>  
          {movieInfo && (<PeopleCarousel people={ movieInfo?.credits} />)}
      {movieInfo.recommendations?.results?.length>0 &&
        <MovieCarousel data={movieInfo.recommendations.results} title={`movies like ${movieInfo.title}`} />} 
          {Trailer?.length>0 && (<TrailerIframe TrailerId={Trailer[0].key} onClose={closeTrailer} YTtrailer={YTtrailer} />)}
      </div>
  )
  )
}
