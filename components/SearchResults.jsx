import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SearchResults({media,id,name,imagePath,releaseDate,clear,textHighlight}) {
    const base_url = "https://image.tmdb.org/t/p/w500/";
  const title = name.replace(/\s+/g,"-")
    function generateHref(mediaType) {
        if (mediaType === "movie") { return `/movie/${id}-${title}` }
        if (mediaType === "tv") {
            return `/show/${id}-${title}`
        }
    }

    const year = new Date(releaseDate).toLocaleDateString("en-US", { year: "numeric" }) 
    const styledSubstring = (string, textHighlight) => {
        const substrIndex = string.toLowerCase().indexOf(textHighlight.toLowerCase());
    
        if (substrIndex !== -1) {
            return (
                <p className='capitalize'>
                    {string.slice(0, substrIndex)}
                    <span className='text-red-400 capitalize'>{textHighlight}</span>
                    {string.slice(substrIndex + textHighlight.length)}
                </p>
            );
        } else {
            return string; // Return the original string if textHighlight is not found
        }
    };
    
  return (
      <li onClick={()=>clear("")}
          className='w-full h-[100px] pl-2 py-2 flex items-center hover:bg-zinc-900'>
          <Link href={generateHref(media)||"#"}
              className='w-full h-full flex items-center justify-center'>
              <div className='w-[60px] h-full mr-2'>
                  <Image src={`${base_url}${imagePath}`} width={1000} height={1900}/></div>
              <div className='flex-col items-center justify-center flex-1 h-full'>
                  <h4 className='text-xl font-semibold text-white'>{styledSubstring(name,textHighlight) }</h4>
                  <p className='text-sm font-medium text-slate-300 capitalize'>
                      {`${media === "tv" ? "TV show" : media}.${year}`}</p>
              </div>
          </Link>
      </li>
  )
}

export default SearchResults