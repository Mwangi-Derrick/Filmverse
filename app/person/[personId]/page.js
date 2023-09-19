import PersonDetails from '@/components/PersonDetails'
import React from 'react'

export default async function page({ params }) {
    const path = params.personId
    const personId = path.split("-")[0]
    const key = "31893f5365efe0cdf393794446aae7a6"
    const personDetails = 
    await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${key}&append_to_response=combined_credits`)
  const results = await personDetails.json();
  const { combined_credits, ...others } = results;
  
  return (
      <div className='w-screen h-full'>
      <PersonDetails personCredits={combined_credits} personInfo={others} />   
    </div>
  )
}
