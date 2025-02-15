/*Este componente servirá para mostrar una tarjeta individual de una película*/
import React from 'react';
import './MovieCard.scss';

//Componente MovieCard que mostrará la foto y el título de la película con una pequeña descripción
const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            {/*Poster de la película*/}
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            {/*Título de la película*/}
            <h3>{movie.title}</h3>
            {/*Descripción de la película*/}
            <p>{movie.overview.substring(0, 100)}...</p>
        </div>
    );
};

export default MovieCard;