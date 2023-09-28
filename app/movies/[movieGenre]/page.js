import MovieWrapper from '@/components/MovieWrapper'
import Sidebar from '@/components/Sidebar'
import React from 'react'
export async function generateMetadata({ params }) {
  // read route params
  const movie_params = params.movieGenre
  const subtrings = movie_params.split("-")
  const movie_genre = subtrings.slice(0,subtrings.length-1).join(" ")
  return {
    title: movie_genre,
     description:"movie-genre"
  }
}
export default async function page({ params }) {
  const parameter = params.movieGenre
  const param_subtrings = parameter.split("-")
  const Id = param_subtrings[param_subtrings.length - 1]
  const secondLastIndex = param_subtrings.length-1
  const movieType = param_subtrings.slice(0, secondLastIndex).join("-")
  console.log(movieType)
  const Key = "31893f5365efe0cdf393794446aae7a6"
  async function fetchData(page) {
    "use server"
    const results = await
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&with_genres=${Id}&page=${page}`)
    const data = await results.json()
    return data;
  }
  return (
    <div className='text-white w-full h-full flex flex-col lg:pl-[80px] pb-6 pt-3' >
      <Sidebar/>
      <MovieWrapper call={fetchData} genreType={movieType} />
    </div>
  )
}
