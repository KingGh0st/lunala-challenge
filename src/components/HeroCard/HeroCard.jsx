/*Por lo general al lugar donde se mostrará una película o serie destacada se le llama Hero,
en este caso particular como tendrá forma de carta se llamará HeroCard*/
import React from 'react';
import './HeroCard.scss';

//Componente para mostrar la película más popular en la homepage
const HeroCard = ({ movie, onMoreInfoClick }) => {
    //Si no hay ninguna película popular el componente no se renderiza
    if (!movie) return null;

    return (
        <section className="herocard" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
            {/*La imagen, es decir el poster de la película en tendencia se muestra como fondo*/}
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="herocard-background"
            />
            {/*El contenido que se mostrará por encima de la imagen donde dará la información de la película*/}
            <div className="herocard-content">
                {/*Titulo de la película*/}
                <h1>{movie.title}</h1>
                {/*Descripción acortada de la película*/}
                <p>{movie.overview.substring(0, 300)}...</p>
                {/*Botones de reporudcir deshabilitado para simular plataforma de streaming*/}
                <button disabled>Reproducir</button>
                {/*Botón de más información para ver los detalles de la película en tendencia*/}
                <button onClick={ onMoreInfoClick }>Más información</button>
            </div>
        </section>
    );
};

export default HeroCard;