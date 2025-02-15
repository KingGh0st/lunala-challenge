/*De manera análoga a la moviecard, este componente servirá para mostrar
una tarjeta individual de una serie*/
import React from 'react';
import './SeriesCard.scss';

//Componente de la seriescard
const SeriesCard = ({ serie, onClick }) => {
    return (
        <div className="series-card" onClick={onClick}>
            {/*Poster que se usará como imágen para la serie*/}
            <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
            />
            {/*Nombre de la serie*/}
            <h3>{serie.name}</h3>
            {/*Descripción de la serie*/}
            <p>{serie.overview.substring(0,100)}...</p>
        </div>
    );
};

export default SeriesCard;