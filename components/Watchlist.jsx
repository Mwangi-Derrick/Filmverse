"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore"; 
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { db } from '@/services/firebaseSDK';
import MovieCard from './MovieCard';
import TvShowCard from './TvShowCard';
import { ArchiveBoxXMarkIcon, XMarkIcon } from '@heroicons/react/24/solid';
function Watchlist() {
    const session = useSession();
    const category = useSearchParams().get("category") || "All"
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [watchlist, setInWatchlist] = useState(false);
    const [edit, setDone] = useState(false);
    useEffect(() => { 
        async function fetchWatchlist() {
            if (session?.data?.user) {
                const userEmail = session.data.user.email;// Extract user email
                const watchlistRef = doc(db, "watchlist", userEmail);// Create watchlist doc reference
                // Get the shows document within the user's watchlist (assuming show IDs are stored in an array)
                const watchlistSnap = await getDoc(watchlistRef);
                if (watchlistSnap.exists()) { 
                  if (category === "movie")
                    {
                        const movies = watchlistSnap.data()?.watchLater?.filter(item => item.type === "movie") || []; // Extract movies from watchlist
                      setInWatchlist(movies);
                    }
                    else if (category === "show") {
                        const shows = watchlistSnap.data()?.watchLater?.filter(item => item.type === "tv") || []; // Extract shows from watchlist
                      setInWatchlist(shows);
                    }
                    else {
                        const all = watchlistSnap.data()?.watchLater
                      setInWatchlist(all);
                    }
                }
                else { console.log("the document does not exist") }
            } else {
           console.warn("user is not authenticated")
            }
           
        }     
        fetchWatchlist();
    }, [category, session])
    const createQueryString = useCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        console.log(params.toString())
        return params.toString();
      },
      [searchParams]
    );
    const handleWatchlistRemoval = async (data) => {
        if (session && session?.data?.user && watchlist.length>0) {
            try {
              const userId = session?.data.user.email
              const docRef = doc(db, "watchlist", `${userId}`)
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  await updateDoc(docRef, {
                      watchLater: arrayRemove(data)
                  });
                  const filteredArray = watchlist.filter(card => card.id !== data.id);
                  setInWatchlist(filteredArray);
                }
               
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
   }
  return (<>
    <div className='flex w-full h-fit py-3 justify-between'>
    <div className='gap-3 flex text-sm'>
             <button 
             onClick={() => { router.push(pathname) }}
             style={{ color: category === "All" ? "black" : "white" }}
             className={`w-fit h-8 p-3 flex items-center rounded-md ${category === "All" ? "bg-white" : "bg-slate-800"}`}
           >
             All
           </button>
           <button 
             onClick={() => { router.push(`${pathname}?${createQueryString("category", "movie")}`) }}
             style={{ color: category === "movie" ? "black" : "white" }}
             className={`w-fit h-8 p-3 flex items-center rounded-md ${category === "movie" ? "bg-white" : "bg-slate-800"}`}
           >
             Movies
           </button>
           <button 
             onClick={() => { router.push(`${pathname}?${createQueryString("category", "show")}`) }}
             style={{ color: category === "show" ? "black" : "white" }}
             className={`w-fit h-8 p-3 flex items-center rounded-md ${category === "show" ? "bg-white" : "bg-slate-800"}`}
           >
             TV Shows
              </button>
          </div>
          <button onClick={()=>{setDone((prev)=>!prev)}} className='w-fit h-8 text-xl text-white'>{edit?"Done":"Edit" }</button>
      </div>
      {watchlist.length>0?(<div className='sm:grid sm:grid-cols-2 md:grid-cols-4 gap-1 min-h-screen
      pt-3 w-full xl:grid-cols-6 3xl:flex flex-wrap justify-center'>
          {watchlist?.map((card) => {
              if (card.type === "movie") {
                  return (<div className={`${edit?"opacity-50":"opacity-100"} relative w-fit h-fit`}>
                      {edit&&(<span className='absolute top-[40%] left-[45%] z-10 cursor-pointer'
                          onClick={() => { handleWatchlistRemoval(card) }}><ArchiveBoxXMarkIcon className='w-8 h-8 text-white' />
                      </span>)}
                      <MovieCard movieId={card.id} poster={card.poster_path} movieTitle={card.title} />
                  </div>)
              }
              else if (card.type === "tv") {
                  return (<div className={`${edit?"opacity-50":"opacity-100"} relative w-fit h-fit`}>
                      {edit&&(<span className='absolute top-[40%] left-[45%] z-10 cursor-pointer'
                          onClick={() => { handleWatchlistRemoval(card) }}><ArchiveBoxXMarkIcon className='w-8 h-8 text-white' /></span>)}
                      <TvShowCard TvShow={card} />
                      </div>)
              }
          })}
      </div>):(<div className='text-lg pt-3 text-white'>Your watchlist is empty</div>)
      }
  </>
  )
}

export default Watchlist