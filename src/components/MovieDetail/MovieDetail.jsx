/*Este componente sirve para agregar interactividad a la página. Cuando se hace click
en una película, se abrirá una ventana emergente (overlay) con más detalles de la misma*/
import React from 'react';
import './MovieDetail.scss';
import { motion, AnimatePresence } from 'framer-motion';//Importaciones para animaciones

//Componente MovieDetail: Muestra los detalles de una película en un overlay
const MovieDetail = ({ movie, onClose }) => {
    //Si no hay una película seleccionada, no renderiza nada
    if (!movie) return null;

    //Función para manejar el cierre del overlay cuando se hace click fuera del contenido
    const handleOverlayClick = (e) => {
        //Verifica si el click fue directamente en el overlay (no en el contenido interno)
        if (e.target === e.currentTarget) {
            onClose(); //Llama a la función onClose para cerrar el overlay
        }
    };

    return (
        //Componente AnimatePresence para manejar animaciones al montar y desmontar el overlay
        <AnimatePresence>
            {movie && (//Solo renderiza si hay una película seleccionada
                //Overlay con animación de opacidad
                <motion.div
                    className="modal-overlay"
                    onClick={handleOverlayClick}//Maneja el click en el overlay
                    initial={{ opacity: 0 }}//Estado inicial de la animación (invisible)
                    animate={{ opacity: 1 }}//Estado animado (visible)
                    exit={{ opacity: 0 }}//Estado al desmontar (invisible)
                    transition={{ duration: 0.3 }}//Duración de la animación
                >
                    {/*Contenido del modal con animación de escala y opacidad*/}
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.9, opacity: 0 }}//Estado inicial (escala reducida e invisible)
                        animate={{ scale: 1, opacity: 1 }}//Estado animado (escala normal y visible)
                        exit={{ scale: 0.9, opacity: 0 }}//Estado al desmontar (escala reducida e invisible)
                        transition={{ duration: 0.3 }}//Duración de la animación
                    >
                        {/*Botón para cerrar el overlay*/}
                        <button className="close-button" onClick={onClose}>×</button>

                        {/*Imagen de la película*/}
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />

                        {/*Título de la película*/}
                        <h2>{movie.title}</h2>

                        {/*Descripción de la película*/}
                        <p>{movie.overview}</p>

                        {/*Valoración de la película*/}
                        <p><strong>Valoración:</strong> {movie.vote_average}/10</p>

                        {/*Fecha de lanzamiento de la película*/}
                        <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>

                        {/*Géneros de la película*/}
                        <p>
                            <strong>Géneros:</strong>{" "}
                            {movie.genres?.map((genre) => genre.name).join(', ')}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MovieDetail;