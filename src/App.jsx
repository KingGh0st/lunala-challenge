import React, { useEffect,useState } from 'react';
import { fetchMovies, fetchMovieDetails, fetchSeries, fetchSerieDetails, fetchGenres} from './services/api';
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
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Integración del cambio de tema oscuro y tema claro
  const toggleTheme = () =>{
    setIsDarkMode(!isDarkMode);
  }

  //Integración de los filtros
  const handleFilter = (genre) => {
    if (window.location.pathname === "/series") {
      const filtered = genre
        ? series.filter((s) => s.genre_ids.includes(Number(genre)))
        : series;
      setFilteredSeries(filtered);
    } else {
      const filtered = genre
        ? movies.filter((m) => m.genre_ids.includes(Number(genre)))
        : movies;
      setFilteredMovies(filtered);
    }
  };

  // Integración de la búsqueda para películas y series
  const handleSearch = (term) => {
    if (window.location.pathname === "/series") {
      const filtered = series.filter((s) =>
        s.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSeries(filtered);
    } else {
      const filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

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

  // Usado para obtener los géneros que ofrece la API
  useEffect(() => {
    const loadGenres = async () => {
      const moviesGenresList = await fetchGenres('movie');
      const seriesGenresList = await fetchGenres('tv');
      setMoviesGenres(moviesGenresList);
      setSeriesGenres(seriesGenresList);
    };
    loadGenres();
  }, [])

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
  }, [])

  useEffect(() => {
    const getSeries = async () => {
      const popularSeries= await fetchSeries('/tv/popular');
      setSeries(popularSeries);
    };
    getSeries();
  }, [])

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header toggleTheme={toggleTheme} genres={moviesGenres} onFilter={handleFilter} onSearch={handleSearch}/>
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
                <MoviesPage movies={filteredMovies.length ? filteredMovies : movies} onItemClick={(itemId) => handleItemClick(itemId)}/>
              </>
            }
          />
          <Route 
            path='/series'
            element={<>
                <Carrusel items={series} title="Series destacadas" onItemClick={(itemId) => handleItemClick(itemId, true)}/>
                <SeriesPage series={filteredSeries.length ? filteredSeries : series} seriesGenres={seriesGenres} onItemClick={(itemId) => handleItemClick(itemId, true)}/>
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