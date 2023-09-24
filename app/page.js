import MovieCarousel from "@/components/MovieCarousel";
import Slider from "@/components/Slider";
import TvCarousel from "@/components/TvCarousel";

export default async function Home() {
  const Key = "31893f5365efe0cdf393794446aae7a6"
  const delay = (ms)=>{new Promise((resolve)=>setTimeout(resolve,ms))}
  const movielist = {
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${Key}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${Key}`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${Key}`,
    upcoming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${Key}`
  }  
  const showList = {
     trending: `https://api.themoviedb.org/3/trending/tv/day?api_key=${Key}`,
    popular: `https://api.themoviedb.org/3/tv/popular?api_key=${Key}`,
    topRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${Key}`
  }
  const titles = Object.keys(movielist);
  const tvTitles = Object.keys(showList);
  const movies = {}
  const shows = {}
  for (const name of titles) {
    const results = await fetch(`${movielist[name]}`,{cache:'no-store'})
    const data = await results.json();
    movies[name] = data.results;
    delay(250)
  }
  for (const show of tvTitles) {
    const results = await fetch(`${showList[show]}`,{cache:'no-store'})
    const data = await results.json();
    shows[show] = data.results;
    delay(300)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between relative top-[-60px]">
      <Slider/>
      {titles.map((key, index) => (<MovieCarousel key={index} data={movies[key]} title={`${key} movies`} />))}
      {tvTitles.map((key, index) => (<TvCarousel key={index} data={shows[key]} title={`${key} shows`}/>))}
    </div>
  );
}
