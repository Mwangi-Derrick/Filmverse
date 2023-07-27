"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

function MovieCarousel({ data,title }) {
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
      <div className='pl-[20px] py-2 h-30px text-2xl font-bold uppercase'>{title}</div>
      {(scrollButton === 'left' || scrollButton === 'both' ) && (
        <button onClick={scrollLeft} className='w-12 h-12 bg-white
          items-center hidden group-hover:flex
         justify-center absolute rounded-[50%] top-[45%] left-[-30px] cursor-pointer'>
          <ChevronLeftIcon className='w-6 h-6 font-extrabold text-black' />
        </button>
      )}
      {(scrollButton === 'right' || scrollButton === 'both') && (
        <button onClick={scrollRight} className='w-12 h-12 bg-white
        absolute  top-[45%] right-[-30px] hidden group-hover:flex
         items-center rounded-[50%] justify-center cursor-pointer'>
          <ChevronRightIcon className='w-6 h-6 font-extrabold text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit overflow-x-hidden overflow-y-hidden
        px-[5px] items-start justify-start  ' ref={carouselRef}>
        {data.map((item) => (
          <Link href={`tv/${item.id}-${item.title}?id=${item.id}`}
             key={item.id}
            className='mx-[5px] flex flex-col  items-center justify-start h-fit
           flex-grow-0 flex-shrink-0 basis-[200px]'> 
            <Image src={`${baseImageUrl}${item.poster_path}`} className=' h-[250px] 
            select-none rounded-md
           ' width={200} height={90} alt={`${item.title}`} />
             <p className='hover:underline pt-3  '>{item?.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;
