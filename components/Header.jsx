"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import Image  from "next/image";
import Link from "next/link";
import filmverse  from "../public/logo.png";
import {
  MagnifyingGlassIcon, XMarkIcon, Bars3Icon, FilmIcon,ChevronLeftIcon,TvIcon, UserCircleIcon, HomeIcon
} from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";
import { SidebarContext } from "@/app/mobilesidebar_context";
function Header() {
  return (
    <header 
      className="w-screen h-[60px] z-[99]
     flex items-center justify-start fixed top-0 
     transition-colors duration-1000 ease-in-out
     shadow-sm shadow-neutral-800/50
      " >
      <Navbar />
    </header>
  );
}
function Navbar() {
  const { Sidebarvisible, setSidebarVisible } = useContext(SidebarContext);
  const path = usePathname();
  const tv_shows = path.startsWith('/tv-shows')
  const movies = path.startsWith('/movies')
  const [expandSearchBox, setExpandSearchBox] = useState(false)
  const [scrollPstn,setScrollY] = useState("")
  const setSearchboxState = (state) => {
    setExpandSearchBox(state)
  }
  console.log(Sidebarvisible)
  const disappearStyle = {
    display:expandSearchBox?"none":""
  }
  console.log(path.split("/"))
  console.log(scrollPstn)
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", updateScrollPosition)
    return ()=>{window.removeEventListener("scroll",updateScrollPosition)}
  }, [])
  const navbarStyles = () => {
     //This variable stores the pathname as string movies or movie when the user is in the movies and movie route respectively
   const movieOrmovies = path.split("/")[1]
    if (path === "/" && scrollPstn > 450) { return { backgroundColor: "#171717" } }
    else if (movieOrmovies === "movie" && scrollPstn > 400) { return { backgroundColor: "#171717" } }
    else if (path.startsWith("/show") && scrollPstn > 400) { return { backgroundColor: "#171717" } }
    else if (path === "/" || movieOrmovies === "movie" || path.startsWith("/show") && scrollPstn < 400){return {backgroundColor:"transparent"}}
    else{return {backgroundColor:"#171717"}}
  }
  return (
    <nav style={navbarStyles()}
      className="w-[100%] h-fit flex px-3 transition-colors duration-1000 ease-in-out
    items-center lg:justify-start sm:justify-between backdrop-blur-sm backdrop-brightness-[60%]"
    >
      <div className="lg:w-[200px] mr-[10px] h-[60px] flex items-center justify-between">
        <button style={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          className="py-[16px] lg:px-[26px] sm:px-1"> 
          {!expandSearchBox?(
            <Bars3Icon onClick={()=>{setSidebarVisible(true)}}
              className='h-7 w-7 relative outline-none text-white' />) :
            (<ChevronLeftIcon
              onClick={() => { setExpandSearchBox(false) }} className="h-6 w-6 relative
              outline-none text-white"/>)
          }</button>
    <Link style={disappearStyle} href="/" >
      <Image src={filmverse} width={200} height={60} className="sm:max-md:w-[200px]"  alt=""/>
    </Link>
  </div>
          <Searchbox setState={setSearchboxState} boxState={expandSearchBox} />
      <div style={disappearStyle} className="h-[60px] w-fit flex 
        items-center justify-between flex-row text-white">
        <Link href='/'  
          className={`${path === '/' ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          h-full w-[65px] px-1 flex flex-col items-center
           justify-center hover:border-b-red-500
           border-b-[2px] border-b-solid
          transition-colors duration-700 ease-in-out
          border-solid
          hover:text-red-500`}>
          <HomeIcon className='w-5 h-5' />
          <p className="sm:max-lg:text-[10px] text-[12px] py-1">Home</p>
        </Link>
        <Link 
          className={`${tv_shows ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          h-full w-[65px] px-1 flex flex-col items-center
           justify-center hover:border-b-red-500
           border-b-[2px] border-b-solid
          transition-colors duration-700 ease-in-out
          border-solid
          hover:text-red-500`}
          href="/tv-shows">
          <TvIcon className="w-5 h-5"/>
            <p className="sm:max-lg:text-[10px] text-[12px] py-1">TV shows
              </p>
          </Link>
        <Link 
          className={`${movies ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          flex flex-col items-center justify-center h-full w-[65px] px-1
          transition-colors duration-700 ease-in-out hover:border-b-red-500
          border-b-[2px] border-b-solid
          border-solid
          hover:text-red-500`}
          href="/movies">
          <FilmIcon className="w-5 h-5"/>
                <p className="sm:max-lg:text-[10px] text-[12px] py-1">Movies</p>
          </Link>
            </div>
      <section style={disappearStyle}
        className="h-[60px] flex lg:flex-1 lg:pr-[200px] items-center justify-start">
        <Link href='/sign-in' className=" h-full flex flex-col cursor-pointer px-1
        border-b-[2px] border-b-solid border-b-transparent items-center justify-center text-white">
          <UserCircleIcon className="w-5 h-5"/>
          <p className="sm:max-lg:text-[10px] text-[12px] py-1">Sign In</p>
        </Link>
      </section>
    </nav>
  );
}

const Searchbox = ({ setState, boxState }) => {
  
  let [inputValue, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  const clearInput = () => {
    setInput("");
  };
  const closeIcon = inputValue !== "";
  const searchBoxWidth = {
    width: boxState ? "85vw" : "",
    marginLeft: boxState ? 0 : "",
    marginRight: boxState ? 15 : "",
    paddingRight: boxState ? 10 : ""
  }
  const [width, setWidth] = useState("");
  useEffect(() => {
    function trackWidth() {
        setWidth(window.innerWidth)
        if(width > 960){setState(false)}
    }
    window.addEventListener('resize',trackWidth )
    return ()=> {window.removeEventListener('resize',trackWidth)}
  })
  const [searchData,setSearchResults] = useState(null)
  useEffect(() => {
    async function searchData() {
      const delay = (ms) => { new Promise((resolve) => { setTimeout(resolve, ms) }) }
      const key = "31893f5365efe0cdf393794446aae7a6"
      delay(2000)
      const results = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${inputValue}`);
      const data = await results.json();
      const searchList = data.results;
      setSearchResults(searchList.filter((result)=>result.media_type !== "person"))
      console.log(searchList)
      return ()=>{setSearchResults(null)}
    }
    searchData();
  }, [inputValue])
  const searchResultsRef = useRef(null)
  const searchBoxRef = useRef(null)
  useEffect(() => {
    const handeleSearchList = (e) => {
      if (e.target !== searchResultsRef.current && e.target!==searchBoxRef.current)
      { searchResultsRef.current.style.display = "none" }
    }
    window.addEventListener("click", handeleSearchList)
    return()=>{window.removeEventListener("click",handeleSearchList)}
  }, [])
  console.log(inputValue)
  return (<div className="flex flex-col
   h-fit w-fit items-center" >
      <section style={searchBoxWidth} ref={searchBoxRef}
        className="bg-neutral-800 flex items-center justify-between h-[40px] sm:w-[40px] lg:w-[380px] 
    lg:rounded-md sm:rounded-full bg-opacity-60 backdrop-blur-sm
    border-neutral-700 lg:mx-[40px] sm:mx-[10px] lg:px-4 relative">
      <button style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
        onClick={() => { setState(true) }} disabled={width > 960}
          className="sm:max-lg:w-[40px] sm:max-lg:h-[40px] flex items-center
     sm:max-lg:cursor-pointer justify-center ml-3 outline-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-white" /></button>
        <input
          onChange={handleInput}
            value={inputValue}
          type="text"
          placeholder="Search for movies or Tv shows"
          className="bg-transparent outline-none w-full text-white px-3"
        />
        {closeIcon && (
          <XMarkIcon
            onClick={clearInput}
            className="w-6 h-6 text-white cursor-pointer"
          />
        )}
      </section>
    {searchData && (<ul ref={searchResultsRef}
      style={{ display: inputValue === "" ? "none" : "" }}
      className="w-[450px] bg-neutral-900 
      absolute top-[95%] bg-opacity-90 divide-y divide-solid divide-zinc-950 

      overflow-y-scroll rounded-md 
      border-t-solid border-t-black border-t-4
      sm:max-lg:w-[100vw] sm:max-lg:left-0 sm:max-lg:h-screen
      lg:h-[400px]
    ">
      { searchData && searchData.map((list, index) => (
        <SearchResults key={index}
          textHighlight={inputValue}
          clear={setInput}
          media={list.media_type}
          imagePath={list.poster_path}
          releaseDate={list?.release_date || list?.first_air_date}
          name={list.title || list.original_title || list.name}
          id={list.id} />
      )
      )}
      {searchData && searchData.length === 0 && (<li className="w-full h-[50px]
       uppercase flex justify-center text-base text-white font-semibold items-center">
        can't find {`"${inputValue}"`}
      </li>)}
    </ul>)
    }
    </div>
    )
  }

export default Header;
