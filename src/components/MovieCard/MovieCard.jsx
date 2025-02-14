/*Este componente servirá para mostrar una tarjeta individual de una película o serie*/
import React from 'react';
import './MovieCard.scss';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview.substring(0, 100)}...</p>
        </div>
    );
};

export default MovieCard;