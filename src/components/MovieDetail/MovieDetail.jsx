import React from 'react';
import './MovieDetailsModal.scss';

const MovieDetailsModal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>×</button>
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Valoración: {movie.vote_average}/10</p>
        </div>
        </div>
    );
};

export default MovieDetailsModal;