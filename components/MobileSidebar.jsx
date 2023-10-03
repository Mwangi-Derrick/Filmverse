"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useContext } from "react";
import { SidebarContext } from "../app/mobilesidebar_context";

export default function MobileSidebar() {
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
                  className="stroke-current stroke-1 w-8 h-8" />
      </div>
      <div className="flex-1 w-full flex flex-col items-center gap-3 justify-center">
        <Link onClick={reset} href={"/"}>HOME</Link>
        <Link onClick={reset} href={"/movies"}>MOVIES</Link>
        <Link onClick={reset} href={"/tv-shows"}>TV-SHOWS</Link>
        <Link onClick={reset} href={"/about"}>ABOUT</Link>
        <Link onClick={reset} href={"/watchlist"}>WATCHLIST</Link>
      </div>
    </aside>
  );
}
