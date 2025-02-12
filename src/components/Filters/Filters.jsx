import React, { useState } from 'react';
import './Filters.scss';

const Filters = ({ onFilter, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <div className="filters">
        <input
            type="text"
            placeholder="Buscar por título?"
            value={searchTerm}
            onChange={handleSearch}
        />
        <select value={genre} onChange={handleGenreChange}>
            <option value="">Todos los géneros</option>
            <option value="28">Acción</option>
            <option value="12">Aventura</option>
        </select>
        </div>
    );
};

export default Filters;