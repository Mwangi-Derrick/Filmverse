import Sidebar from '@/components/Sidebar'
import TvCarousel from '@/components/TvCarousel'
import React from 'react'
async function page() {
  const Key = "31893f5365efe0cdf393794446aae7a6"
  const tvShowGenres = [
    { id: 10759, name: "Action & Adventure" },
    {id:16,name:"animation"},
    {id:80,name:"crime"},
    {id:35,name:"comedy"}, 
    {id:10762,name:"kids"},
    {id:18,name:"drama"},
    {id:9648,name: "mystery"},
    { id: 10765, name: "Sci-Fi" },
    {id:10768,name:"war & politics"},
    {id:10764,name: "reality"},
    {id:37,name:"western"}
  ]
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const tvShows = {}
    for (const genre of tvShowGenres) {
      try {
        const results = await
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=${genre.id}`,{cache:'no-store'})
        const data = await results.json();
        tvShows[genre.name] = data.results;
        await delay(200);
      } catch (error)
      {console.error(`Error fetching data for ${genre.name}:`, error)}
  }

  return (
    <div className='flex flex-col relative items-center justify-center 
    lg:pl-[80px] w-screen h-full'>
        <Sidebar />
      {tvShowGenres.map((genre) => (<TvCarousel data={tvShows[genre.name]}
        title={genre.name} key={genre.id} genreId={genre.id} />))}
    </div>
  )
}

export default page