/*Esta es la página donde se mostrarán exclusivamente las películas*/
import React from 'react';
import MovieList from '../components/MovieList/MovieList';//Importa el componente MovieList
import { motion } from 'framer-motion';//Importa motion de framer-motion para animaciones

//Componente MoviesPage: Página dedicada a mostrar una lista de películas
const MoviesPage = ({ movies, onItemClick }) => {
    return (
        //Contenedor animado con motion.div para transiciones suaves
        <motion.div 
            initial={{ opacity: 0 }}//Estado inicial de la animación (invisible)
            animate={{ opacity: 1 }}//Estado animado (visible)
            exit={{ opacity: 0 }}//Estado al salir (invisible)
            transition={{ duration: 0.5 }}//Duración de la animación (0.5 segundos)
        >
            {/*Componente MovieList que muestra la lista de películas*/}
            <MovieList 
                movies={movies}//Pasa la lista de películas como prop
                onMovieClick={onItemClick}//Pasa la función para manejar el click en una película
            />
        </motion.div>
    );
};

export default MoviesPage;//Exporta el componente MoviesPage como predeterminado