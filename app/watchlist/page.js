import React from 'react'
export const metadata = {
   title: "Watchlist",
   description:" At Fimverse, we understand the importance of movies and TV shows in your life"
 }
import Watchlist from '@/components/Watchlist';
function page() {
   return (
      <div className='flex flex-col items-start justify-start pt-[100px] px-12 gap-2 w-screen min-h-screen'>
         <Watchlist/>
      </div>
     )
     
    }
    
    export default page