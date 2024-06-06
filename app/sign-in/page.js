import React from "react";
import SignIn from "@/components/SignIn";
export default function page() {
  
  return (
    <div style={{ backgroundImage: `url("/login.jpg")` }}	
      className='w-full h-screen flex items-center justify-center pt-[60px] 
   bg-cover bg-center bg-no-repeat'>
    <SignIn/>
    </div>
  )
}
