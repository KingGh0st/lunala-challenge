//Este es el código para la página destinada a mostrar solamente las series

import React, { useState, useEffect } from 'react';
import SeriesList from '../components/SeriesList/SeriesList';
import Filters from '../components/Filters/Filters'; 
import { motion } from 'framer-motion';

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
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <SeriesList series={filteredSeries} onSeriesClick={onItemClick} />
        </motion.div>    
    );
};

export default SeriesPage;
