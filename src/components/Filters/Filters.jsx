import React, { useState } from 'react';
import './Filters.scss';

const Filters = ({ genres, onFilter, onSearch }) => {
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
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={handleSearch}
        />
        <select value={genre} onChange={handleGenreChange}>
            <option value="">Todos los géneros</option>
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