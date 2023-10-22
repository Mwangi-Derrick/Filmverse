import React from "react";
import MovieCarousel from "@/components/MovieCarousel";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: 'Movies',
  description: 'Movies-page',
}
async function Movies() {
  const Key = '31893f5365efe0cdf393794446aae7a6'
  const movieGenres = [
    {name:"Adventure",id:12},
    { name: "Action", id: 28 },
    {name:"Thriller",id:53},
    { name: "Family", id: 10751 },
    {name:"Horror",id:27},
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Animation", id: 16 },
    { name: "Fantasy", id: 14 },
    { name: "Mystery", id: 9648 },
    {name:"Sci-fi",id:878},
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
      lg:pl-[80px] pt-[60px]
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