import React from 'react'
export const metadata = {
  title: "About",
  description:" At Fimverse, we understand the importance of movies and TV shows in your life"
}
export default function page() {
  
  return (
    <div 
      className='flex flex-col items-center pt-[30px]
    justify-start text-white flex-1'>
      <article className='w-[90%] h-fit pt-[80px]'>
        <h1 className='lg:text-3xl sm:text-xl pb-4 font-semibold'>About Us</h1>
      <p className='lg:text-xl sm:text-sm'>Welcome to Fimverse - your ultimate destination for all things movies and TV shows.
        We're passionate about entertainment, and our mission
        is to make your viewing experience exceptional and hassle-free.
        At Fimverse, we understand the importance of movies and TV shows in your life.
        Whether you're a die-hard cinephile, a TV series addict, or just looking for something to unwind with, we've got you covered.
        Our platform is designed with you in mind, offering a vast library of content spanning various genres, eras, and languages. </p>
      </article>
    </div>
  )
}
