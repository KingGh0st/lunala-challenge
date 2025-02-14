import React from 'react';
import MovieList from '../components/MovieList/MovieList';

const MoviesPage = ({ movies, onItemClick }) => {
    return (
        <div>
            <MovieList movies={movies} onMovieClick={onItemClick}/>
        </div>
    );
};

export default MoviesPage;