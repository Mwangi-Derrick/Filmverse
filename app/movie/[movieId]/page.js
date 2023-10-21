import MovieDetails from "@/components/MovieDetails";
let data;
export async function generateMetadata({ params }) {
  // read route params
  const movie_params = params.movieId
  const substrings = movie_params.split("-")
  const title = substrings.slice(1, substrings.length).join(" ").replace(/\%3A/, ":").replace(/\//g,"-")
  const overview = data?.overview
  return {
    title: `${title}`,
     description: `${overview}`
  }
}
async function page({ params }) {
  const idParams = (params.movieId).split("-");
  const movieId = idParams[0];
      const key = '31893f5365efe0cdf393794446aae7a6'
      const results = await
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos,credits,recommendations`)
       data = await results.json();
  return (
    <div>
      <MovieDetails details={data} />
      </div>
  )
  
}  

export default page


