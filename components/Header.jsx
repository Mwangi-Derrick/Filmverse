"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import filmverse from "../public/film.png";
import { MagnifyingGlassIcon, XMarkIcon,Bars3Icon } from "@heroicons/react/24/solid";
function Header() {
  return (
    <header
      className="w-screen h-[60px] bg-neutral-900 z-[99]
     flex items-center justify-start fixed top-0 
      " >
      <Navbar />
    </header>
  );
}
function Navbar() {
  const path = usePathname();
  const tv_shows = path.startsWith('/tv-shows')
  const movies = path.startsWith('/movies')
  
  return (
    <nav
      className="w-[100%] h-[fit-content] flex
    items-center justify-start bg-neutral-900"
    >
      <div className="w-[200px] mr-[10px] h-[60px] flex items-center justify-between">
      <button className="py-[16px] px-[26px]"> 
      <Bars3Icon className='h-7 w-7 relative  text-white'/></button>
    <Link href="/">
      <Image  src={filmverse} alt="filmverse-logo" width={600} height={100} />
    </Link>
  </div>
      <section className="flex w-fit h-[60px] items-center justify-around sm:max-lg:flex-row">
          <Searchbox />
        <div className="h-full w-fit flex items-center justify-between flex-row">
        <Link  className={`
           ${tv_shows ? 'border-b-red-500 border-b-[2px] text-red-500' :
              'border-b-[2px] border-b-transparent text-white'}
          h-full w-[100px] px-1 flex items-center justify-center  hover:border-b-red-500
          transition-all duration-700 ease-in-out
          hover:text-red-500 `}
            href="/tv-shows">
            <p className="flex w-full  font-light">TV-SHOWS
              </p>
          </Link>
          <Link  className={`${movies? 'border-b-red-500 border-b-[2px] text-red-500':'border-b-[2px] border-b-transparent text-white'}
          flex items-center justify-center h-full w-[85px] px-3 
          transition-all duration-700 ease-in-out hover:border-b-red-500
          hover:text-red-500`}
            href="/movies">
                <p className=" font-light">MOVIES</p>
          </Link>
            </div>
      </section>
      <section className="w-fit h-fit">
        <div className="w-[150px] h-[50px] flex items-center justify-center">Profile</div>
      </section>
    </nav>
  );
}

const Searchbox = () => {
  let [inputValue, setInput] = useState("");
  const handleInput = (e) => {
    let input = e.target.value;
    setInput(input);
  };
  const clearInput = () => {
    setInput("");
  };
  const closeIcon = inputValue !== "";
  return (
    <div className="bg-neutral-800 flex items-center justify-between h-[40px] w-[380px] rounded-3xl
    border-neutral-700 mx-[40px] px-4 sm:max-lg:hidden">
       <MagnifyingGlassIcon className="w-5 h-5 text-white" />
       <input
         onInput={handleInput}
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
     </div>
  )
}


export default Header;
