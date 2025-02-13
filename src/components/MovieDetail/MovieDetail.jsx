import React from 'react';
import './MovieDetail.scss';
import { motion, AnimatePresence } from 'framer-motion';

const MovieDetail = ({ movie, onClose }) => {
    if (!movie) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <AnimatePresence>
            {movie && (
                <motion.div
                    className="modal-overlay"
                    onClick={handleOverlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="close-button" onClick={onClose}>×</button>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p><strong>Valoración:</strong> {movie.vote_average}/10</p>
                        <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
                        <p><strong>Géneros:</strong> {movie.genres?.map((genre) => genre.name).join(', ')}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MovieDetail;