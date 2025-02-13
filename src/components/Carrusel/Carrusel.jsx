import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Carrusel.scss';

const Carrusel = ({ movies, title }) => {
    return (
        <section className="carrusel">
        <h2>{title}</h2>
        <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            loop
            //Esto sirve para controlar cuantas películas son visibles en función de la resolución
            breakpoints={{
                // Cuando el ancho de la pantalla es >= 320px
                320: {slidesPerView: 2},
                // Cuando el ancho de la pantalla es >= 768px
                768: {slidesPerView: 3},
                // Cuando el ancho de la pantalla es >= 1024px
                1024: {slidesPerView: 4},
            }}
        >
            {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                />
            </SwiperSlide>
            ))}
        </Swiper>
    </section>
    );
};

export default Carrusel;