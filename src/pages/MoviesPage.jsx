import React from 'react';
import MovieList from '../components/MovieList/MovieList';
import { motion } from 'framer-motion';

const MoviesPage = ({ movies, onItemClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <MovieList movies={movies} onMovieClick={onItemClick}/>
        </motion.div>
    );
};

export default MoviesPage;