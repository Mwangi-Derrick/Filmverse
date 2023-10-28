"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


function PeopleCarousel({people}) {
  const carouselRef = useRef(null);
  const [scrollButton, setScrollBtn] = useState('none');
   const cast = people?.cast?.filter((person) => person.known_for_department === "Acting").slice(0,10)
  const [actors, setActors] = useState(cast)
  useEffect(() => { setActors(cast) }, [people])
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
   /* function retuens a boolean depending on the scroll width and the client width of the scroll conatainer.
   This is later used to render the scroll buttons whenever the scroll conatiner
    is scrollable ie.no hidden overflowing elements*/
    const peopleCarouselScrollable = () => {
      if (carouselRef.current) {
        return carouselRef.current.scrollWidth > carouselRef.current.clientWidth
      }
    };
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';
  const actorName = (name)=>{return name.replace(/\s+/g,"-")}
  return (
    <div className='text-white lg:w-[90%] sm:max-lg:w-full h-fit mx-auto flex flex-col 
    my-5'>
      <div className='px-[10px] py-2 lg:h-[60px] flex items-center justify-between
      '><h2 className='lg:text-3xl font-medium capitalize'>Cast</h2>
      </div>
<div className='w-full h-fit group relative'>
      {/*conditionally render the scrollbuttons based on the scrollPositon 
      and the number of  items in the scroll container*/}
      {((scrollButton === 'left' || scrollButton === 'both')&&peopleCarouselScrollable() )  && (
        <button onClick={scrollLeft} className='w-[60px] h-[60px] bg-white
          items-center sm:hidden lg:group-hover:flex
         justify-center absolute rounded-[50%] top-[35%] left-[-30px]
         cursor-pointer '>
          <ChevronLeftIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      {((scrollButton === 'right' || scrollButton === 'both')&&peopleCarouselScrollable() ) && (
        <button onClick={scrollRight} className='w-[60px] h-[60px] bg-white
        absolute  top-[35%] right-[-30px] sm:hidden lg:group-hover:flex 
         items-center rounded-[50%] justify-center cursor-pointer '>
          <ChevronRightIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit lg:overflow-x-hidden overflow-y-hidden 
        gap-2 px-5 items-start justify-start snap-x snap-mandatory no-scrollbar ' ref={carouselRef}>
          {actors && actors.map((person) => (<Link style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
            href={`/person/${person.id}-${actorName(person.name)}`}
            className='flex flex-col snap-end items-center justify-start h-fit w-fit
            flex-grow-0 flex-shrink-0 '>
            <div className='sm:w-[120px] md:w-[150px] lg:w-[180px] aspect-[18/25] '>
              <img src={`${baseUrl}${person.profile_path}`}
                alt=''
                loading='lazy'
                width='200px' height='300px'
                className='w-full 
                select-none rounded-md bg-cover' />
            </div>
            <div className='h-fit flex flex-col   
            items-center justify-center'>
               <div className='sm:w-[120px] md:w-[150px] lg:w-[180px] h-fit flex justify-center'>
                <p className='font-semibold  truncate'>{person.name}</p>
              </div>
              <div className='sm:w-[120px] md:w-[150px] lg:w-[180px] h-fit flex justify-center'>
                <p className='font-light italic truncate'>{person.character}</p>
              </div>
            </div>
          </Link>))}
        </div>
      </div>
    </div>
  )
}

export default PeopleCarousel
