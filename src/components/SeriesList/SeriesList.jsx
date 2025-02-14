import React from 'react';
import SeriesCard from '../SeriesCard/SeriesCard'; // Crea un componente SeriesCard similar a MovieCard
import './SeriesList.scss';

const SeriesList = ({ series, onSeriesClick }) => {
    return (
        <section className="series-list">
            {series.map((serie) => (
                <SeriesCard key={serie.id} serie={serie} onClick={() => onSeriesClick(serie.id)}/>
            ))}
        </section>
    );
};

export default SeriesList;