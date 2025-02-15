/*Este es la página destinada a mostrar exclusivamente las series*/

import React, { useState, useEffect } from 'react';
import SeriesList from '../components/SeriesList/SeriesList'; //Importa el componente SeriesList
import Filters from '../components/Filters/Filters'; //Importa el componente Filters para filtrar y buscar
import { motion } from 'framer-motion';//Importa motion de framer-motion para animaciones

//Componente SeriesPage: Página dedicada a mostrar una lista de series con funcionalidades de filtrado y búsqueda
const SeriesPage = ({ series, onItemClick }) => {
    //Estado para almacenar la lista de series filtradas
    const [filteredSeries, setFilteredSeries] = useState(series);

    //Efecto para reiniciar la lista de series filtradas cuando cambia la lista original de series
    useEffect(() => {
        setFilteredSeries(series);//Actualiza filteredSeries con la lista de series original
    }, [series]);

    //Función para filtrar las series por género
    const handleSeriesFilter = (genre) => {
        const filtered = genre
            ? series.filter((serie) => serie.genre_ids.includes(Number(genre)))//Filtra las series que incluyen el género seleccionado
            : series;//Si no se selecciona un género, muestra todas las series
        setFilteredSeries(filtered);//Actualiza el estado con las series filtradas
    };

    //Función para buscar series por título
    const handleSeriesSearch = (term) => {
        const filtered = series.filter((serie) =>
            serie.name.toLowerCase().includes(term.toLowerCase())//Filtra las series cuyo título coincide con el término de búsqueda
        );
        setFilteredSeries(filtered);//Actualiza el estado con las series filtradas
    };

    return (
        //Contenedor animado con motion.div para transiciones suaves
        <motion.div 
            initial={{ opacity: 0 }}//Estado inicial de la animación (invisible)
            animate={{ opacity: 1 }}//Estado animado (visible)
            exit={{ opacity: 0 }}//Estado al salir (invisible)
            transition={{ duration: 0.5 }}//Duración de la animación (0.5 segundos)
        >
            {/*Componente SeriesList que muestra la lista de series filtradas*/}
            <SeriesList 
                series={filteredSeries}//Pasa la lista de series filtradas como prop
                onSeriesClick={onItemClick}//Pasa la función para manejar el click en una serie
            />
        </motion.div>    
    );
};

export default SeriesPage;//Exporta el componente SeriesPage como predeterminado