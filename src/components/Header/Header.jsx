import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters.jsx';

// Componente del header, que muestra la barra de navegación con distintos parámetros para los filtros
const Header = ({ toggleTheme, genres, onFilter, onSearch }) => {
    // Estado para gestionar si el menú de hamburguesa está abierto o cerrado
    const [menuOpen, setMenuOpen] = useState(false);

    console.log("Estado del menú:", menuOpen);

    return (
        <header className="header">
            {/* Título o logo de la página */}
            <div className="logo">
                <Link to="/">Challenge</Link>
            </div>

            {/* Barra de búsqueda y selección de género (visible solo en pantallas grandes) */}
            <Filters genres={genres} onFilter={onFilter} onSearch={onSearch} isMenuOpen={menuOpen}/>

            {/* Menú hamburguesa (visible solo en pantallas pequeñas) */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Links de navegación y botón para cambiar de tema */}
            <nav>
                <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <li>
                        <Link to="/series" onClick={() => setMenuOpen(false)}>Series</Link>
                    </li>
                    <li>
                        <Link to="/peliculas" onClick={() => setMenuOpen(false)}>Películas</Link>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className="theme-toggle">Cambiar tema</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;