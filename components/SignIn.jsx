"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import FilmVerse from "public/logo.png";
import google from "public/googleIcon.svg";
import Link from "next/link";
export default function SignIn() {
  const [eyeslash, setEyeOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="sm:w-[90%] md:max-lg:w-[70%] lg:w-[500px] text-white
    flex flex-col items-center justify-start rounded-md h-fit
     bg-neutral-800 bg-opacity-70 gap-3 px-2 pb-3"
    >
      <div
        className="w-full h-fit py-5 flex justify-center items-center
       border-b-solid border-b border-b-slate-400"
      >
        <Image src={FilmVerse} width={200} height={30} />
      </div>
      <div className="w-full h-[50px] rounded-md bg-neutral-700">
              <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
          placeholder="Enter your email"
          className="w-full h-full outline-none px-2 bg-transparent placeholder:text-white"
        />
      </div>
      <div className="w-full flex items-center h-[50px] rounded-md bg-neutral-700">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
                  }}
                  value={password}
          type={eyeslash ? "password" : "text"}
          placeholder="Enter your password"
          className="flex-1 flex h-full outline-none px-2 bg-transparent placeholder:text-white"
        />
        <i
          onClick={() => {
            setEyeOpen((prev) => !prev);
          }}
          className="w-[60px] h-full flex items-center justify-center cursor-pointer"
        >
          {eyeslash ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </i>
      </div>
      <div className="w-full h-fit flex justify-end text-red-400 text-sm">
        <Link href="forgot-password">Forgort password?</Link>
      </div>
      <button
        className="w-full h-[45px] flex items-center 
      justify-center bg-red-400 text-white rounded-md select-none"
      >
        Sign in
      </button>
      <div className="flex w-full h-fit justify-center gap-1">
        <p>Don't have an account?</p>
        <Link href="sign-up" className="text-red-400">
          Sign up
        </Link>
      </div>
      <div className="flex items-center w-full justify-center gap-2">
        <span className="flex-[0.48] border-t border-t-solid border-t-slate-400"></span>
        <span className="w-fit h-fit">Or</span>
        <span className="flex-[0.48] border-t border-t-solid border-t-slate-400"></span>
      </div>
      <button className="w-full h-[50px] rounded-md bg-brown-700 flex items-center justify-center gap-1">
        <Image src={google} width={30} height={30} alt="google icon" /> Sign in
        with Google
      </button>
    </form>
  );
}
