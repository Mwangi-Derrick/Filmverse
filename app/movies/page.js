"use client";
import React, { useEffect, useState } from "react";
import MovieCarousel from "@/components/MovieCarousel";
import { fetchMovieGenre } from "@/services/TMDb_apis";
import Sidebar from "@/components/Sidebar";

function Movies() {
  let [Adventuremovies, setmovies] = useState(null);
  let [ActionMovies, setactionmovies] = useState(null);
  let [FamilyMovies, setfamilymovies] = useState(null);
  let [ComedyMovies, setcomedymovies] = useState(null);
  let [CrimeMovies, setcrimemovies] = useState(null);
  let [AnimationMovies, setanimationmovies] = useState(null);
  let [FantasyMovies, setfantasymovies] = useState(null);
  let [MysteryMovies, setmysterymovies] = useState(null);
  let [Sci_fiMovies, setscci_fimovies] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const AdventureMovies = await fetchMovieGenre(12, 3);
      const ActionMovies = await fetchMovieGenre(28, 5);
      const FamilyMovies = await fetchMovieGenre(10751, 2);
      const ComedyMovies = await fetchMovieGenre(35, 4);
      const CrimeMovies = await fetchMovieGenre(80, 2);
      const AnimationMovies = await fetchMovieGenre(16, 4);
      const FantasyMovies = await fetchMovieGenre(14, 5);
      const MysteryMovies = await fetchMovieGenre(9648, 3);
      const Sci_fiMovies = await fetchMovieGenre(878, 1);

      setmovies(AdventureMovies);
      setactionmovies(ActionMovies);
      setanimationmovies(AnimationMovies);
      setcomedymovies(ComedyMovies);
      setcrimemovies(CrimeMovies);
      setfamilymovies(FamilyMovies);
      setfantasymovies(FantasyMovies);
      setmysterymovies(MysteryMovies);
      setscci_fimovies(Sci_fiMovies);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(Adventuremovies); // Log the updated value of "movies"
  }, [Adventuremovies]);
  return (
    <div
      className=" text-blue-400 w-300px h-300px min-h-screen flex flex-row item-center flex-wrap
    justify-center lg:pl-[80px]"
    >
      <Sidebar />
      {Adventuremovies && <MovieCarousel data={Adventuremovies} title="Action & Adventure " /> }
      {FamilyMovies && <MovieCarousel data={FamilyMovies} title="Family " />}
      {MysteryMovies && <MovieCarousel data={MysteryMovies} title="Mystery " />}
      {FantasyMovies && <MovieCarousel data={FantasyMovies} title="Fantasy " />}
      {ActionMovies && <MovieCarousel data={ActionMovies} title="Action " />}
      {AnimationMovies && <MovieCarousel data={AnimationMovies} title="Animation" />}
      {Sci_fiMovies && <MovieCarousel data={Sci_fiMovies} title="science-fiction" />}
      {CrimeMovies && <MovieCarousel data={CrimeMovies} title="Crime" />}
      {ComedyMovies && <MovieCarousel data={ComedyMovies} title="Comedy" />}
    </div>
  );
}

export default Movies;
