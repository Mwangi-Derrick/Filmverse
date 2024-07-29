"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import filmverse from "../public/logo.png";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react';

import {
  MagnifyingGlassIcon, XMarkIcon, Bars3Icon, FilmIcon,ArrowLeftIcon,TvIcon, UserCircleIcon, HomeIcon, ArrowRightOnRectangleIcon
} from "@heroicons/react/24/solid";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import SearchResults from "./SearchResults";
import { SidebarContext } from "@/app/mobilesidebar_context";

function Header() {
  const pathname = usePathname();
  return (
    <header  style={{ display: ["/sign-in", "/sign-up", "/forgot-password"].includes(pathname) ? "none" : "flex" }}
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
  const [scrollPstn, setScrollY] = useState()
  const setSearchboxState = (state) => {
    setExpandSearchBox(state)
  }
  const disappearStyle = {
    display: expandSearchBox ? "none" : ""
  }
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", updateScrollPosition)
    return () => { window.removeEventListener("scroll", updateScrollPosition) }
  }, [])
  const navbarStyles = () => {
    //This variable stores the pathname as string movies or movie when the user is in the movies and movie route respectively
    const movieOrmovies = path.split("/")[1]
    if (path === "/" && scrollPstn > 450) { return { backgroundColor: "#0c0a09" } }
    else if (movieOrmovies === "movie" && scrollPstn > 400) { return { backgroundColor: "#0c0a09" } }
    else if (path.startsWith("/show") && scrollPstn > 400) { return { backgroundColor: "#0c0a09" } }
    else if (path === "/" || movieOrmovies === "movie" || path.startsWith("/show") && scrollPstn < 400) { return { backgroundColor: "transparent" } }
    else { return { backgroundColor: "#0c0a09" } }
  }
  const session = useSession();
  const profileDropDownRef = useRef(null);
  const profileRef = useRef(null);
  
  const [profileDropDownVisible, setProfileDropDownVisible] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropDownRef.current && !profileDropDownRef.current.contains(event.target)) {
        setProfileDropDownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  const handleSignOut = () => {
    signOut();
  };
  return (
    <nav style={navbarStyles()}
      className="w-[100%] h-fit flex px-3 transition-colors duration-1000 ease-in-out
    items-center lg:justify-start backdrop-blur-sm backdrop-brightness-[60%]
    sm:justify-between"
    >
      <div className="lg:w-[200px] mr-[10px] h-[60px] flex items-center justify-between">
        <button style={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          className="py-[16px] lg:px-[26px] sm:px-1"> 
          {!expandSearchBox?(
            <Bars3Icon onClick={()=>{setSidebarVisible(true)}}
              className='h-7 w-7 relative outline-none text-white' />) :
            (<ArrowLeftIcon
              onClick={() => { setExpandSearchBox(false) }} className="h-6 w-6 relative
              outline-none text-white stroke-current stroke-1"/>)
          }</button>
    <Link style={disappearStyle} href="/" >
          <Image src={filmverse} width={200} height={60} className="sm:max-md:w-[110px]"  alt="logo"/>
    </Link>
  </div>
          <Searchbox setState={setSearchboxState} boxState={expandSearchBox} />
      <div style={disappearStyle} className="h-[60px] w-fit flex 
        items-center justify-between flex-row text-white">
        <Link href='/'  
          className={`${path === '/' ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          h-full w-[65px] px-1 flex flex-col items-center
           justify-center hover:border-b-red-500 group/home
           border-b-[2px] border-b-solid sm:max-lg:hidden
          transition-colors duration-700 ease-in-out
          border-solid
          hover:text-red-500`}>
          <div className="h-fit flex flex-col items-center">
            <HomeIcon className='w-6 h-6' />
            <p className="absolute bottom-[-30px] w-fit h-fit p-1 px-3 text-white bg-slate-800 rounded-md hidden group-hover/home:block sm:max-lg:text-[10px] text-[12px] py-1">Home</p>
          </div>
        </Link>
        <Link 
          className={`${movies ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          flex flex-col items-center justify-center h-full w-[65px] px-1
          transition-colors duration-700 ease-in-out hover:border-b-red-500
          border-b-[2px] border-b-solid group/movie
          border-solid sm:max-lg:hidden
          hover:text-red-500`}
          href="/movies"><div  className="h-fit flex flex-col items-center">
          <FilmIcon className="w-6 h-6"/>
                <p className="absolute bottom-[-30px] w-fit h-fit p-1 px-3 text-white bg-slate-800 rounded-md hidden group-hover/movie:block sm:max-lg:text-[10px] text-[12px] py-1">Movies</p></div>
          </Link>
        <Link 
          className={`${tv_shows ? "border-b-red-500 text-red-500" : "border-b-transparent"}
          h-full w-[65px] px-1 flex flex-col items-center
           justify-center hover:border-b-red-500
           border-b-[2px] border-b-solid sm:max-lg:hidden
          transition-colors duration-700 ease-in-out
          border-solid group/tv
          hover:text-red-500`}
          href="/tv-shows"> <div className="h-fit flex flex-col items-center">
          <TvIcon className="w-6 h-6"/>
            <p className="absolute bottom-[-30px] w-fit h-fit p-1 px-3 text-white bg-slate-800 rounded-md hidden group-hover/tv:block sm:max-lg:text-[10px] text-[12px] py-1">TV shows
              </p></div>
          </Link>
            </div>
      <section style={disappearStyle}
        className="h-[60px] flex lg:flex-1 lg:pr-[40px] items-center justify-end">{
          !session || session.status==="unauthenticated" ?	(
          <div onClick={() => signIn()} className=" h-full flex flex-col cursor-pointer px-1 group/sign-in
        border-b-[2px] border-b-solid border-b-transparent items-center justify-center text-white">
              <div className="flex flex-col items-center h-fit w-fit">
            <UserCircleIcon className="w-6 h-6" />
                <p className="sm:max-lg:text-[10px] text-[12px] bottom-[-30px] rounded-md text-white bg-slate-800 p-1 px-3 absolute hidden group-hover/sign-in:block py-1">Sign In</p>
                </div>
          </div>) : (
              <div onClick={() => setProfileDropDownVisible((prev) => !prev)} ref={profileRef}
                className="h-full flex flex-col items-center justify-center group/profile text-white cursor-pointer">
                <div className="flex flex-col items-center justify-start h-fit w-fit">
                <img className="w-7 h-7 rounded-full" src={session?.data?.user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="profile" />
                  <p 
                    className="sm:max-lg:text-[10px] bottom-[-30px] right-[40px] rounded-md bg-slate-800 p-1 px-3 absolute hidden group-hover/profile:block text-[12px] py-1">
                    {session?.data.user.name || session?.data.user.email}</p>
                  <ul  ref={profileDropDownRef}
                    style={profileDropDownVisible===true ? { display: "block" } : { display: "none" }}
                    className="w-[200px] text-sm h-fit rounded-md flex-col
                     items-center p-2 absolute bottom-[-120px] right-7 bg-slate-800
                      hidden text-white text-[10px]">
    <li className="flex items-center justify-start p-4 w-full gap-2 rounded-md hover:bg-slate-700">
      <Cog6ToothIcon className="w-6 h-6" /><span>settings</span></li>
                    <li onClick={handleSignOut}
                      className="flex items-center justify-start p-4 h-fit w-full gap-2 rounded-md hover:bg-slate-700">
      <ArrowRightOnRectangleIcon className="w-6 h-6" /><span>sign out</span></li>
  </ul>
                </div>
            </div>
          )
        } 
      </section>
    </nav>
  );
}

const Searchbox = ({ setState, boxState }) => {
  
  let [inputValue, setInput] = useState("");
  const closeIcon = inputValue !== "";
  const searchBoxWidth = {
    width: boxState ? "85vw" : "",
    marginLeft: boxState ? 0 : "",
    marginRight: boxState ? 15 : "",
    paddingRight: boxState ? 10 : ""
  }
  //set the default width state to 1024 pixels to account for desktops and laptops
  const [width, setWidth] = useState(1024);
  useEffect(() => {
    function trackWidth() {
      setWidth(window.innerWidth)
      if (width > 960) { setState(false) }
    }
    window.addEventListener('resize', trackWidth)
    return () => { window.removeEventListener('resize', trackWidth) }
  })
  const [searchData, setSearchResults] = useState([])

  async function fetchSearchResults(input) {
    const delay = (ms) => { new Promise((resolve) => { setTimeout(resolve, ms) }) }
    const key = "31893f5365efe0cdf393794446aae7a6"
    delay(2000)
    const results = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${input}`);
    const data = await results.json();
    const searchList = data.results;
    const filteredSearch = searchList.filter((result) => result.media_type !== "person")
    return setSearchResults(filteredSearch) 
  }

  const handleInput = async(e) => {
    setInput(e.target.value);
  await fetchSearchResults(e.target.value)
  };
  const handleSearchOnFocus = async (e) => {
    if (e.target !== "") {
     await fetchSearchResults(e.target.value)
    }
  }
  const clearInput = () => {
    setInput("");
  };
  const searchResultsRef = useRef(null)
  const searchBoxRef = useRef(null)
  useEffect(() => {
    const handleSearchList = (e) => {
      if (searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target) &&
        !searchBoxRef.current.contains(e.target))
      { setSearchResults([]) }
    }
    window.addEventListener("click", handleSearchList)
    return()=>{window.removeEventListener("click",handleSearchList)}
  }, [])
  return (<div className="flex flex-col
   h-fit w-fit items-center" >
      <section style={searchBoxWidth} ref={searchBoxRef}
        className="bg-neutral-900 flex items-center justify-between h-[40px] sm:w-[40px] lg:w-[380px] 
    lg:rounded-md sm:rounded-full bg-opacity-60 backdrop-blur-sm
    border-neutral-700 lg:mx-[40px] sm:mx-[10px] lg:px-4 relative">
      <button style={{ WebkitTapHighlightColor:"rgba(0,0,0,0)"}}
        onClick={() => { setState(true) }} disabled={width > 1023}
          className="sm:max-lg:w-[40px] sm:max-lg:h-[40px] flex items-center
     sm:max-lg:cursor-pointer justify-center ml-3 outline-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-white stroke-current stroke-1" /></button>
        <input
        onChange={handleInput}
        onFocus={handleSearchOnFocus}
            value={inputValue}
          type="text"
          placeholder="Search for movies or Tv shows"
          className="bg-transparent outline-none w-full text-white px-3"
        />
        {closeIcon && (
          <XMarkIcon
            onClick={clearInput}
            className="w-6 h-6 text-white cursor-pointer stroke-1 stroke-current"
          />
        )}
      </section>
    {searchData.length>0 && (<ul ref={searchResultsRef}
      style={{ display: inputValue === "" ? "none" : "" }}
      className="w-[450px] bg-neutral-900 
      absolute top-[95%] bg-opacity-90 divide-y divide-solid divide-zinc-950 
      overflow-y-scroll rounded-md 
      border-t-solid border-t-black border-t-4
      sm:max-lg:w-[100vw] sm:max-lg:left-0 sm:max-lg:h-screen
      lg:h-[400px]
    ">
      { searchData.length>0 && searchData.map((list, index) => (
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
      {searchData &&  searchData.length === 0 && (<li className="w-full h-[50px]
       uppercase flex justify-center text-base text-white font-semibold items-center">
        can't find {`"${inputValue}"`}
      </li>)}
    </ul>)
    }
    </div>
    )
  }

export default Header;