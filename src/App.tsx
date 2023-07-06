import React, { useEffect, useState } from "react";
import "./App.css";
import { getIndex } from "./redux/selector";
import { useSelector, useDispatch } from "react-redux";
import testSlice from "./redux/slice/test";
import { getKMovie, getMovieList } from "./repositories/api/movie";
import { ImovieList, MovieItem } from "./repositories/interface/movie";
import MovieCard from "./component/MovieCard";

import NavBar from "./component/NavBar";
import HomeTitle from "./component/HomeTitle";

function App() {
    const dispatch = useDispatch();
    const index = useSelector(getIndex);

    const [page, setPage] = useState(3);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<ImovieList>();

    useEffect(() => {
        getMovieList(
            page,
            (data) => {
                if (data) {
                    setMovies(data);
                }
            },
            setLoading
        );
    }, [page]);

    return (
        <div className="App bg-[black]  flex flex-col items-center ">
			<NavBar/>
            <div className="bg-[#2d2d2d] p-[10px] max-w-[1100px]">
                <HomeTitle title="Phim đề cử"/>
                <HomeTitle title="Mới cập nhật"/>
                <div className="p-[10px] flex-1 rounded-[8px] flex items-center justify-center w-full flex-wrap bg-[#404040]">
                    {movies &&
                        movies.items.map((movie) => {
                            return (
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    ImagePath={movies.pathImage}
                                    className="w-[calc(25%-4px)] h-80"
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;
