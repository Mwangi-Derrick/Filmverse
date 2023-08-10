"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import TvShowCard from './TvShowCard';

function TvCarousel({ data,title }) {
  const carouselRef = useRef(null);
  const [scrollButton, setScrollBtn] = useState('none');

  const [TvShows, setTvShows] = useState(data);
  useEffect(() => { setTvShows(data) }, [data])
  console.log(TvShows)
  useEffect(() => {
    const handleScrollButtons = () => {
      if (carouselRef.current) {
        const maxScrollWidth = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        const scrollLeft = carouselRef.current.scrollLeft;
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
    if (carouselRef && carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScrollButtons);
    }
    return () => {
      if (carouselRef && carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScrollButtons);
      }
    };
  }, []);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
      carouselRef.current.scrollLeft += carouselRef.current.clientWidth / 2;
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'smooth';
      carouselRef.current.scrollLeft -= carouselRef.current.clientWidth / 2;
    }
  };
  
  return (
    <div className='text-white w-[90%] h-fit mx-auto flex flex-col relative group
    my-5'>
    <div className='px-[10px] py-2 lg:h-[60px] flex items-center justify-between
      '><p className='lg:text-3xl font-medium capitalize'
        >{title}</p> </div>
      {(scrollButton === 'left' || scrollButton === 'both' ) && (
        <button onClick={scrollLeft} className='w-[60px] h-[60px] bg-white
          items-center hidden group-hover:flex
         justify-center absolute rounded-[50%] top-[45%] left-[-30px] cursor-pointer'>
          <ChevronLeftIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      {(scrollButton === 'right' || scrollButton === 'both') && (
        <button onClick={scrollRight} className='w-[60px] h-[60px] bg-white
        absolute  top-[45%] right-[-30px] hidden group-hover:flex
         items-center rounded-[50%] justify-center cursor-pointer'>
          <ChevronRightIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit overflow-x-hidden overflow-y-hidden
        px-[5px] items-start justify-start  ' ref={carouselRef}>
       {
  TvShows && TvShows.map((show) => <TvShowCard TvShow={show} />)
    }
      </div>
    </div>
  );
}

export default TvCarousel;
