import TvshowDetails from '@/components/TvshowDetails'
import React from 'react'
let TvshowsData;
export async function generateMetadata({ params }) {
  // read route params
  const show_params = params.tvShowId
  const substrings = show_params.split("-")
  const show_name = substrings.slice(1, substrings.length).join(" ").replace(/\%3A/,":")
  return {
    title: show_name,
    description:`${TvshowsData?.overview}`
  }
}

async function page({ params }) {
  const Key="31893f5365efe0cdf393794446aae7a6"
  const ShowId = params.tvShowId.split("-")[0]

  async function fetchSeasonEpisodes(season_number) {
    "use server"
    const seasons = await
      fetch(`https://api.themoviedb.org/3/tv/${ShowId}/season/${season_number}?api_key=${Key}`,{cache:'no-store'})
    const data = await seasons.json()
    return data.episodes
  }
  
  const results = await
    fetch(`https://api.themoviedb.org/3/tv/${ShowId}?api_key=${Key}&append_to_response=videos,credits,recommendations,content_ratings`, { cache: 'no-store' });
    TvshowsData = await results.json();

    //use the series data to get the total number of seasons
    const totalSeasons = TvshowsData?.number_of_seasons
    //convert the total number of seasons into an array containing the season numbers
  const seasonLists = [...Array(totalSeasons)].map((_, index) => 1 + index).reverse()
/*object destructuring to access the credits,videos and reccomended-shows while 
...rest operator is used to include other details of the tv-show*/
  const {credits,videos,recommendations,content_ratings,...info}=TvshowsData
  return (
    <div className='w-screen h-full'>
      <TvshowDetails seasons={seasonLists} seriesInfo={info}
        fetchEpisodes={fetchSeasonEpisodes} suggestedShows={recommendations?.results}
        Tvratings={content_ratings?.results}
        videos={videos?.results} showCredits={credits} />
    </div>
  )
}

export default page