import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Carrusel.scss';

const Carrusel = ({ items, title, onItemClick }) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return null;
    }
    
    return (
        <section className="carrusel">
            <h2>{title}</h2>
            <div className="swiper-container">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{ clickable: true }}
                    loop={false}
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
                    {items.map((item) => (
                        <SwiperSlide key={item.id} onClick={() => onItemClick(item.id)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>   
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        </section>
    );
};

export default Carrusel;