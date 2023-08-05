"use client"
import React, { useEffect } from 'react'
import MovieCard from './MovieCard'

function MovieWrapper({ call }) {
  useEffect(() => {
    const receiveData = async() => {
      const data = await call(1)
      console.log(data)
    }
    receiveData()
  },[])
  
  return (
    <div>
      <MovieCard/>
    </div>
  )
}

export default MovieWrapper