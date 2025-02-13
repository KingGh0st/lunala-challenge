/*Este código es para el componente de la barra de navegación, navbar o header*/
import React from 'react';
import './Header.scss';

const Header = ({ toggleTheme }) => {return (
    <header className="header">
        <div className="logo"><a href="/">Lunala Streaming</a></div>
        <nav>
            <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/series">Series</a></li>
            <li><a href="/peliculas">Películas</a></li>
            <li><button onClick={toggleTheme}>Modo día/noche</button></li>
            </ul>
        </nav>
    </header>
    );
};

export default Header;