import React, { useEffect,useState } from 'react';
import { fetchMovies, fetchMovieDetails } from './services/api';
import Header from './components/Header/Header.jsx';
import Carrusel from './components/Carrusel/Carrusel.jsx';
import HeroCard from './components/HeroCard/HeroCard.jsx'
import MovieList from './components/MovieList/MovieList.jsx';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Filters from './components/Filters/Filters.jsx';
import './App.scss';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Integración del cambio de tema oscuro y tema claro
  const toggleTheme = () =>{
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }

  //Integración de los filtros
  const handleFilter = (genre) => {
    const filtered = movies.filter((movie) => movie.genre_ids.includes(Number(genre)));
    setFilteredMovies(filtered.length > 0 ? filtered : movies);
  }

  //Integración de la búsqueda
  const handleSearch = (term) => {
    const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered)
  }

  const handleMovieClick = async (movieId) =>{
    const movieDetails = await fetchMovieDetails(movieId);
    setSelectedMovie(movieDetails);
    setIsModalOpen(true);
  }

  const handleMoreInfoClick = () => {
    if (featuredMovie) {
      setSelectedMovie(featuredMovie);
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchMovies('/movie/popular');
      const trendingMovies = await fetchMovies('/trending/movie/day');
      setMovies(popularMovies);
      setFeaturedMovie(popularMovies[0]);
      setTrendingMovies(trendingMovies);
    };
    getMovies();
  }, []);

  return (
    <div className={"app ${isDarkMode ? 'dark-mode' : 'light-mode'}"}>
      <Header toggleTheme={toggleTheme}/>
      <Filters onFilter={handleFilter} onSearch={handleSearch}/>
      {featuredMovie && <HeroCard movie={featuredMovie} onMoreInfoClick={handleMoreInfoClick}/>}
      <Carrusel movies={trendingMovies} title="Destacadas" onMovieClick={handleMovieClick}/>
      <MovieList movies={movies} onMovieClick={handleMovieClick}/>
      {isModalOpen && <MovieDetail movie={selectedMovie} onClose={handleCloseModal}/>}
    </div>
  );
};

export default App;