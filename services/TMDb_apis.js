
const Key = "31893f5365efe0cdf393794446aae7a6"
const BASE_URL = "https://api.themoviedb.org/aCiXh5QX6bg0BtpFEBXKaZYScB4.jpg"
const url = "https://image.tmdb.org/t/p/w500/"

const language = "en-Us"


const data = {
  Trending: {
    all: `https://api.themoviedb.org/3/trending/all/day?api_key=${Key}&language=${language}`,
    tendingmovies: `https://api.themoviedb.org/3/trending/movie/day?api_key=${Key}&language=${language}`,
    tendingtvshows: `https://api.themoviedb.org/3/trending/tv/day?api_key=${Key}&language=${language}`,
  },
  genre: {
    movieList: `https://api.themoviedb.org/3/genre/movie/list?api_key=${Key}&language=${language}`,
    tvList: `https://api.themoviedb.org/3/genre/tv/list?api_key=${Key}&language=${language}`,
  },
  movie_List: {
    nowplaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}&language=${language}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${Key}&language=${language}`,
    top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${Key}&language=${language}`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${Key}&language=${language}`,
  }
}

const MovieData = {
  actionMovies: {
    title: "Action",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=28`,
  },
  adventureMovies: {
    title: "Adventure",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=12`,
  },
  animationMovies: {
    title: "Animation",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=16`,
  },
  comedyMovies: {
    title: "Comedy",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=35`,
  },
  crimeMovies: {
    title: "Crime",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=80`,
  },
  documentaryMovies: {
    title: "Documentary",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=99`,
  },
  dramaMovies: {
    title: "Drama",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=18`,
  },
  familyMovies: {
    title: "Family",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10751`,
  },
  fantasyMovies: {
    title: "Fantasy",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=14`,
  },
  historyMovies: {
    title: "History",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=36`,
  },
  horrorMovies: {
    title: "Horror",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=27`,
  },
  musicMovies: {
    title: "Music",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10402`,
  },
  mysteryMovies: {
    title: "Mystery",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=9648`,
  },
  romanceMovies: {
    title: "Romance",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10749`,
  },
  scienceFictionMovies: {
    title: "Science Fiction",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=878`,
  },
  tvMovieMovies: {
    title: "TV Movie",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10770`,
  },
  thrillerMovies: {
    title: "Thriller",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=53`,
  },
  warMovies: {
    title: "War",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10752`,
  },
  westernMovies: {
    title: "Western",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=37`,
  }
};



const tvShowGenres = {
  actionAdventureShows: {
    title: "Action & Adventure",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10759`,
  },
  animationShows: {
    title: "Animation",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=16`,
  },
  comedyShows: {
    title: "Comedy",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=35`,
  },
  crimeShows: {
    title: "Crime",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=80`,
  },
  documentaryShows: {
    title: "Documentary",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=99`,
  },
  dramaShows: {
    title: "Drama",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=18`,
  },
  familyShows: {
    title: "Family",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10751`,
  },
  kidsShows: {
    title: "Kids",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10762`,
  },
  mysteryShows: {
    title: "Mystery",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=9648`,
  },
  newsShows: {
    title: "News",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10763`,
  },
  realityShows: {
    title: "Reality",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10764`,
  },
  sciFiFantasyShows: {
    title: "Sci-Fi & Fantasy",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10765`,
  },
  soapShows: {
    title: "Soap",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10766`,
  },
  talkShows: {
    title: "Talk",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10767`,
  },
  warPoliticsShows: {
    title: "War & Politics",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=10768`,
  },
  westernShows: {
    title: "Western",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${Key}&with_genres=37`,
  }
};


   async function fetchTrending(){
     const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${Key}&language=${language}
    `)
     const data = await response.json();
     return data.results;
     
   }
   export {fetchTrending}





