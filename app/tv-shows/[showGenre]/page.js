import ShowsWrapper from '@/components/ShowsWrapper'
import Sidebar from '@/components/Sidebar'
import React from 'react'
export async function generateMetadata({ params }) {
  // read route params
  const show_params = params.showGenre
  const substrings = show_params.split("-")
 const show_genre = substrings.slice(0,substrings.length).join("-").replace(/\%26/g," & ")
  return {
    title: show_genre,
     description:"show-genre"
  }
}
async function page({ params }) {
  const routeSegement = params.showGenre
  const substrings = routeSegement.split("-")
  const lastIndex = substrings.length-1
  const id = substrings[lastIndex]
  const genreName = substrings.slice(0, lastIndex).join("").replace(/\%26/g," & ")
  console.log(id)
  console.log(routeSegement)
  const fetchShowGenre = async (page) => {
    "use server"
    const Key="31893f5365efe0cdf393794446aae7a6"
    const results = await
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=${id}&page=${page}`)
  const data = await results.json()
  return data;
  }
  return (
    <div className='text-white w-full h-full min-h-screen items-center flex flex-col lg:pl-[80px] pb-6 pt-3' >
      <Sidebar />
      <ShowsWrapper fetchShows={fetchShowGenre} genreType={genreName} />
  </div>
  )
}

export default page