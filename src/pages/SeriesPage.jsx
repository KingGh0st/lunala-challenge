import React, { useState, useEffect } from 'react';
import SeriesList from '../components/SeriesList/SeriesList';
import Filters from '../components/Filters/Filters'; 

const SeriesPage = ({ series,  onItemClick }) => {
    const [filteredSeries, setFilteredSeries] = useState(series);

    useEffect(() => {
        setFilteredSeries(series); // Reinicia la lista al cambiar de página
    }, [series]);

    const handleSeriesFilter = (genre) => {
        const filtered = genre
            ? series.filter((serie) => serie.genre_ids.includes(Number(genre)))
            : series;
        setFilteredSeries(filtered);
    };

    const handleSeriesSearch = (term) => {
        const filtered = series.filter((serie) =>
            serie.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSeries(filtered);
    };

    return (
        <div>
            <SeriesList series={filteredSeries} onSeriesClick={onItemClick} />
        </div>
    );
};

export default SeriesPage;
