/*De manera análoga a la MoviesList, este componente servirá para mostrar la lista de series*/
import React from 'react';
import SeriesCard from '../SeriesCard/SeriesCard'; // Crea un componente SeriesCard similar a MovieCard
import './SeriesList.scss';

//Componente serieslist
const SeriesList = ({ series, onSeriesClick }) => {
    return (
        <section className="series-list">
            {/*Mapeo de las series para crear la lista de las series y gestionar los clicks en ellas*/}
            {series.map((serie) => (
                <SeriesCard key={serie.id} serie={serie} onClick={() => onSeriesClick(serie.id)}/>
            ))}
        </section>
    );
};

export default SeriesList;