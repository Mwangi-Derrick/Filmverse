"use client"
import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import FilmVerse from 'public/logo.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/services/firebaseSDK'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation'
export default function SignUp() {
    const [eyeslash1, setEyeOpen1] = useState(true);
    const [eyeslash2, setEyeOpen2] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  // create a signUp function
  const signUp = async(userEmail, userPwd)=>{
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, userEmail, userPwd);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
const handleForm = async (e) => {
  
  const { result, error } = await signUp(email, password);

  if (error) {
    return alert(error.message);
  }

  // else successful
  else {
    console.log(result)
    return router.push("/")
  }
}

  return (
    <div className='sm:w-[90%] md:max-lg:w-[70%] lg:w-[500px] 
    bg-neutral-800 bg-opacity-70 flex flex-col rounded-md gap-3'>
      <div className='w-full h-fit py-5 flex justify-center items-center
         border-b-solid border-b border-b-slate-400'>
          <Image src={FilmVerse} width={200} height={30} alt='logo'/></div>
      <form onSubmit={handleForm}
        className='text-white w-full
      flex flex-col items-center justify-start h-fit
       gap-3 px-2 pb-3'>
      <label
          htmlFor="email"
          name="email"
          id="email"
        className='w-full h-[50px] rounded-md bg-neutral-700'>
        <input
          required
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder='Enter your email'
            className='w-full h-full outline-none px-2 bg-transparent placeholder:text-white' />
        </label>
      <label
          htmlFor="password"
          name="password"
          id="password"
        className='w-full flex items-center h-[50px] rounded-md bg-neutral-700'>
        <input
            required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
            type={eyeslash1 ? "password": "text"}
            placeholder='Enter your password'
            className='flex-1 flex h-full outline-none px-2 bg-transparent placeholder:text-white' />
          <i onClick={() => { setEyeOpen1((prev) => !prev) }}
              className='w-[60px] h-full flex items-center justify-center cursor-pointer'>
                {eyeslash1 ? (<EyeSlashIcon className='w-5 h-5'/>):(<EyeIcon className='w-5 h-5'/>)}
            </i>
          </label>
        <label htmlFor="confirmPassword"
           name="confirmPassword"
           id="confirmPassword"
        className='w-full flex items-center h-[50px] rounded-md bg-neutral-700'>
        <input 
          required
          value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
            type={eyeslash2 ? "password": "text"}
            placeholder='Confirm your password'
            className='flex-1 flex h-full outline-none px-2 bg-transparent placeholder:text-white' />
          <i onClick={() => { setEyeOpen2((prev) => !prev) }}
              className='w-[60px] h-full flex items-center justify-center cursor-pointer'>
                {eyeslash2 ? (<EyeSlashIcon className='w-5 h-5'/>):(<EyeIcon className='w-5 h-5'/>)}
            </i>
          </label>
        <button
          onClick={handleForm}
          type='submit'
              className='w-full h-[50px] rounded-md bg-red-400 
              flex items-center justify-center'>Sign up</button>
    </form>
    </div>
  )
}
