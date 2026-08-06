import React, { useEffect, useMemo, useState } from "react";
import { AddMovie, UpdateBlurImageAPI, UpdateMoviesAPI, getKMovie, getMovie, getMoviePerPage } from "../repositories/api/movie";
import { ImovieList } from "../repositories/interface/movie";
import { useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";

const UpdateMovies = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "176"));
  const [processPage, setProcess] = useState<number>(0);
  const [success, setSuccess] = useState<number>(0);

  const [errorMovies, setErrorMovies] = useState<string[]>([]);

  // useEffect(() => {

  //     //===================== Update New Movie ===============

  //     getMoviePerPage(page.toString(), (data) => {
  //         if (data) {
  //             // setMovies(data)
  //             console.log("getMoviePerPage", data);
  //             setProcess((pre) => pre + 24);
  //             data.forEach((item, index) => {
  //                 getMovie(
  //                     item.slug,
  //                     (movie) => {
  //                         const payload = {
  //                             ...item,
  //                             category: movie.movie.category,
  //                             episode_current: movie.movie.episode_current,
  //                             episode_total: movie.movie.episode_total,
  //                             year: movie.movie.year,
  //                             type: movie.movie.type,
  //                             status: movie.movie.status,
  //                             time: movie.movie.time,
  //                             view: movie.movie.view,
  //                             chieurap: movie.movie.chieurap,
  //                             country: movie.movie.country,
  //                             lang: movie.movie.lang,
  //                         };
  //                         console.log("payload", payload);
  //                         UpdateMoviesAPI(
  //                             payload,
  //                             (res) => {
  //                                 console.log("UpdateMoviesAPI", res);
  //                                 if (!res) {
  //                                     AddMovie(
  //                                         payload,
  //                                         (res) => {
  //                                             console.log("AddMovie-" + page, res);
  //                                             setSuccess((pre) => pre + 1);
  //                                         },
  //                                         undefined,
  //                                         () => {
  //                                             setErrorMovies((pre) => [...pre, item.slug]);
  //                                         }
  //                                     );
  //                                 } else {
  //                                     setSuccess((pre) => pre + 1);
  //                                 }
  //                             },
  //                             undefined,
  //                             () => {
  //                                 setErrorMovies((pre) => [...pre, item.slug]);
  //                             }
  //                         );
  //                     },
  //                     undefined,
  //                     () => {
  //                         setErrorMovies((pre) => [...pre, item.slug]);
  //                     }
  //                 );
  //             });
  //             if (page < 200) {
  //                 setPage((pre) => pre + 1);
  //             }
  //         }
  //     });

  //     // ======================== Update error movie
  //     // updateErrorMovie(errorMovies);
  // }, [page]);

  const updateErrorMovie = (error_slug_list: string[]) => {
    error_slug_list.forEach((slug: any, index) => {
      getMovie(
        slug,
        (movie) => {
          const payload = {
            ...movie.movie,
          };
          console.log("getMovie", movie);
          UpdateMoviesAPI(
            payload,
            (res) => {
              console.log("UpdateMoviesAPI", res);
              if (!res) {
                AddMovie(
                  payload,
                  (res) => {
                    console.log("AddMovie-" + page, res);
                    setSuccess((pre) => pre + 1);
                  },
                  undefined,
                  () => {
                    setErrorMovies((pre) => [...pre, slug]);
                  },
                );
              } else {
                setSuccess((pre) => pre + 1);
              }
            },
            undefined,
            () => {
              setErrorMovies((pre) => [...pre, slug]);
            },
          );
        },
        undefined,
        () => {
          setErrorMovies((pre) => [...pre, slug]);
        },
      );
    });
  };

  useEffect(() => {
    updateErrorMovie(["mat-tich-2026-phan-1"]);
  }, []);
  return (
    <div className="h-[100vh] text-white text-[40px] mt-[100px]">
      <div>Progress:{page}/1094</div>
      <div>
        success:{success}/{processPage}
      </div>
      {/* <div>Count:{count}</div> */}
      <div>Error:{errorMovies.join(", ")}</div>
    </div>
  );
};

export default UpdateMovies;
