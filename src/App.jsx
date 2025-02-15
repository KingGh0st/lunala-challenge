/*
Para abordar el challenge, decidí utilizar el enfoque que ofrece React de componentes separados y reutilizables.
Comencé analizando las interfaces de plataformas populares como Netflix, Amazon Prime Video y Disney+ para identificar los componentes clave que necesitaba implementar.
Inicialmente, identifiqué tres componentes principales: el Header, una "Herocard" (que representa la película más destacada promocionada en la plataforma) y una lista de películas,
la cual a su vez requería la creación de varios componentes de cartas de películas.
A medida que profundicé en los requisitos del challenge, reconocí la necesidad de implementar otros componentes, como un carrusel para mostrar las películas de manera dinámica,
filtros para permitir a los usuarios buscar contenido específico, y un modal que mostrara detalles adicionales sobre cada película o serie.
Aunque soy nuevo en SCSS/SASS, decidí aprenderlo sobre la marcha mientras desarrollaba la página. Gracias a mi sólida base en CSS,
el proceso fue más sencillo de lo esperado, y pude aprovechar las ventajas de SCSS, como la anidación de selectores y el uso de variables.
Para la integración de los componentes y la interactividad, me enfoqué en la experiencia del usuario.
Pensé en cómo me gustaría que se comportara la página al interactuar con cada componente. 
or ejemplo, implementé la funcionalidad de cerrar el modal al hacer clic fuera de él, lo cual mejora la usabilidad y sigue patrones comunes en aplicaciones modernas.
En cuanto al carrusel, investigué cuál sería la forma más eficiente de implementarlo. 
Encontré una solución open source llamada Swiper, una librería altamente personalizable y compatible con varias bibliotecas de JavaScript, incluyendo React.
Decidí integrar Swiper en la web debido a su facilidad de uso y su capacidad para manejar gestos táctiles y transiciones fluidas.
Para las animaciones y transiciones suaves, utilicé una combinación de CSS y una librería de JavaScript llamada Framer Motion. 
Aunque CSS me permitió implementar algunas animaciones básicas, Framer Motion resultó ser más adecuado para transiciones más complejas, como la animación de cierre del modal. 
Esta librería me permitió lograr un efecto más pulido y profesional que no pude alcanzar únicamente con CSS.
Para la navegación entre páginas, utilicé React Router Dom, una librería que permite manejar el enrutamiento en aplicaciones React.
Implementé rutas para la página inicial, así como para las páginas dedicadas a películas (MoviesPage) y series (SeriesPage). 
Además, actualicé la API para manejar la obtención de datos tanto de películas como de series, dependiendo de la página en la que el usuario se encontrara.
En cuanto a los filtros, diseñé un sistema que permite filtrar tanto películas como series. 
Decidí utilizar estados separados para los filtros de películas y series, lo que me permitió mantener la lógica de filtrado independiente para cada tipo de contenido. 
Actualicé la API para obtener todos los géneros disponibles, tanto para películas como para series, y pasé los estados de los filtros como parámetros a las páginas correspondientes. 
Esto permitió una experiencia de usuario más fluida y personalizada.
Finalmente, al pensar en el diseño, elegí una paleta de colores basada en tonos violeta y fucsia, combinados con gradientes sutiles. 
Para el modo claro, utilicé tonalidades claras de violeta y blanco, mientras que para el modo oscuro, opté por tonalidades más oscuras de violeta, grises y negros. 
Esta combinación no solo es visualmente atractiva, sino que también garantiza una buena legibilidad y contraste en ambos modos.
*/
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