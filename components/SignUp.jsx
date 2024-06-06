"use client";
import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import FilmVerse from 'public/logo.png';
import google from 'public/googleIcon.svg';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '@/services/firebaseSDK';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
export default function SignUp() {
  const [eyeslash1, setEyeOpen1] = useState(true);
  const [eyeslash2, setEyeOpen2] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const signup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='sm:w-[90%] md:max-lg:w-[70%] lg:w-[500px] text-white
      flex flex-col items-center justify-start rounded-md h-fit
      bg-neutral-800 backdrop-filter backdrop-blur-sm bg-opacity-70 gap-3 px-2 pb-3'>
      <div className='w-full h-fit py-5 flex justify-center items-center
        border-b-solid border-b border-b-slate-400'>
        <Image src={FilmVerse} width={200} height={30} alt='logo'/>
      </div>
      <div className='w-full h-[50px] rounded-md bg-neutral-700'>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='w-full h-full outline-none px-2 bg-transparent placeholder:text-white'
        />
      </div>
      <div className='w-full flex items-center h-[50px] rounded-md bg-neutral-700'>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={eyeslash1 ? "password" : "text"}
          placeholder='Enter your password'
          className='flex-1 flex h-full outline-none px-2 bg-transparent placeholder:text-white'
        />
        <i onClick={() => setEyeOpen1((prev) => !prev)}
          className='w-[60px] h-full flex items-center justify-center cursor-pointer'>
          {eyeslash1 ? (<EyeSlashIcon className='w-5 h-5'/>) : (<EyeIcon className='w-5 h-5'/>)}
        </i>
      </div>
      <div className='w-full flex items-center h-[50px] rounded-md bg-neutral-700'>
        <input
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={eyeslash2 ? "password" : "text"}
          placeholder='Confirm your password'
          className='flex-1 flex h-full outline-none px-2 bg-transparent placeholder:text-white'
        />
        <i onClick={() => setEyeOpen2((prev) => !prev)}
          className='w-[60px] h-full flex items-center justify-center cursor-pointer'>
          {eyeslash2 ? (<EyeSlashIcon className='w-5 h-5'/>) : (<EyeIcon className='w-5 h-5'/>)}
        </i>
      </div>
      <button
        onClick={() => signup()}
        disabled={!email || !password || !confirmPassword}
        className='disabled:opacity-40 w-full h-[45px] flex items-center 
        justify-center bg-red-400 text-white rounded-md select-none'>
        Sign up
      </button>
      <div className="flex items-center w-full justify-center gap-2">
        <span className="flex-[0.49] border-t border-t-solid border-t-slate-400"></span>
        <span className="w-fit h-fit">Or</span>
        <span className="flex-[0.49] border-t border-t-solid border-t-slate-400"></span>
      </div>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}
        className='w-full h-[50px] rounded-md bg-brown-700 flex items-center justify-center gap-1'>
        <Image src={google} width={30} height={30} alt="google icon" /> Continue with Google
      </button>
      <div className='flex w-full h-fit justify-between sm:text-xs md:text-sm'>
        <div className='flex w-fit h-fit gap-1'>
          <p>Already have an account?</p>
          <Link href="/sign-in" className='text-red-400'>Sign in</Link>
        </div>
        <Link className='text-red-400' href="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
}
