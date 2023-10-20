import PersonDetails from '@/components/PersonDetails'
import React from 'react'
let results;
export async function generateMetadata({ params }) {
  // read route params
  const person_params = params.personId
  const subtrings = person_params.split("-")
  const person_name = subtrings.slice(1,subtrings.length).join("-")
  return {
    title: person_name,
     description:`${results?.biography}`
  }
}
export default async function page({ params }) {
    const path = params.personId
    const personId = path.split("-")[0]
    const key = "31893f5365efe0cdf393794446aae7a6"
    const personDetails = 
    await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${key}&append_to_response=combined_credits`,{cache:'no-store'})
   results = await personDetails.json();
  const { combined_credits, ...others } = results;
   /*The map method generates an array of ids from the movies and tv shows and puts them in the Javascript Set
     to effectively remove any duplicate Ids that may arise,the Set then is 
     converted back to an array using the spread operator */
     const uniqueIds = [...new Set(combined_credits?.cast?.map((credit) => credit.id))]
     /*map through the array of unique ids to genrate unique movies and tv shows using 
     the array.find method which returns an element with the first instance of that id*/
  const uniqueMedia = uniqueIds.map((id) => { return combined_credits?.cast?.find((media) => { return media.id === id }) })
  return (
      <div className='w-screen h-full'>
      <PersonDetails personCredits={uniqueMedia} personInfo={others} />   
    </div>
  )
}
