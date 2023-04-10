import "./App.css";
import { useState, useEffect } from "react";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import PageButtons from "./PageButtons";
import InfoCard from "./InfoCard";
import TMDBLogo from "./TMDBLogo.svg"

//const API_KEY = "6923363bff93519e1994961e935b25b1";
//const API_URL = "https://api.themoviedb.org/3/movie/550?api_key=6923363bff93519e1994961e935b25b1";
const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=6923363bff93519e1994961e935b25b1&language=en-US&page=";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=6923363bff93519e1994961e935b25b1&language=en-US&page="


const App = () => {

  //STATES
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showInfo, setShowInfo] = useState(false)
  const [movieDetails, setMovieDetails] = useState({});
  const [darkMode, setDarkMode] = useState(true);


  //GET POPULAR MOVIES
  const getPopularMovies = async () => {
    const response = await fetch(API_POPULAR + page);
    const data = await response.json();

    setMovies(data.results);
    console.log(data.results);
  };

  //GET POPULAR MOVIES
  const searchMovies = async () => {

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6923363bff93519e1994961e935b25b1&language=en-US&query=${searchTerm2}&page=${page}`);
    const data = await response.json();

    setMovies(data.results);
    console.log(data.results);
  }

  const darkModeFunc = () => {
    setDarkMode(!darkMode)
    console.log(darkMode);
  }


  //LOAD POPULAR MOVIES ON STARTUP
  useEffect(() => {
    getPopularMovies();
  }, []);


  //UPDATE WHEN PAGE IS UPDATED
  useEffect(() => {

    if (searchTerm2.length > 0) {
      searchMovies(searchTerm2, page);
    } else {
      getPopularMovies();
    }

  }, [page])

  useEffect(() => {

    setPage(1)

    if (searchTerm2.length > 0) {
      searchMovies();
    } else {
      getPopularMovies();
    }

  }, [searchTerm2])


  //HANDLE PAGE BUTTON CLICKS
  const handleClick = (direction) => {
    //PREVENT PAGE FROM BEING 0 OR LOWER
    if (page === 1 && direction === -1) { return; }

    setPage((prevCount) => prevCount + direction)
  }

  const showHideInfo = () => {
    setShowInfo(!showInfo);
    console.log(showInfo)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm2(searchTerm)
    }
  };

  //CREATE NEW OBJECT FOR FULL PAGE INFO CARD
  const handleComponentClick = (movie) => {
    const details = {
      backdrop: movie.backdrop_path,
      title: movie.original_title,
      overview: movie.overview,
      poster: movie.poster_path,
      vote: movie.vote_average,
      voteCount: movie.vote_count

    };

    setMovieDetails(details)
    console.log(movieDetails)
  };

  //APP
  return (
    <div className={darkMode ? "dark-mode app" : "light-mode app"}>

      <div className='darkmode-container'>
        <div class="dark-mode-toggle">
          <input type="checkbox" id="dark-mode-toggle" onClick={darkModeFunc} checked={darkMode} />
          <label for="dark-mode-toggle"></label>
        </div>
      </div>


      <h1>Movie Madness</h1>

      <div className="search">
        <input placeholder="Search For Movies" value={searchTerm} onKeyPress={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={searchIcon} alt="search" onClick={() => setSearchTerm2(searchTerm)} />
      </div>




      {

        movies?.length > 0

          ? (

            <div className="container">
              <PageButtons page={page} handleClick={handleClick} />

              {movies.map((movie) => (
                <MovieCard movie={movie} showInfo={showInfo} showHideInfo={showHideInfo} key={movie.id} onClick={() => handleComponentClick(movie)}
                />
              ))}


              {movieDetails.title && <div onClick={handleComponentClick}

              >
                {movieDetails.overview}
                <InfoCard movie={movieDetails} />
              </div>}


              <PageButtons page={page} handleClick={handleClick} />

            </div>
          ) : (
            <div className="empty">
              <h1>No movies to display</h1>
            </div>
          )
      }
      <br /><br /><br /><br />
      <div className='footer'>
        <h1><a href='https://www.youtube.com/channel/UCHzHttA3M2o0P6N9GyQag5g'>Boethiah</a></h1>
        <img src={TMDBLogo} alt="search" className="logo" />
      </div>


    </div >
  );
};

export default App;
