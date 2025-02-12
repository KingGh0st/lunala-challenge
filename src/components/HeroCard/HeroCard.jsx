/*Por lo general al lugar donde se mostrará una película o serie destacada se le llama Hero,
en este caso particular como tendrá forma de carta se llamará HeroCard*/
import React from 'react';
import './HeroCard.scss';

const HeroCard = ({ movie }) => {
    if (!movie) return null;

    return (
        <section className="herocard">
        <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="hero-background"
        />
        <div className="hero-content">
            <h1>{movie.title}</h1>
            <p>{movie.overview.substring(0, 150)}...</p>
            <button>Reproducir</button>
            <button>Más información</button>
        </div>
        </section>
    );
};

export default HeroCard;