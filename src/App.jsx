import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';//Para animaciones al montar/desmontar componentes
import { fetchMovies, fetchMovieDetails, fetchSeries, fetchSerieDetails, fetchGenres } from './services/api';//Funciones para obtener datos de la API
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';//Para manejar rutas en la aplicación
import Header from './components/Header/Header.jsx';//Componente del encabezado
import Carrusel from './components/Carrusel/Carrusel.jsx';//Componente del carrusel
import HeroCard from './components/HeroCard/HeroCard.jsx';//Componente de la tarjeta destacada
import MovieList from './components/MovieList/MovieList.jsx';//Componente de la lista de películas
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';//Componente de detalles de película/serie
import Filters from './components/Filters/Filters.jsx';//Componente de filtros
import SeriesPage from './pages/SeriesPage.jsx';//Página de series
import MoviesPage from './pages/MoviesPage.jsx';//Página de películas
import './App.scss';//Estilos globales de la aplicación

const App = () => {
  //Estados para manejar los datos de la aplicación
  const [movies, setMovies] = useState([]);//Lista de películas
  const [series, setSeries] = useState([]);//Lista de series
  const [moviesGenres, setMoviesGenres] = useState([]);//Géneros de películas
  const [seriesGenres, setSeriesGenres] = useState([]);//Géneros de series
  const [featuredMovie, setFeaturedMovie] = useState(null);//Película destacada
  const [trendingMovies, setTrendingMovies] = useState([]);//Películas en tendencia
  const [isDarkMode, setIsDarkMode] = useState(true);//Estado del tema (oscuro/claro)
  const [filteredMovies, setFilteredMovies] = useState([]);//Películas filtradas
  const [filteredSeries, setFilteredSeries] = useState([]);//Series filtradas
  const [selectedItem, setSelectedItem] = useState(null);//Película/serie seleccionada para ver detalles
  const [isModalOpen, setIsModalOpen] = useState(false);//Estado del modal de detalles

  //Función para alternar entre tema oscuro y claro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Función para filtrar películas o series por género
  const handleFilter = (genre) => {
    if (window.location.pathname === "/series") {
      //Filtra series si estamos en la página de series
      const filtered = genre
        ? series.filter((s) => s.genre_ids.includes(Number(genre)))
        : series;
      setFilteredSeries(filtered);
    } else {
      //Filtra películas si estamos en la página de películas
      const filtered = genre
        ? movies.filter((m) => m.genre_ids.includes(Number(genre)))
        : movies;
      setFilteredMovies(filtered);
    }
  };

  //Función para buscar películas o series por título
  const handleSearch = (term) => {
    if (window.location.pathname === "/series") {
      //Busca series si estamos en la página de series
      const filtered = series.filter((s) =>
        s.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSeries(filtered);
    } else {
      //Busca películas si estamos en la página de películas
      const filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  //Función para manejar el click en una película o serie
  const handleItemClick = async (itemId, isSeries = false) => {
    // Obtiene los detalles de la película o serie seleccionada
    const itemDetails = isSeries
      ? await fetchSerieDetails(itemId)
      : await fetchMovieDetails(itemId);
    setSelectedItem(itemDetails); // Guarda los detalles en el estado
    setIsModalOpen(true); // Abre el modal de detalles
  };

  //Función para manejar el click en "Más información" de la película destacada
  const handleMoreInfoClick = () => {
    if (featuredMovie) {
      setSelectedItem(featuredMovie);//Establece la película destacada como seleccionada
      setIsModalOpen(true);//Abre el modal de detalles
    }
  };

  //Función para cerrar el modal de detalles
  const handleCloseModal = () => {
    setIsModalOpen(false);//Cierra el modal
    setSelectedItem(null);//Limpia la película/serie seleccionada
  };

  //Efecto para cargar los géneros de películas y series al montar el componente
  useEffect(() => {
    const loadGenres = async () => {
      const moviesGenresList = await fetchGenres('movie');//Obtiene géneros de películas
      const seriesGenresList = await fetchGenres('tv');//Obtiene géneros de series
      setMoviesGenres(moviesGenresList);//Guarda los géneros de películas
      setSeriesGenres(seriesGenresList);//Guarda los géneros de series
    };
    loadGenres();
  }, []);

  //Efecto para cargar películas populares y en tendencia al montar el componente
  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchMovies('/movie/popular');//Obtiene películas populares
      const trendingMovies = await fetchMovies('/trending/movie/day');//Obtiene películas en tendencia
      setMovies(popularMovies);//Guarda las películas populares
      setFeaturedMovie(popularMovies[0]);//Establece la primera película como destacada
      setTrendingMovies(trendingMovies);//Guarda las películas en tendencia
    };
    getMovies();
  }, []);

  //Efecto para cargar series populares al montar el componente
  useEffect(() => {
    const getSeries = async () => {
      const popularSeries = await fetchSeries('/tv/popular');//Obtiene series populares
      setSeries(popularSeries);//Guarda las series populares
    };
    getSeries();
  }, []);

  return (
    <AnimatePresence>
      <Router>
        {/*Contenedor principal de la aplicación con clase dinámica según el tema*/}
        <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          {/*Componente del encabezado*/}
          <Header
            toggleTheme={toggleTheme}//Función para cambiar el tema
            genres={moviesGenres}//Géneros de películas
            onFilter={handleFilter}//Función para filtrar
            onSearch={handleSearch}//Función para buscar
          />
          {/*Rutas de la aplicación*/}
          <Routes>
            {/*Ruta principal (inicio)*/}
            <Route
              path='/'
              element={
                <>
                  {/*Muestra la tarjeta destacada si hay una película destacada o en tendencia*/}
                  {featuredMovie && (
                    <HeroCard
                      movie={featuredMovie}
                      onMoreInfoClick={() => handleMoreInfoClick(featuredMovie.id)}
                    />
                  )}
                  {/*Carrusel de películas destacadas*/}
                  <Carrusel
                    items={filteredMovies.length > 0 ? filteredMovies : movies}
                    title="Películas destacadas"
                    onItemClick={(itemId) => handleItemClick(itemId)}
                  />
                  {/*Lista de películas*/}
                  <MovieList
                    movies={filteredMovies.length > 0 ? filteredMovies : movies}
                    onMovieClick={(itemId) => handleItemClick(itemId)}
                  />
                </>
              }
            />
            {/*Ruta de películas*/}
            <Route
              path='/peliculas'
              element={
                <>
                  {/*Carrusel de películas destacadas*/}
                  <Carrusel
                    items={movies}
                    title="Películas destacadas"
                    onItemClick={(itemId) => handleItemClick(itemId)}
                  />
                  {/*Página de películas*/}
                  <MoviesPage
                    movies={filteredMovies.length ? filteredMovies : movies}
                    onItemClick={(itemId) => handleItemClick(itemId)}
                  />
                </>
              }
            />
            {/*Ruta de series*/}
            <Route
              path='/series'
              element={
                <>
                  {/*Carrusel de series destacadas*/}
                  <Carrusel
                    items={series}
                    title="Series destacadas"
                    onItemClick={(itemId) => handleItemClick(itemId, true)}
                  />
                  {/*Página de series*/}
                  <SeriesPage
                    series={filteredSeries.length ? filteredSeries : series}
                    seriesGenres={seriesGenres}
                    onItemClick={(itemId) => handleItemClick(itemId, true)}
                  />
                </>
              }
            />
          </Routes>
          {/*Modal de detalles de película/serie*/}
          {isModalOpen && (
            <MovieDetail
              movie={selectedItem}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </Router>
    </AnimatePresence>
  );
};

export default App;//Exporta el componente App como predeterminado