/*Este componente servirá para mostrar la lista de las películas*/
import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieList.scss';

//Componente movielist
const MovieList = ({ movies, onMovieClick }) => {
    return (
        <section className="movie-list">
            {/*Mapeo de las películas para crear la lista de películas y gestionar los clicks en ellas*/}
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie.id)}/>
            ))}
        </section>
    );
};

export default MovieList;