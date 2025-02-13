import axios from 'axios';

const API_KEY = '73ad3e6c621657fa79dcd77cc0821177';
const BASE_URL = 'https://api.themoviedb.org/3';

//Función base para obtener datos de las películas, agregado al inicio.
export const fetchMovies = async (endpoint) => {
    const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-MX`);
    return response.data.results;
}

//Función base para obtener detalles específicos para la vista con detalles de las películas, agregado junto a esta función.
export const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`);
    return response.data;
}