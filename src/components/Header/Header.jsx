/*Este código es para el componente de la barra de navegación, navbar o header*/
import React from 'react';
import './Header.scss';

const Header = () => {return (
    <header className="header">
        <div className="logo">MiStreaming</div>
        <nav>
            <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/series">Series</a></li>
            <li><a href="/peliculas">Películas</a></li>
            </ul>
        </nav>
    </header>
    );
};

export default Header;