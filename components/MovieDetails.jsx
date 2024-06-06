"use client"
import React, { useEffect, useState } from 'react'
import { PlayCircleIcon,PlusIcon,CheckIcon } from "@heroicons/react/24/solid";
import TrailerIframe from "@/components/TrailerIframe";
import PeopleCarousel from './PeopleCarousel';
import MovieCarousel from './MovieCarousel';
import AlertBox from './AlertBox';
import Media from './Media';
import { doc, setDoc,updateDoc, arrayUnion,getDoc, arrayRemove } from "firebase/firestore"; 
import { useSession } from 'next-auth/react';
import {db} from "../services/firebaseSDK";
export default function MovieDetails({topLevelDetails,movieRecommendtaions,movieCredits,movieVideos}) {
  const [movieInfo, setInfo] = useState(topLevelDetails)
  const [credits, setCredits] = useState(movieCredits)
  const [videos, setVideos] = useState(movieVideos)
  const [recommendations, setRecommedations] = useState(movieRecommendtaions)
  const [alerts, setAlerts] = useState([]);
  const session = useSession()
  const handleCloseAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
    const img_Url = "https://image.tmdb.org/t/p/w500/"
  useEffect(() => {
    setInfo(topLevelDetails)
    setRecommedations(movieRecommendtaions)
    setCredits(movieCredits)
    setVideos(movieVideos)
  }, [topLevelDetails,movieVideos,movieRecommendtaions,movieCredits])
   const cast = credits?.cast.slice(0,5)
   const  directors = credits?.crew.
      filter((person) => person.known_for_department === "Directing").slice(0, 5)
    //remove any duplicate names that may arise using the javaScript Set object
    const uniqueDirectors = [...new Set(directors?.map((person) => person.name))]
    const Trailer = videos?.results.filter((video) => video.type === "Trailer").slice(0, 1)[0]
   const  initialDateFormat = movieInfo?.release_date
    const dateParts = initialDateFormat.split('-');
    const reversedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
   const  hours = Math.floor((movieInfo.runtime) / 60).toString()
 const  minutes = (movieInfo.runtime % 60).toString()
  
  const runtime = `${hours}${hours>1?"hrs":"hr"} ${minutes}min`
  /*add a usestate hook to handle the trailer 
  view functionality whenever a user clicks the watch trailer button*/
  const [YTtrailer, setTrailer] = useState(false);
  const [youtubeVideo, setYoutubeVideo] = useState(Trailer);
  //add an event handler function to set the trailer usestate to true
  const watchTrailer = () => {
    setTrailer(true)
    setYoutubeVideo(Trailer)
  }
  const closeTrailer = () => {
    setTrailer(false)
  }
  const vidoesToBeEmbedded = videos?.results.filter((video) => video.site === "YouTube");
  //the functions bellow are to be passed as props to the Media component
  const updateYoutubeVideo = (video) => {
    setYoutubeVideo(video)
  }
  const watchVideo = () => {
    setTrailer(true)
  }

  const [inWatchlist, setInWatchlist] = useState(false);
  useEffect(() => {
    async function checkIfMovieIsInWatchlist() {

      if (session && session?.data?.user) {
        const userEmail = session.data.user.email;// Extract user email
        const watchlistRef = doc(db, "watchlist", userEmail);// Create watchlist doc reference
         // Get the movies document within the user's watchlist (assuming movie IDs are stored in an array)
         const watchlistSnap = await getDoc(watchlistRef);
         console.log(watchlistSnap)
         if (watchlistSnap.exists()) {
           const movies = watchlistSnap.data()?.watchLater?.filter(item=>item.type==="movie")|| []; // Extract movies from watchlist
           // Check if the desired movie ID exists in the watchlist array
           const isInWatchlist = movies.some(movie => movie.id === `${movieInfo.id}`);
           // Replace movieId with your actual movie ID
           setInWatchlist(isInWatchlist);
           console.log("Movie is in watchlist:", isInWatchlist);
         } else {
           console.log("Watchlist document doesn't exist");
         }
       } else {
         console.warn("User not authenticated");
       }
     }
   
     checkIfMovieIsInWatchlist();
   }, [session?.data?.user,movieInfo.id]);
      
   const toogleWatchlist = async () => {
    if (session && session?.data?.user) {
      try {
        const userId = session?.data.user.email
        const movieData = {
          id: `${movieInfo.id}`,
          poster_path: `${movieInfo.poster_path}}`,
          title: `${movieInfo.title}`,
          type: "movie"
        }
        const movieDocRef = doc(db, "watchlist", `${userId}`)
        const docSnap = await getDoc(movieDocRef);
        if (docSnap.exists()) {
          await updateDoc(movieDocRef, {
            watchLater: inWatchlist ? arrayRemove(movieData) : arrayUnion(movieData)
          })
        }
        else {
          await setDoc(movieDocRef, {
            watchLater: [
              movieData
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
          <div 
      className='flex items-center text-white h-full w-screen flex-col
       justify-start relative top-0
        pb-[60px] 
        '>
      <section style={{
      backgroundImage:`linear-gradient(to bottom, rgba(9,9,11,0.2),
rgba(9,9,11,0.6),rgba(9,9,11,0.7),rgba(9,9,11,0.8),rgba(9,9,11,0.9), rgba(9,9,11,1)), 
url(${img_Url}${topLevelDetails.backdrop_path})`
      }}
        className='flex lg:flex-row w-screen h-fit sm:max-lg:items-center
         justify-around pt-[80px] px-12 pb-12 sm:max-lg:flex-col sm:max-lg:justify-center
          bg-no-repeat bg-cover bg-center'>
        <div className='flex flex-col lg:w-[25%] sm:max-md:w-full md:max-lg:w-[50%] '>
          <img src={`${img_Url}${movieInfo.poster_path}`}
            loading='lazy'
            width='300px' height='400px' alt=''
            className='w-full aspect-[171/200] rounded-md' />
           <button onClick={watchTrailer}
            className='w-full h-[50px] hover:bg-neutral-900 text-slate-200
              text-lg font-semibold flex items-center justify-center
            hover:text-red-500 transition-colors duration-700
            my-[20px] rounded-md
            sm:max-lg:h-[40px]
           bg-red-500'><PlayCircleIcon className="h-5 w-5 mx-1" /> Play Trailer</button>
          <button
            onClick={toogleWatchlist} className={`w-full h-[50px] hover:border-red-500 border
          ${inWatchlist ? "border-red-500 text-red-500" : "border-white text-white "}
              text-lg font-semibold flex items-center justify-center gap-1
            hover:text-red-500 transition-colors duration-700
             rounded-md 
            sm:max-lg:h-[40px]
           bg-transparent`}>{!inWatchlist?<>
            <PlusIcon className='w-5 h-5'/>
              <span>Add To Watchlist</span></> : <>
                <CheckIcon className='w-5 h-5' />
                <span>In Watchlist</span>
            </>}
          </button>
        </div>
        <div className='flex flex-col lg:w-[70%] sm:max-lg:items-start sm:max-lg:w-full'>
          <div className='flex items-start flex-col pb-5'>
            <h1 className='font-bold lg:text-4xl sm:max-lg:text-3xl'>{movieInfo.title}</h1>
            <div className='flex w-full h-fit mt-4 text-xl sm:max-lg:text-sm gap-1' >
              <p className='lg:w-fit sm:max-lg:w-[80px] flex items-start'>{reversedDate}</p>
              <span className='flex flex-wrap items-center gap-1'>
                <p>|</p>
                <p>{runtime}</p>
                <p>|</p>
                {movieInfo?.genres?.map((genre, index) => (
                  <p key={genre.id} className=' flex items-center'>
                    {index > 0 && ','}
                    {`${genre.name}`}</p>
                ))
                }
              </span>
            </div>
            <p className="pt-3 text-slate-200 font-light font-sans italic">{movieInfo.tagline}</p>
          </div>
          
          <article className='flex flex-col pb-2'>
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center 
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>STORY</p>
            </span>
            <p className='lg:text-xl md:max-lg:text:base font-light '>
              {movieInfo.overview}
            </p>
            <span className='py-[20px] mt-3  w-full h-[25px] lg:text-base sm:max-lg:text-sm font-bold
               items-center
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>CAST & CREW</p></span>
            <div className='w-full h-fit flex items-start justify-start'>
              <ul>
                <p className='text-base font-semibold lg:text-base sm:max-lg:text-sm'>Cast</p>
                {
                  cast?.map((actor) =>
                  (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={actor.id}>{actor.name}</li>
                    ))
                }
              </ul>
              <ul className='ml-5'>
                {uniqueDirectors?.length > 0 && <p className='text-base lg:text-base sm:max-lg:text-sm
               font-semibold'>{uniqueDirectors?.length > 1 ? "Directors" : "Director"}</p>}
                {
                  uniqueDirectors?.map((person) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px] "
                      key={person} >{person}</li>
                  ))
                }
              </ul>
            </div>
            <section className="flex mt-[20px] w-full h-fit sm:max-lg:flex-col">
            <div className="flex flex-col mr-[80px] w-fit h-fit items-start">
            <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center mb-1
               flex justify start'>
              <p className='pb-1 border-b-[3px] border-b-red-500 border-solid'>INFORMATION</p>
                </span>
                <ul>
                  <p className='lg:text-base sm:max-lg:text-sm 
                 font-semibold'>Production Companies</p>
                  {movieInfo?.production_companies?.map((company) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]
                    w-[180px] h-fit flex items-center justify-between"
                      key={company.name}>{company.name}</li>
                  )
                  )}
                </ul>
                <ul className="mt-2">
                  <p className='lg:text-base sm:max-lg:text-sm 
                font-semibold'>Production Countries</p>
                  {movieInfo?.production_countries?.map((country) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={country.name}>{country.name}</li>
                ))}
                </ul>
              </div>
              <div className="flex flex-col">
             <span className=' w-full h-fit lg:text-base sm:max-lg:text-sm font-bold
               items-center sm:max-lg:mt-3
               flex justify start'>
              <p className='pb-1 border-b-[3px]  border-b-red-500 border-solid'>LANGUAGES</p>
                </span>
                <ul className="sm:max-lg:mt-1">
                  {movieInfo?.spoken_languages?.map((language) => (
                    <li className="sm:max-lg:text-[13px] lg:text-[15px]"
                      key={language.english_name}>{language.english_name}</li>
                ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
          </section>  
      {movieInfo && (<PeopleCarousel people={credits} />)}
      {videos?.results.length > 0 &&
        (<Media updateVideo={updateYoutubeVideo} showVideo={watchVideo} videos={vidoesToBeEmbedded} />)}
      {recommendations?.results?.length>0 &&
        <MovieCarousel data={recommendations.results} title={`movies like ${movieInfo.title}`} />} 
      <TrailerIframe TrailerId={youtubeVideo?.key} onClose={closeTrailer} YTtrailer={YTtrailer} />
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
