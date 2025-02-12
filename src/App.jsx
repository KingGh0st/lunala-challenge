import React, { useEffect,useState } from 'react';
import { fetchMovies } from './services/api';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieList from './components/MovieList';
import './App.scss';

const App = () => {
  const [movies, setMovies] = useState([]);
  
};