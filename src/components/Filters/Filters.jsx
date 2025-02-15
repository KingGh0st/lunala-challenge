/*Este componente se compone de una barra de busqueda y selección para filtrar
items en base a los géneros de los mismos*/
import React, { useState } from 'react';
import './Filters.scss';

//Componente Filtro que muestra la barra de búsqueda
const Filters = ({ genres, onFilter, onSearch, isMenuOpen }) => {
    //Estados para gestionar la selección de géneros y la búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');

    //Función para manejar el campo de búsqueda
    const handleSearch = (e) => {
        setSearchTerm(e.target.value); //Actualiza el estado del término de búsqueda
        onSearch(e.target.value); //Llama a la función onSearch pasada como prop con el nuevo término
    };

    //Función para manejar el campo de género
    const handleGenreChange = (e) => {
        setGenre(e.target.value); //Actualiza el estado del género seleccionado
        onFilter(e.target.value); //Llama a la función onfilter pasada como prop con el género
    };

    return (
        <div className={`filters ${isMenuOpen ? "open" : ""}`}>
            {/*Input para buscar por título*/}
            <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm} //Valor controlado por el estado searchTerm
                onChange={handleSearch}//Maneja cambios en el input
            />
            {/*Select para filtrar por género*/}
            <select value={genre} onChange={handleGenreChange}>
                <option value="">Todos los géneros</option> {/*Opción por defecto*/}
                {/*Mapeo de géneros para crear las opciones del select*/}
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;