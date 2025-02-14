import React from 'react';
import './SeriesCard.scss';

const SeriesCard = ({ serie, onClick }) => {
    return (
        <div className="series-card" onClick={onClick}>
        <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
        />
        <h3>{serie.name}</h3>
        <p>{serie.overview.substring(0,100)}...</p>
        </div>
    );
};

export default SeriesCard;