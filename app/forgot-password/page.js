"use client";
import { useState } from 'react';
import Image from "next/image";
import FilmVerse from "public/logo.png";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "@/services/firebaseSDK";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const resetEmail = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      alert('Password reset email sent');
      router.push('/sign-in');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return ( <div style={{ backgroundImage: `url("/login.jpg")` }}	
  className='w-full h-screen flex items-center justify-center pt-[60px] 
bg-cover bg-center bg-no-repeat'>
    <div className="sm:w-[90%] md:max-lg:w-[70%] lg:w-[500px] text-white
    flex flex-col items-center justify-start rounded-md h-fit
    bg-neutral-800 backdrop-filter backdrop-blur-sm bg-opacity-70 gap-3 px-2 pb-3">
      <div className="w-full h-fit py-5 flex justify-center items-center
      border-b-solid border-b border-b-slate-400">
        <Image src={FilmVerse} width={200} height={30} alt="logo"/>
      </div>
      <div className="w-full h-[50px] rounded-md bg-neutral-700">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full h-full outline-none px-2 bg-transparent placeholder:text-white"
        />
      </div>
      <button
        onClick={resetEmail}
        disabled={!email}
        className="disabled:opacity-40 w-full h-[45px] flex items-center 
        justify-center bg-red-400 text-white rounded-md select-none"
      >
        Send Forgot Password Email
      </button>
      <div className="flex w-full h-fit justify-between sm:text-xs md:text-sm">
        <div className="flex w-fit h-fit gap-1">
          <p>Remember your password?</p>
          <Link href="sign-in" className="text-red-400">Sign in</Link>
        </div>
        <Link className="text-red-400" href="sign-up">Create a new account</Link>
      </div>
    </div>
    </div>
  );
}
