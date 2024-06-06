import React from 'react'
import SignUp from "@/components/SignUp";


export default function Signup() {
  return (
    <div style={{ backgroundImage: `url("/login.jpg")` }}	
    className='w-full h-screen flex items-center justify-center pt-[60px] 
 bg-cover bg-center bg-no-repeat'>
<SignUp/>
    </div>
  )
}