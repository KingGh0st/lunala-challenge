import React, { useEffect,useState } from 'react';
import { fetchMovies } from './services/api';
import Header from './components/Header/Header.jsx';
import Carrusel from './components/Carrusel/Carrusel.jsx';
import HeroCard from './components/HeroCard/HeroCard.jsx'
import MovieList from './components/MovieList/MovieList.jsx';
import './App.scss';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () =>{
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies('/movie/popular');
      setMovies(data);
      setFeaturedMovie(data[0]);
    };
    getMovies();
  }, []);

  return (
    <div className={"app ${isDarkMode ? 'dark-mode' : 'light-mode'}"}>
      <Header toggleTheme={toggleTheme}/>
      {featuredMovie && <HeroCard movie={featuredMovie} />}
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default App;