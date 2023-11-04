"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import TvShowCard from './TvShowCard';
import Link from 'next/link';

function TvCarousel({ data,title,genreId }) {
  const TVcarouselRef = useRef(null);
  const [scrollButton, setScrollBtn] = useState('none');

  const [TvShows, setTvShows] = useState(data);
  useEffect(() => { setTvShows(data) }, [data])
  useEffect(() => {
    const handleScrollButtons = () => {
      if (TVcarouselRef.current) {
        const maxScrollWidth = TVcarouselRef.current.scrollWidth - TVcarouselRef.current.clientWidth;
        const scrollLeft = TVcarouselRef.current.scrollLeft;
        const scrollEnd = maxScrollWidth - 20;
        if (scrollLeft < 20) {
          setScrollBtn('right');
        } else if (scrollLeft > scrollEnd) {
          setScrollBtn('left');
        } else {
          setScrollBtn('both');
        }
      }
    };
    
    handleScrollButtons();
    if (TVcarouselRef && TVcarouselRef.current) {
      TVcarouselRef.current.addEventListener('scroll', handleScrollButtons);
    }
    return () => {
      if (TVcarouselRef && TVcarouselRef.current) {
        TVcarouselRef.current.removeEventListener('scroll', handleScrollButtons);
      }
    };
  }, []);

  const scrollRight = () => {
    if (TVcarouselRef.current) {
      TVcarouselRef.current.style.scrollBehavior = 'smooth';
      TVcarouselRef.current.scrollLeft += TVcarouselRef.current.clientWidth / 2;
    }
  };

  const scrollLeft = () => {
    if (TVcarouselRef.current) {
      TVcarouselRef.current.style.scrollBehavior = 'smooth';
      TVcarouselRef.current.scrollLeft -= TVcarouselRef.current.clientWidth / 2;
    }
  };
  /* The tvCarouselScrollable function returns a boolean depending on the scroll width and the client width of the scroll conatainer.
   This is later used to render the scroll buttons whenever the scroll conatiner
    is scrollable ie.whenever there are hidden overflowing elements*/
  const tvCarouselScrollable = () => {
    if (TVcarouselRef.current)
    { return TVcarouselRef.current.scrollWidth > TVcarouselRef.current.clientWidth }
  }
  const showTitle = `${title}`
  const urlTitleSegement = showTitle.replace(/\s+/g,"-")
  const possibleTitleSubtrings = ["topRated", "trending", "popular","you"]
  const startsWith = possibleTitleSubtrings.some((substring)=>showTitle.startsWith(substring))
  return (
    <div className='text-white lg:w-[90%] sm:w-[100%] h-fit mx-auto flex flex-col 
    my-5'>
    <div className='px-[10px] py-2 lg:h-[60px] flex items-center justify-between
      '><h2 className='lg:text-3xl font-medium capitalize'
        >{data.length > 0 ? title : ""}</h2>
        {!startsWith && (<Link href={`/tv-shows/${urlTitleSegement}-${genreId}`} className='w-fit h-fit 
          flex items-center sm:max-lg:text-[11px] font-semibold group/genreLink'>
          Show More
          <i className='flex items-center justify-between w-fit h-fit px-1'>
            <ChevronRightIcon
              className='lg:h-5 lg:w-5 sm:max-lg:w-3 transition-all duration-900
          ease-in-out group-hover/genreLink:scale-y-[1.1] 
          group-hover/genreLink:scale-x-[1.1] group-hover/genreLink:translate-x-1
          group-hover/genreLink:text-red-500
           sm:max-lg:h-3 stroke-current stroke-1' /></i>
        </Link>)}
      </div>
      <div className='w-full h-fit relative group'>
      {((scrollButton === 'left' || scrollButton === 'both') && tvCarouselScrollable() ) && (
        <button onClick={scrollLeft} className='w-[60px] h-[60px] bg-white
          items-center hidden lg:group-hover:flex
         justify-center absolute rounded-[50%] top-[35%] left-[-30px] cursor-pointer'>
          <ChevronLeftIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      {((scrollButton === 'right' || scrollButton === 'both') && tvCarouselScrollable()) && (
        <button onClick={scrollRight} className='w-[60px] h-[60px] bg-white
        absolute  top-[35%] right-[-30px] hidden lg:group-hover:flex
         items-center rounded-[50%] justify-center cursor-pointer'>
          <ChevronRightIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit lg:overflow-x-hidden overflow-y-hidden
        px-[5px] items-start justify-start snap-x snap-mandatory scroll-smooth no-scrollbar' ref={TVcarouselRef}>
       {
  TvShows && TvShows.map((show) => <TvShowCard key={show.id} TvShow={show} />)
    }
      </div>
      </div>
    </div>
  );
}

export default TvCarousel;
