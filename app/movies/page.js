import React from "react";
import MovieCarousel from "@/components/MovieCarousel";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: 'movies',
  description: 'movies-page',
}
async function Movies() {
  const Key = '31893f5365efe0cdf393794446aae7a6'
  const movieGenres = [
    {name:"adventure",id:12},
    { name: "action", id: 28 },
    {name:"thriller",id:53},
    { name: "family", id: 10751 },
    {name:"horror",id:27},
    { name: "comedy", id: 35 },
    { name: "crime", id: 80 },
    { name: "animation", id: 16 },
    { name: "fantasy", id: 14 },
    { name: "mystery", id: 9648 },
    {name:"sci-fi",id:878},
  ]
  const delay = (ms) => { new Promise((resolve)=>setTimeout(resolve,ms)) }
  const movies = {}
  for (const genre of movieGenres)
  {
   const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&with_genres=${genre.id}`,{cache:'no-store'})
    const data = await results.json();
    movies[genre.name] = data.results
    delay(200)
  }
  return (
    <div
      className="w-screen min-h-screen relative flex flex-col items-center justify-center
      lg:pl-[80px]
    "
    >
    <Sidebar />
      {movieGenres.map((genre) => (<MovieCarousel key={genre.id}
        data={movies[genre.name]} title={genre.name} genreId={genre.id} />))
  }
  </div>
  );
}

export default Movies;