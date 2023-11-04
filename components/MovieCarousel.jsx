"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import MovieCard from './MovieCard';

function MovieCarousel({ data,title,genreId }) {

  const carouselRef = useRef(null);
  const [scrollButton, setScrollBtn] = useState('none');
  const [movies, setMovies] = useState(data)
  useEffect(()=>{setMovies(data)},[data])
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
  /* The movieCarouselScrollable function returns a boolean depending on the scroll width and the client width of the scroll conatainer.
   This is later used to render the scroll buttons whenever the scroll conatiner
    is scrollable ie.whenever there are hidden overflowing elements*/
  const movieCarouselScrollable = () => {
    if (carouselRef.current) {
      return carouselRef.current.scrollWidth > carouselRef.current.clientWidth
    }
  };
  const genreTitle = `${title}`
  let genreHref = genreTitle.replace(/\s+/g,"-")
  /*an array that contains subtrings of the  title of the carousel, i.e we want to check 
  if the title starts with the substrings,so as to remove the show more link where appropriate*/
const possibleStartsWith = ['movies','topRated','trending','nowPlaying','popular','upcoming']
  const strCondition = possibleStartsWith.some((substring)=>genreHref.startsWith(substring))
  return (
    <div className='text-white lg:w-[90%] sm:max-lg:w-full h-fit mx-auto flex flex-col 
    my-5'>
      <div className='px-[10px] py-2 lg:h-[60px] flex items-center justify-between
      '><h2 className='lg:text-3xl font-medium capitalize'
        >{title}</h2> 
        {/*conditionally render the show more link based on the starting substring value of 
        the carousel tilte ie.to render the link only for the carousels that contain movie genres */}
        {!strCondition &&(
          <Link 
            href={`/movies/${genreHref}-${genreId}/`} className='w-fit h-fit 
          flex items-center sm:max-lg:text-[11px] font-semibold group/genreLink'>
            Show more<i className='flex items-center justify-between w-fit h-fit px-1'>
              <ChevronRightIcon
                className='lg:h-5 lg:w-5 sm:max-lg:w-3 transition-all duration-900
                ease-in-out group-hover/genreLinkhover:scale-y-[1.1]
                 group-hover/genreLinkhover:scale-x-[1.1] 
                 group-hover/genreLink:translate-x-1 group-hover/genreLink:text-red-500
                 sm:max-lg:h-3 stroke-current stroke-1' /></i>
          </Link>)}
      </div>
<div className='w-full h-fit group relative'>
      {/*conditionally render the scrollbuttons based on the scrollPositon 
      and the number of  items in the scroll container*/}
      {((scrollButton === 'left' || scrollButton === 'both') && movieCarouselScrollable()) && (
        <button onClick={scrollLeft} className='w-[60px] h-[60px] bg-white
          items-center sm:hidden lg:group-hover:flex
         justify-center absolute rounded-[50%] top-[35%] left-[-30px]
         cursor-pointer '>
          <ChevronLeftIcon className='w-7 h-7 font-extrabold stroke-current stroke-1 text-black' />
        </button>
      )}
      {((scrollButton === 'right' || scrollButton === 'both') && movieCarouselScrollable() ) && (
        <button onClick={scrollRight} className='w-[60px] h-[60px] bg-white
        absolute  top-[35%] right-[-30px] sm:hidden lg:group-hover:flex 
         items-center rounded-[50%] justify-center cursor-pointer '>
          <ChevronRightIcon className='w-7 h-7 font-extrabold stroke-current stroke-1  text-black' />
        </button>
      )}
      <div 
        className='flex flex-row w-[100%] h-fit lg:overflow-x-hidden overflow-y-hidden 
        px-[5px] items-start justify-start snap-x snap-mandatory no-scrollbar ' ref={carouselRef}>
        {movies && movies.map((item) => (
          <MovieCard key={item.id} poster={item.poster_path} movieId={item.id} movieTitle={item.title} />
        ))}
      </div></div>
    </div>
  );
}

export default MovieCarousel;
