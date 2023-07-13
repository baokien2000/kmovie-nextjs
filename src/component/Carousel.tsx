import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ImovieList } from "../repositories/interface/movie";
import MovieCard from "./MovieCard";

var menu = ['Slide 1', 'Slide 2', 'Slide 3'];

const Carousel = (props: { movies: ImovieList }) => {
    const { movies } = props;
    return (
        <Swiper
            // @ts-ignore
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={10}
            loop={true}
            speed={500}
            className="w-[calc(100vw-20px)] sm:w-full"
            scrollbar={{
                hide: false,
                // draggable: true,                
              }}
 
            initialSlide={3}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            centeredSlides={true}

            // pagination={{
            //     clickable: true,
            //     dynamicBullets: true,
            //                 }}

            breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 5 }, // when window width is >= 640px
                360: { slidesPerView: 2, spaceBetween: 20 }, // when window width is >= 768px
                1023: { slidesPerView: 3 }, // when window width is >= 768px
                1223: { slidesPerView: 5 }, // when window width is >= 768px
                1623: { slidesPerView: 5 }, // when window width is >= 768px
            }}
            style={{ borderRadius: "5px" }}
        >
            {movies.items.map((item) => (
                <SwiperSlide key={item._id}>
                    <MovieCard key={item._id} movie={item} ImagePath={movies.pathImage} className="w-full h-64" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
