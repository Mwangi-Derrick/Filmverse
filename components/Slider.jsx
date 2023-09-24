"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function Slider() {
  const [trending, setTrending] = useState(null);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
  useEffect(() => {
    async function fetchTrendingAll() {
      const Key = "31893f5365efe0cdf393794446aae7a6";
      const results = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${Key}`
      );
      const data = await results.json();
      setTrending(data.results.sort(() => Math.random() - 0.5).splice(0, 10));
    }
    fetchTrendingAll();
  }, []);
  const sliderRef = useRef(null)
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.clientWidth 
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.clientWidth 
    }
  };
  const generateTitle = (item) => {
    if (item.media_type === "tv") {
      return item.name;
    }
    if (item.media_type === "movie") {
      return item.title;
    }
  };
  
  const getYear = (show) => {
    const date = (aired) => {
      if (aired.media_type === "tv") { return aired.first_air_date }
      if (aired.media_type === "movie") { return aired.release_date }
    }
    const year = new Date(date(show)).toLocaleDateString("en-US", { year: "numeric" })
    return year;
  }
  const generateLink = (show, id) => {
    const title = generateTitle(show)
    const formattedTitle = title.replace(/\s+/g, "-")
    if (show.media_type === "movie") { return `/movie/${id}-${formattedTitle}` }
    if (show.media_type === "tv") { return `/tv/${id}-${formattedTitle}` }
  }
  return (
    <div className="w-screen h-[450px] bg-transparent relative">
      <div  
        className="w-[80px] h-full flex flex-col items-center justify-center absolute left-0
      sm:max-lg:hidden">
        <button onClick={previous}
          className="w-10 h-10 rounded-full border-solid
         border-slate-300 border flex items-center justify-center text-white">
          <ChevronLeftIcon className="stroke-current stroke-2 h-5 w-5" />
        </button>
      </div>
      <div 
        className="w-[80px] h-full flex flex-col items-center justify-center absolute right-0
      sm:max-lg:hidden">
        <button onClick={next}
          className="w-10 h-10 rounded-full border-solid border-slate-300
         border flex items-center justify-center text-white">
          <ChevronRightIcon className="stroke-current stroke-2 h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-row snap-x snap-mandatory
      w-full h-full overflow-scroll scroll-smooth no-scrollbar" ref={sliderRef}>
        {trending && trending.map((slide) => (<div key={slide.id}
          style={{
            backgroundImage: `url(${baseImageUrl}${slide.backdrop_path})`
          }}
          className="w-full h-full bg-no-repeat bg-center bg-cover snap-start
          flex items-center justify-center basis-full
         flex-grow-0 flex-shrink-0 text-white">
          <div className="flex flex-col lg:w-3/4 items-start justify-start sm:max-lg:w-full px-5">
            <h3 className="lg:text-5xl sm:text-3xl font-semibold pb-2">{generateTitle(slide)}</h3>
            <div className="w-full h-fit flex justify-start lg:text-base
            sm:text-sm font-medium">
              <p>{slide.media_type === "tv" ? "TV show" : slide.media_type}.</p>
              <p>{getYear(slide)}</p>
            </div>
            <Link href={generateLink(slide, slide.id)}>
              <button className="lg:text-base md:text-sm sm:text-[12px]
               font-semibold md:w-[130px] sm:max-md:w-[100px] h-[35px] bg-red-500
           mt-3 rounded-full flex items-center justify-center">Watch Now</button></Link>
          </div>
        </div>))}
      </div>
    </div>
  );
}

export default Slider;
