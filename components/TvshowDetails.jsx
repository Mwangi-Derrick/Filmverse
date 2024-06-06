"use client"
import Image from 'next/image'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import TvCarousel from './TvCarousel';
import { CheckIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import TrailerIframe from './TrailerIframe';
import AlertBox from './AlertBox';
import Media from './Media';
import PeopleCarousel from './PeopleCarousel';
import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore"; 
import { useSession } from 'next-auth/react';
import { db } from '@/services/firebaseSDK';

function TvshowDetails({ seriesInfo, seasons, fetchEpisodes,suggestedShows,videos,showCredits,Tvratings }) {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w780/';
    const [recommedations,setRecommedations] = useState(suggestedShows)
    const [details, setDetails] = useState(seriesInfo);
    const [episodes, setDetailSection] = useState(true);
    const [totalVideos, setVideos] = useState(videos)
    const trailer = totalVideos.filter((video) => (video.site === "YouTube" && video.type === "Trailer")).slice(0, 1)[0];
    const TvShowVideos = totalVideos.filter((video) => (video.site === "YouTube"));
    const [showTrailer, setShowTrailer] = useState(false);
    const [ratings, setRatings] = useState(Tvratings)
    //state to store video embedd
    const [videoEmbedd, setVideoEmbedd] = useState(trailer);
    const [alerts, setAlerts] = useState([]);
    const updateVideoEmbedd = (video)=> {
        setVideoEmbedd(video);
    }
    const USArating = ratings?.filter((rating)=>rating.iso_3166_1==="US")[0]
     const creators = details?.created_by
    const watchTrailer = () => {
        setShowTrailer(true)
        setVideoEmbedd(trailer)
    }
    //the watchVideo function will be passed as a prop to the Media component
    const watchVideo = () => {
        setShowTrailer(true)
    }
    const onCloseTrailer = () => {
        setShowTrailer(false)
    }
    useEffect(() => {
        setDetails(seriesInfo)
        setRecommedations(suggestedShows)
        setVideos(videos)
        setRatings(Tvratings)
    }, [seriesInfo,suggestedShows,totalVideos,Tvratings]);
    const AirDate = details.first_air_date
    const FirstYearAired = AirDate.split("-")[0]
    const genres = details.genres?.map((genre, index) => (<p key={index}>
        {index > 0 ? "," : ""}
        {genre.name}
    </p>))
    const [inWatchlist, setInWatchlist] = useState(false)
    const session = useSession()
    const handleCloseAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
      };
    useEffect(() => {
      async function checkIfShowIsInWatchlist() {
            if (session && session?.data?.user) {
                const userEmail = session.data.user.email;// Extract user email
                const watchlistRef = doc(db, "watchlist", userEmail);// Create watchlist doc reference
                // Get the shows document within the user's watchlist (assuming show IDs are stored in an array)
                const watchlistSnap = await getDoc(watchlistRef);
                console.log(watchlistSnap)
                if (watchlistSnap.exists()) {
                    const shows = watchlistSnap.data()?.watchLater?.filter(item => item.type === "tv") || []; // Extract shows from watchlist
                    console.log(shows)
                    // Check if the desired show ID exists in the watchlist array
                    const isInWatchlist = shows.some(show => show.id === `${details.id}`);
                    // Replace movieId with your actual show ID
                    setInWatchlist(isInWatchlist);
                    console.log("Movie is in watchlist:", isInWatchlist);
                }
            }
            else {
                console.warn("User not authenticated");
            }
        }
        checkIfShowIsInWatchlist();
    }, [session?.data?.user, inWatchlist])
    const toogleWatchlist = async () => {
        if (session && session?.data?.user) {
          try {
            const userId = session?.data.user.email
            const tvShowData = {
              id: `${details.id}`,
              poster_path: `${details.poster_path}}`,
              name: `${details.name}`,
              type: "tv"
            }
            const tvShowDocRef = doc(db, "watchlist", `${userId}`)
            const docSnap = await getDoc(tvShowDocRef);
            if (docSnap.exists()) {
              await updateDoc(tvShowDocRef, {
                watchLater: inWatchlist ? arrayRemove(tvShowData) : arrayUnion(tvShowData)
              })
            }
            else {
              await setDoc(tvShowDocRef, {
                watchLater: [
                  tvShowData
                ]
              });
            }
            setInWatchlist((prev) => !prev);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        else {
            const id = Date.now();
            const newAlert = { id, message: 'Please login to add to watchlist' };
            setAlerts(prevAlerts => [...prevAlerts, newAlert]);
             // Automatically remove the alert after 5 seconds
      setTimeout(() => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
      }, 5000); // 5000 milliseconds = 5 seconds
        }
      }
  return (
      <div className='text-white h-full w-screen flex flex-col
    items-center relative top-[-60px]
    justify-between
     ' > 
          <div className='flex lg:flex-row sm:flex-col w-full min-h-[70vh] bg-no-repeat
           bg-cover items-start justify-between px-7 pt-[85px]'
              style={{
                  backgroundImage:`linear-gradient(to bottom, rgba(0,0,0,0),
                  rgba(0,0,0,0.4),
          rgba(0,0,0,0.2), rgba(0,0,0,0.9)), 
           url(${baseImageUrl}${details.backdrop_path})`
      }}>
              <div className='lg:w-[15vw] lg:h-[60vh] sm:max-lg:w-full lg:mr-7'>
                  <Image layout='responsive' className='rounded-md sm:max-lg:w-full
                   sm:max-lg:h-[30px]'
                      src={`${baseImageUrl}${details.poster_path}`} width={1000} height={1920} alt='' />
              </div>
              <article className='flex flex-col justify-start h-full items-start w-full sm:max-lg:pt-3'>
                  <div className='w-fit h-fit flex flex-col'>
                      <h1 className='lg:text-5xl sm:text-xl font-medium w-full pb-3'>Watch {details.name}</h1>
                      <div className="flex w-full h-fit lg:text-xl gap-[5px]
                      items-center flex-wrap sm:text-[13px] font-medium">
                          {USArating && (<div className='w-10 h-5 flex sm:text-[10px] items-center 
                          justify-center rounded-md border-solid 
                          border border-slate-300'>{USArating?.rating}</div>)}
                          <p>{FirstYearAired}</p>
                          <span>|</span>
                          <p>{details.number_of_seasons}{" "}
                              {details.number_of_seasons === 1 ? "season" : "seasons"}</p>
                              <span>|</span>
                          {genres}
                      </div>
                      <div className='w-full h-fit flex flex-row items-center justify-start gap-2 mt-3'>
                      <button onClick={watchTrailer}
                        className='w-[120px] h-7 cursor-pointer bg-red-500 flex
                       items-center justify-center rounded-full lg:text-base sm:text-sm'>
                              <PlayIcon className='h-3 w-3 mr-1' />Play Trailer</button>
                          <button onClick={toogleWatchlist}
                              className={`w-fit flex flex-row items-center justify-center rounded-full 
                              transiton-all ease-in-out duration-1000
                          px-5 h-7 cursor-pointer hover:text-red-500 hover:border-red-500 gap-1
                           border border-solid ${inWatchlist ? "border-red-500 text-red-500" : "border-white"}`}>
                              {!inWatchlist ? <><PlusIcon className='w-5 h-5' /><p>Add to Watchlist</p></> :
                                  <><CheckIcon className='w-5 h-5'/><p>In Watchlist</p></>}
                           </button>
                      </div>
                     
                      <p className='sm:text-sm lg:text-base
                          text-slate-200 font-light pt-3 italic'>{details?.tagline}</p>
                  </div>
                  <div className='py-3 w-full flex flex-col h-fit lg:text-base sm:text-sm'>
                      <h4 className='text-xl font-semibold pb-1'>Story</h4>
                      {details.overview}</div>
              </article>
          </div>
          <div className='flex flex-col w-full px-7'>
              <div className='flex items-center justify-start h-[85px] 
              sm:text-sm lg:text-xl font-semibold mb-6'>
                  <label onClick={()=>{setDetailSection(true)}} for="episodes" className={
                    `mx-3 h-full ${episodes?"border-b-red-500 text-red-500":""}
                   flex items-center hover:text-red-500 cursor-pointer
                   border-solid border-b-4 border-transparent`}>EPISODES</label>
                  <label onClick={()=>{setDetailSection(false)}} for="details" className={`
                  mx-3 h-full ${!episodes?" border-b-red-500 text-red-500":""}
                  flex items-center hover:text-red-500 cursor-pointer
                  border-solid border-b-4 border-transparent`}>DETAILS</label>
              </div>
              {/*conditionaly render the episodes or the tvshow details*/}
              {episodes ? (
                  <EpisodesSection seasonCount={seasons} fetchData={fetchEpisodes}/>) :
                  (<InformationSection credits={showCredits} genreNames={details?.genres}
                      creators={creators} />)
              }
          </div>
          <PeopleCarousel people={showCredits} />
          <Media updateVideo={updateVideoEmbedd} showVideo={watchVideo} videos={TvShowVideos} />
          <TvCarousel data={recommedations} title='you may also like...' />
          <TrailerIframe TrailerId={videoEmbedd?.key} YTtrailer={showTrailer} onClose={onCloseTrailer} />
          <div className="fixed inset-0 h-screen w-full flex flex-col items-end justify-end gap-2p-4 pointer-events-none">
{alerts.map((alert,index) => (
  <AlertBox
    key={alert.id}
    id={alert.id}
    index={index}
    message={alert.message}
    onClose={() => { handleCloseAlert }}
  />
))}
</div>
    </div>
  )
}
function EpisodesSection({ seasonCount, fetchData }) {
    const latestSeason = seasonCount.slice(0, 1)[0]
    const [Currentseason, setSeason] = useState(latestSeason)
    const [episodeData, setEpisodes] = useState(null)
    const [showMore, setShowMore] = useState([]);
    const toggleShowMore = useCallback((index) => {
        setShowMore(prevShowMore => {
            const newShowMore = [...prevShowMore];
            newShowMore[index] = !newShowMore[index];
            return newShowMore;
        });
    }, []);
    useEffect(() => {
        let controller;
        async function receiveEpisodes() {
            const episodes = await fetchData(Currentseason)
            setEpisodes(episodes)
        }
        receiveEpisodes()
    }, [Currentseason])

    function generateDateFormat(input) {
        const newDateFormat = new Date(input).toLocaleDateString("en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }) 
        if (input) { return newDateFormat }
        if(input === null){return `Release date is currently unavailable from our data sources`}
    }
    return  (<section className='flex flex-col w-full h-fit'>
    <div className='flex w-full h-fit'>
            <p className='m-[12px] lg:text-base sm:text-xs
        flex items-start text-base font-semibold'>SEASONS</p>
        <div className='w-fit h-fit flex flex-wrap justify-start'>
            {seasonCount.map((number, index) => (
                <label onClick={(e) => { setSeason(e.target.value) }}
                    style={{
                        backgroundColor: Currentseason == number ? "#ef4444" : "",
                        color: Currentseason == number ? "black" : "",
                        borderColor: Currentseason == number ? "#ef4444" : "",
                        WebkitTapHighlightColor:"rgba(0,0,0,0)"
                    }}
                    key={index} className="inline-flex items-center justify-center
                border-solid border-brown-900 hover:border-red-500 border-2
             bg-transparent w-9 h-9 text-white rounded-full m-1 cursor-pointer">
                    <input type="radio" className="hidden" name="season" value={number} />
                    <span>{number}</span>
                </label>))}
        </div>
   
        </div>
    <div className="flex flex-col-reverse mt-3 lg:w-[80%] sm:w-[100%] h-fit divide-y divide-y-reverse
 divide-solid divide-slate-400 min-h-[100px]">
        {episodeData && episodeData.map((episode, index) =>
        (<article style={{
            height: showMore[index] ? "fit-content" : "",
            backgroundColor: showMore[index] ? "rgba(23,23,23,0.5)" : "",
            backdropFilter: showMore[index] ? "10px":"",
            borderRadius: showMore[index] ? "8px" : "",
            border: showMore[index] ? "0" : "", 
            WebkitTapHighlightColor:"rgba(0,0,0,0)"
        }}
            key={index} onClick={() => toggleShowMore(index)}
            className='w-full h-[80px] flex flex-col group overflow-y-hidden
            transition-height duration-700 ease-in
            items-center justify-start pb-2 cursor-pointer pl-1 my-1'>
            <div className='flex w-full h-fit py-2'>
                <div className='w-[100px] h-[55px]'>
                    <img src={`https://image.tmdb.org/t/p/w92/${episode.still_path}`}
                        loading='lazy'
                        alt=''  />
                </div>
                <div className='flex flex-col items-start pl-3 justify-start w-fit h-fit'>
                    <h2 style={{ color: showMore[index] ? "#846358" : "" }}
                        className='lg:text-xl sm:text-base font-semibold group-hover:text-brown-800'>
                        {`${episode.episode_number}.${episode.name}`}</h2>
                    <p className='lg:text-base sm:text-sm'>{generateDateFormat(episode.air_date)}
                        <span className='ml-1'>. {episode.runtime} {!episode.runtime?"":"min" }</span>
                    </p>
                </div>
            </div>
            <p className='lg:text-[18px] sm:text-sm font-light pt-6 w-full h-fit flex justify-start'>
                {episode.overview || "Data is currently unavailable from external data sources."}
            </p>
        </article>))}
    </div> 
</section>)
}
function InformationSection({ credits,genreNames,creators }) {
    const [castData, setCastData] = useState(credits)
    const actors = castData?.cast?.filter((cast) => (cast.known_for_department === "Acting")).slice(0,8)
    useEffect(()=>{setCastData(credits)},[credits])
    return (
        <section className='w-full h-fit flex flex-col items-center justify-between'>
            <div className='flex flex-row items-start justify-start w-full h-fit '>
            <ul className='mr-6 flex w-fit h-fit flex-col'>
                <h6 className='font-semibold text-base pb-1'>Cast</h6>
                {actors && actors.map((actor) => (
                    <li className='text-sm font-medium'
                        key={actor.id}>
                        {actor.name}
                    </li>
                ))}
                </ul>
                <ul className='flex w-fit h-fit flex-col'>
                <h6 className='font-semibold text-base pb-1'>Genres</h6>
                    {genreNames && genreNames.map((genre,index) => (
                        <li key={genre.id ||index} className='text-sm font-medium'>
                       {genre.name}
                   </li>))}
                </ul>
          
            </div>
            <div className='flex w-full h-fit justify-start my-3 items-center'>
                <ul className='flex w-fit h-fit items-center'>
                    <h6 className='font-semibold text-sm'>Created by:</h6>
                    {creators.map((person, index) => (
                        <li className='text-sm font-medium ml-1'>
                            {index > 0 ? ",":""}
                            {person.name}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default TvshowDetails;