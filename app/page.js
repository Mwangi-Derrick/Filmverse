"use client";
import MovieCarousel from "@/components/MovieCarousel";
import Sidebar from "@/components/Sidebar";
import { fetchTrending } from "@/services/TMDb_apis";
import { useEffect, useState } from "react";

export default function Home() {
  let [trending, setTrending] = useState(null);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const results = await fetchTrending();
      console.log(results);
      setTrending(results);
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between lg:pl-[80px]">
      <Sidebar />
      {trending && <MovieCarousel data={trending} title="Trending Movies" />}
    </div>
  );
}
