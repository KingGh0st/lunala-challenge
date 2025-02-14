/*Este código es para el componente de la barra de navegación, navbar o header*/
import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters.jsx';

const Header = ({ toggleTheme, genres, onFilter, onSearch }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <header className="header">
        <div className="logo">
            <Link to="/">Challenge</Link>
        </div>
        <Filters genres={genres} onFilter={onFilter} onSearch={onSearch}/>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
        </div>
        <nav>
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li><Link to="/series" onClick={() => setMenuOpen(false)}>Series</Link></li>
                <li><Link to="/peliculas" onClick={() => setMenuOpen(false)}>Películas</Link></li>
                <li><button onClick={toggleTheme} className="theme-toggle">Cambiar tema</button></li>
            </ul>
        </nav>
    </header>
    );
};

export default Header;