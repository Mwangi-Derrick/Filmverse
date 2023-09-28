import MovieDetails from "@/components/MovieDetails";

async function page({ params }) {
  const idParams = (params.movieId).split("-");
  const movieId = idParams[0];
  console.log(movieId);
      const key = '31893f5365efe0cdf393794446aae7a6'
      const results = await
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos,credits,recommendations`)
      let data = await results.json();
      console.log(data)
  return (
    <div>
      <MovieDetails details={data} />
      </div>
  )
  
}  

export default page


