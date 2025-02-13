import React from 'react';
import './MovieDetail.scss';

const MovieDetailModal = ({ movie, onClose }) => {
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
                <p><strong>Valoración:</strong> {movie.vote_average}/10</p>
                <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
                <p><strong>Géneros:</strong> {movie.genres?.map((genre) => genre.name).join(', ')}</p>
            </div>
        </div>
    );
};

export default MovieDetailModal;