import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Carousel.scss';

const Carousel = ({ movies }) => {
    return (
    <Swiper
        spaceBetween={10}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        loop>
        {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            </SwiperSlide>
        ))}
        </Swiper>
    );
};

export default Carousel;