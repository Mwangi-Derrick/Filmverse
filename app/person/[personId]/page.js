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
  
  return (
      <div className='w-screen h-full'>
      <PersonDetails personCredits={combined_credits} personInfo={others} />   
    </div>
  )
}
