/*Este componente servirá para mostrar la lista de las películas*/
import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieList.scss';

const MovieList = ({ movies, onMovieClick }) => {
    return (
        <section className="movie-list">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)}/>
        ))}
        </section>
    );
};

export default MovieList;