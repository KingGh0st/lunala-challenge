import axios from 'axios';

const API_KEY = '73ad3e6c621657fa79dcd77cc0821177';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
    const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    return response.data.results;
}