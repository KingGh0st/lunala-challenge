/*Este código es para el componente de la barra de navegación, navbar o header*/
import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme }) => {return (
    <header className="header">
        <div className="logo">
            <Link to="/">Lunala Streaming</Link>
        </div>
        <nav>
            <ul className="nav-links">
                <li><Link to="/series">Series</Link></li>
                <li><Link to="/peliculas">Películas</Link></li>
                <li><button onClick={toggleTheme}>Modo día/noche</button></li>
            </ul>
        </nav>
    </header>
    );
};

export default Header;