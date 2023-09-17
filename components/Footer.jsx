import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function Footer() {
  const footerLinks = [{ name: 'home', href: '/' },
    { name: 'movies', href: '/movies' },
    { name: 'tv-shows', href: '/tv-shows' },
    { name: 'about', href: '/about' },
    {name:'watchlist',href:'/watchlist'}
  ]
  const date = new Date();
  const year = date.getFullYear();
  const tmdbLogo = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
  return (
    <footer className='w-screen h-fit flex flex-col items-center justify-center
     bg-neutral-900 z-10 bg-opacity-80
     gap-1 py-5
     text-white'>
      <div className='w-full h-fit flex justify-center uppercase gap-2'>
        {footerLinks.map(link => (<Link
          className='text-white font-semibold sm:text-sm lg:text-base'
          href={`${link.href}`}>{link.name}</Link>))}
      </div>
      <div className='flex w-fit h-fit items-center'>
        <p className='pr-2 text-[18px] text-slate-400'>Powered by</p>
        <Link href={'https://www.themoviedb.org'} target='_blank'>
        <Image src={tmdbLogo} width={150} height={30}/></Link>
      </div>
      <div className='width-[90%] h-fit flex justify-center'>
        <p>&copy; {`${year} Filmverse` }</p>
      </div>
    </footer>
  )
}

export default Footer