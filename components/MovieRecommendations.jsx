"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

function MovieRecommendations({ data,title }) {
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  const carouselRef = useRef(null);
  const [scrollButton, setScrollBtn] = useState('none');
  
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
      <div className='pl-[10px] py-2 h-30px lg:text-2xl
       font-bold uppercase'>{title}</div>
      {(scrollButton === 'left' || scrollButton === 'both' ) && (
        <button onClick={scrollLeft} className='w-12 h-12 bg-white
          items-center sm:hidden lg:group-hover:flex
         justify-center absolute rounded-[50%] top-[45%] left-[-30px] cursor-pointer'>
          <ChevronLeftIcon className='w-6 h-6 font-extrabold text-black' />
        </button>
      )}
      {(scrollButton === 'right' || scrollButton === 'both') && (
        <button onClick={scrollRight} className='w-12 h-12 bg-white
        absolute  top-[45%] right-[-30px] sm:hidden lg:group-hover:flex 
         items-center rounded-[50%] justify-center cursor-pointer'>
          <ChevronRightIcon className='w-6 h-6 font-extrabold text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit lg:overflow-x-hidden overflow-y-hidden
        px-[5px] items-start justify-start snap-x snap-mandatory' ref={carouselRef}>
        {data.map((item) => (
          <Link href={`movie/${item.id}?id=${item.id}`} as={`/${item.id}-${item.title}`}
            key={item.id}
            className='mx-[5px] flex flex-col snap-end items-center justify-start h-fit
           flex-grow-0 flex-shrink-0 lg:basis-[200px] sm:max-lg:basis-[150px]'> 
            <Image src={`${baseImageUrl}${item.poster_path}`} className=' lg:h-[250px] 
            sm:max-lg:h-[180px]
            select-none rounded-md bg-cover
           ' width={200} height={90} alt={`${item.title}`} />
             <p className='hover:underline pt-3 sm:max-lg:hidden'>{item?.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieRecommendations;
