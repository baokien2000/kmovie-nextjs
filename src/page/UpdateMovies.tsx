import React, { useEffect, useState } from "react";
import { UpdateMoviesAPI, getKMovie, getMovie } from "../repositories/api/movie";
import { ImovieList } from "../repositories/interface/movie";

const UpdateMovies = () => {
    const [page, setPage] = useState<number>(parseInt("200"));
    const [movies, setMovies] = useState<ImovieList>();

    // useEffect(() => {
    //     getKMovie(page, 24, "", (data) => {
    //         if (data) {
    //             // setMovies(data)
    //             data.items.forEach(item => {
    //                 getMovie(
    //                     item.slug,
    //                     (movie) => {
    //                         const payload = {
    //                             ...item,
    //                             category: movie.movie.category,
    //                             episode_current: movie.movie.episode_current,
    //                             episode_total: movie.movie.episode_total
    //                         }
    //                         UpdateMoviesAPI(payload, (res) => {
    //                             console.count("success !");
    //                         })
    //                     }
    //                 );
                    
    //             })
    //             if (page < 948) {
    //                 setPage(pre => pre + 1)
    //             }
    //         }
    //     })

    //     // modified: { time: "2023-07-05T16:04:54.000Z" },
    //     // name: "Cầm Tù",
    //     // origin_name: "Esaret",
    //     // poster_url: "cam-tu-poster.jpg",
    //     // slug: "cam-tu",
    //     // thumb_url: "cam-tu-thumb.jpg",
    //     // year: 2022,
    //     // _id: "6404b7820fc1635bd467951c",

    //     // const payload = {
    //     //     name: "Cầm Tù",
    //     //     // origin_name: "Esaret",
    //     //     poster_url: "cam-tu-poster.jpg",
    //     //     slug: "cam-tu",
    //     //     thumb_url: "cam-tu-thumb.jpg",
    //     //     year: 2022,
    //     //     _id: "6404b7820fc1635bd467951c",
    //     //     episode_current: "Tập 1",
    //     //     episode_total: "Tập 2",
    //     //     category: [{
    //     //         id: "Test",
    //     //         name: "Hành động",
    //     //         slug: 'hanh-dong',
    //     //     }],
    //     // };
    //     // UpdateMoviesAPI(payload, (res) => {
    //     //     console.count("call");
    //     // });
    // }, [page]);

    return <div className="h-[100vh] text-white text-[40px] mt-[100px]">{page}</div>;
};

export default UpdateMovies;
