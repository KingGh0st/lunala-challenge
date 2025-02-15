/*Este componente sirve para mostrar las series más destacadas en forma de carrusel interactivo
con flechas para navegar a izquierda y derecha, y también deslizando*/
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Carrusel.scss';

//Componente Carrusel que muestra un carrusel de elementos
const Carrusel = ({ items, title, onItemClick }) => {
    //Verifica si los items son válidos y si es un array no vacío
    if (!items || !Array.isArray(items) || items.length === 0) {
        return null; //En el caso de que no hubiera items en el array, el carrusel no se renderizará en la app
    }
    
    return (
        <section className="carrusel">
            {/*Título del carrusel*/}
            <h2>{title}</h2>
            <div className="swiper-container">
                {/*Componente swiper para el carrusel, es el que se encarga de la navegación y la correcta muestra de los items*/}
                <Swiper
                    modules={[Navigation]} //Módulo del swiper para navegación
                    spaceBetween={20} //Espacio entre las imágenes
                    slidesPerView={4} //Imágenes visibles
                    navigation={{
                        nextEl: '.swiper-button-next', //Flecha de siguiente item
                        prevEl: '.swiper-button-prev', //Flecha de item previo
                    }}
                    pagination={{ clickable: true }}//Paginación del swiper, con opción de clickeable
                    loop={false}//Loop infinito desactivado, dado que el loop solo está disponible con más de 4 imágenes
                    //Esto sirve para controlar cuantas películas son visibles en función de la resolución
                    breakpoints={{
                        //Cuando el ancho de la pantalla es >= 320px
                        320: {slidesPerView: 2},
                        //Cuando el ancho de la pantalla es >= 768px
                        768: {slidesPerView: 3},
                        //Cuando el ancho de la pantalla es >= 1024px
                        1024: {slidesPerView: 4},
                    }}
                >   {/*Mapeo de items para el carrusel*/}
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