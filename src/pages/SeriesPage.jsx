import React from 'react';
import SeriesList from '../components/SeriesList/SeriesList';

const SeriesPage = ({ series, onItemClick }) => {
    return (
        <div>
            <SeriesList series={series} onSeriesClick={onItemClick} />
        </div>
    );
};

export default SeriesPage;