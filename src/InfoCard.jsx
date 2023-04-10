import React from "react";

const InfoCard = ({ movie }) => {
    return (
        <div className='info-card-container'>
            <div id='full-page-component' style={{
                backgroundImage: `url('https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.backdrop ? movie.backdrop : movie.poster}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: "110%"
            }}></div>
            <div className='info-card'>

                <div className='poster-container'>
                    <div className='info-poster' style={{ backgroundImage: `url('https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster}')` }}>

                        <span className='info-rating'>{movie.vote}</span>
                    </div>

                </div>

                <div className='info-description'>
                    <span>{movie.video ? "Video" : "Movie"}</span>
                    <h2 >{movie.title}</h2>
                    <br />
                    <h2 >{movie.overview}</h2>
                </div>


            </div>

        </div >
    )
}

export default InfoCard;