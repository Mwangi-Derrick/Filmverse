import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import {FaGithub,FaInstagram,FaLinkedin} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6';
function Footer() {
  const footerLinks = [{ name: 'home', href: '/' },
    { name: 'movies', href: '/movies' },
    { name: 'tv-shows', href: '/tv-shows' },
    { name: 'about', href: '/about' },
    {name:'watchlist',href:'/watchlist'}
  ]
  
  const tmdbLogo = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
  return (
    <footer className='w-screen h-fit flex flex-col items-center justify-center
    bg-transparent border-t border-solid border-t-slate-500 z-10 bg-opacity-80
     gap-3 py-6 mt-10
     text-slate-300'>
      <div className='w-full h-fit flex justify-center uppercase gap-3'>
        {footerLinks.map(link => (<Link
          className='font-normal text-base capitalize'
          href={`${link.href}`}>{link.name}</Link>))}
      </div>
      <div className='flex w-fit h-fit items-center'>
        <p className='pr-2 text-sm'>Powered by</p>
        <Link href={'https://www.themoviedb.org'} target='_blank'>
        <Image src={tmdbLogo} width={120} height={20} alt="TMDB website logo"/></Link>
      </div>
      <div className='width-[90%] h-fit flex justify-center text-sm'>
        <p>&copy; {`${new Date().getFullYear()} Filmverse` }</p>
      </div>
      <div className='w-fit h-fit gap-3 flex items-center justify-center'>
        <Link href='https://www.github.com/Mwangi-Derrick/Filmverse' target='_blank'>
          <FaGithub className='hover:text-slate-100 cursor-pointer' size='22px' />
        </Link>
        <Link href='https://www.linkedin.com/in/derrick-mwangi-bab062276/' target='_blank'>
        <FaLinkedin className='hover:text-slate-100 cursor-pointer' size='22px' />
        </Link>
        <Link href='https://www.instagram.com/d.err.o_' target='_blank'>
          <FaInstagram className='hover:text-slate-100 cursor-pointer' size='22px' />
        </Link>
        <Link href='https://www.twitter.com/Derrick22668801' target='_blank'>
          <FaXTwitter className='hover:text-slate-100 cursor-pointer' size='22px' />
        </Link>
      </div>
    </footer>
  )
}

export default Footer