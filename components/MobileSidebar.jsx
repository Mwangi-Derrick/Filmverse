"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useContext } from "react";
import { SidebarContext } from "../app/mobilesidebar_context";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
    const path = usePathname();
    const linkStyle = {
        color: "#ef4444",
   }
    const { Sidebarvisible, setSidebarVisible } = useContext(SidebarContext);
    // the reset function restes the sidebar state
    const reset = ()=>{setSidebarVisible(false)}
    return (
        <aside
            className={`${Sidebarvisible ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-1000 ease-in-out
            w - screen h-screen flex flex-col items-center justify-start text-white
            bg-slate-200 bg-opacity-10 backdrop-blur-sm backdrop-brightness-[60%] 
            fixed top-0 left-0 right-0 z-[300]
`}
    >
      <div className="w-full h-fit py-6 flex justify-end px-4">
                <XMarkIcon onClick={() => { setSidebarVisible(false) }}
                  className="stroke-current stroke-1 w-8 h-8 hover:cursor-pointer" />
      </div>
            <div className="flex-1 w-full flex flex-col 
      items-center gap-3 justify-center font-medium">
                <Link style={path ==="/" ? linkStyle:{color:""}}
                    className="lg:hover:text-red-400 cursor-pointer" onClick={reset} href={"/"}>HOME</Link>
                <Link  style={path ==="/movies" ? linkStyle:{color:""}}
                    className="lg:hover:text-red-400 cursor-pointer" onClick={reset} href={"/movies"}>MOVIES</Link>
                <Link  style={path ==="/tv-shows" ? linkStyle:{color:""}}
                    className="lg:hover:text-red-400 cursor-pointer" onClick={reset} href={"/tv-shows"}>TV-SHOWS</Link>
                <Link  style={path ==="/about" ? linkStyle:{color:""}}
                    className="lg:hover:text-red-400 cursor-pointer" onClick={reset} href={"/about"}>ABOUT</Link>
                <Link  style={path ==="/watchlist" ? linkStyle:{color:""}}
                    className="lg:hover:text-red-400 cursor-pointer" onClick={reset} href={"/watchlist"}>WATCHLIST</Link>
      </div>
    </aside>
  );
}
