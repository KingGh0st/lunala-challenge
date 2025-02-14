import React, { useEffect,useState } from 'react';
import { fetchMovies, fetchMovieDetails, fetchSeries, fetchSerieDetails } from './services/api';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Carrusel from './components/Carrusel/Carrusel.jsx';
import HeroCard from './components/HeroCard/HeroCard.jsx'
import MovieList from './components/MovieList/MovieList.jsx';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Filters from './components/Filters/Filters.jsx';
import SeriesPage from './pages/SeriesPage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import './App.scss';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Integración del cambio de tema oscuro y tema claro
  const toggleTheme = () =>{
    setIsDarkMode(!isDarkMode);
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

  const handleItemClick = async (itemId, isSeries = false) => {
    const itemDetails = isSeries ? await fetchSerieDetails(itemId) : await fetchMovieDetails(itemId);
    setSelectedItem(itemDetails);
    setIsModalOpen(true);
  }

  const handleMoreInfoClick = () => {
    if (featuredMovie) {
      setSelectedItem(featuredMovie);
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  // Usado para obtener específicamente películas populares
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

  useEffect(() => {
    const getSeries = async () => {
      const popularSeries= await fetchSeries('/tv/popular');
      setSeries(popularSeries);
    };
    getSeries();
  }, []);

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header toggleTheme={toggleTheme} onFilter={handleFilter} onSearch={handleSearch}/>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {featuredMovie && <HeroCard movie={featuredMovie} onMoreInfoClick={() => handleMoreInfoClick(featuredMovie.id)}/>}
                <Carrusel items={filteredMovies.length > 0 ? filteredMovies : movies} title="Películas destacadas" onItemClick={(itemId) => handleItemClick(itemId)}/>
                <MovieList movies={filteredMovies.length > 0 ? filteredMovies : movies} onMovieClick={(itemId) => handleItemClick(itemId)}/>
              </>
            }
          />
          <Route 
            path='/peliculas'
            element={<>
              <Carrusel items={movies} title="Películas destacadas" onItemClick={(itemId) => handleItemClick(itemId)}/>
              <MoviesPage movies={movies} onItemClick={(itemId) => handleItemClick(itemId)}/>
              </>
            }
          />
          <Route 
            path='/series'
            element={<>
              <Carrusel items={series} title="Series destacadas" onItemClick={(itemId) => handleItemClick(itemId, true)}/>
              <SeriesPage series={series} onItemClick={(itemId) => handleItemClick(itemId, true)}/>
              </>
            }
          />
        </Routes>
        {isModalOpen && <MovieDetail movie={selectedItem} onClose={handleCloseModal}/>}
      </div>
    </Router>
  );
};

export default App;