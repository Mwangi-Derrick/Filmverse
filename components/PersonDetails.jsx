"use client"
import { FilmIcon, TvIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function PersonDetails({ personCredits, personInfo }) {
    const [informtion, setInfomation] = useState(personInfo)
    const [totalCredits, setTotalCredits] = useState(personCredits)
    useEffect(() => {
        setInfomation(personInfo)
        setTotalCredits(personCredits)
    }, [personCredits, personInfo])
    const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    const name = (media)=>{
        if (media.media_type === "movie") { return media.title }
         if (media.media_type === "tv"){return media.name}
    }
    const ulrPath = (media) => {
        if (media.media_type === "movie")
        { return `/movie/${media.id}-${media.title.replace(/\s+/g, "-")}` }
        if (media.media_type === "tv")
        { return `/show/${media.id}-${media.name.replace(/\s+/g, "-")}` }
    }
   
    const renderMediaIcon = (mediaType) => {
        if (mediaType === "movie") { return (<FilmIcon className='w-5 h-5' />) }
        else if (mediaType === "tv") { return (<TvIcon className='w-5 h-5' />) }
        else{return ""}
    }
    return (
        <div className='w-full h-full text-white flex flex-col px-6 pt-5'>
            <section className='flex lg:flex-row sm:flex-col w-full min-h-[400px]'>
                <div className='lg:w-[15%] sm:w-full h-fit mr-3'>
                    <img loading='lazy'
                        src={`${baseUrl}${informtion.profile_path}`}
                        width={1000} height={1400} className='rounded-md' alt='' />
                </div>
                <article className='flex flex-col flex-1'>
                    <h1 className='text-4xl font-semibold w-fit h-fit pb-5 sm:max-lg:py-2'>{informtion.name}</h1>
                    <p className='text-2xl font-medium pb-3'>Biography</p>
                    <p className='text-[14px]'>
                        {informtion.biography || `Biography of ${informtion.name} is currently unavailable from our data sources.`}</p>
                </article>
            </section>
            <div className='flex flex-col w-full h-fit pt-3 mb-10 '>
                <h5 className='text-2xl capitalize py-3 w-full h-fit'>{`also starring ${informtion.name}` }</h5>
            <div className='w-full h-fit grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                     {totalCredits && totalCredits?.map((credit) => (
                        <Link style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
                            href={ulrPath(credit)} className='h-auto w-auto flex flex-col items-end justify-end 
                             group'>
                            <div className='w-full h-auto relative flex-1 
                              lg:group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out
                              '>
                                <img src={`${baseUrl}${credit.poster_path}`}
                                    loading='lazy'
                                    width='200px'
                                height='300px'
                                 alt='actor' className='h-full rounded-md
                               w-full object-cover z-100 '/>
                                <i className='absolute top-0 left-0 w-[45px] 
                                h-[25px] flex items-center justify-center bg-red-500 rounded-md'>{renderMediaIcon(credit?.media_type)}</i>
                            </div>
                            <div className='flex flex-col pt-1 w-full h-fit min-h-[60px]
                             items-center justify-start lg:group-hover:text-brown-600 truncate'>
                            <div className='w-full h-fit flex flex-row justify-center truncate'>
                            <p className='truncate font-semibold'>{name(credit)}</p>
                                </div>
                                {credit.character
                                    && (<p className='font-light italic'>As {credit?.character}</p>)}
                            </div>
                    </Link>))}
                </div>
            </div>
    </div>
  )
}
