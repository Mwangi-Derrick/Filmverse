import MovieDetails from "@/components/MovieDetails";

export async function generateMetadata({ params }) {
  // read route params
  const movie_params = params.movieId
  const substrings = movie_params.split("-")
  const id = substrings[0];
  const key = '31893f5365efe0cdf393794446aae7a6'
  const details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
  const information = await details.json()
  return {
    title: information?.title,
     description: information?.overview
  }
}
const img_Url = "https://image.tmdb.org/t/p/w500/"
async function page({ params }) {
  const idParams = (params.movieId).split("-");
  const movieId = idParams[0];
  const key = '31893f5365efe0cdf393794446aae7a6'
      const results = await
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=videos,credits,recommendations`)
     const {videos,credits,recommendations,...details} = await results.json();
  return (
    <div className="w-screen h-full bg-no-repeat bg-cover bg-center" style={{
      backgroundImage: `
         url(${img_Url}${details?.backdrop_path})`
    }}>
      <MovieDetails topLevelDetails={details} movieCredits={credits}
        movieRecommendtaions={recommendations} movieVideos={videos} />
      </div>
  )
  
}  

export default page


