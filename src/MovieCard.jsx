import React from "react";
import { useState } from "react";
import InfoCard from "./InfoCard";

const MovieCard = ({ movie, showInfo, showHideInfo, onClick, key }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (isHovered) => {
    setIsHovered(isHovered);
  };

  return (

    <div className="movie" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onClick={onClick}>
      <div>
        <p>{movie.release_date ? movie.release_date.slice(0, 4) : null}</p>
        <br></br>
        {isHovered && <p className='movie-description'>{movie.overview.length > 400 ? movie.overview.slice(0, 400) + '...' : movie.overview}</p>}
      </div>

      <div>
        <img src={movie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` : "https://via.placeholder.com/400"} alt={movie.title} />
      </div>

      <div>
        <span>{movie.video ? "Video" : "Movie"}</span>
        <span style={{ float: 'right' }}>{movie.vote_average}</span>
        <br />
        <h3 >{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;