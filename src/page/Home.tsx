import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MovieCard from "../component/MovieCard";
import { Input, Pagination } from "antd";
import HomeTitle from "../component/HomeTitle";
import Carousel from "../component/Carousel";
import { SendIcon } from "../asset/svg";
import { ImovieList } from "../repositories/interface/movie";
import { getKMovie } from "../repositories/api/movie";

import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../component/Loading";

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [loading, setLoading] = useState(false);
    const [showJumpPage, setShowJumpPage] = useState(false);
    const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
    const [movies, setMovies] = useState<ImovieList>();
    const pageSize = 24;

    const moviesListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        getKMovie(page, pageSize, (data) => data && setMovies(data), setLoading);
        setSearchParams({ page: page.toString() });
    }, [page]);


    // const { movies } = props

    const onPageChange = (page: number) => {
        setPage(page);
        moviesListRef.current?.scrollIntoView({ behavior: "smooth" });
    };  

    return movies ? (<div className="bg-[#2d2d2d] px-[10px] py-[20px] max-w-[1100px]">
        <HomeTitle title="Phim đề cử" />

        <Carousel movies={movies} />
        <HomeTitle forwardRef={moviesListRef} title="Mới cập nhật" />
        <div
            className={
                (!loading ? "opacity-100" : "opacity-50 ") +
                " p-[10px] flex-1 rounded-[8px] flex items-center justify-start w-full flex-wrap bg-[#404040]"
            }
        >
            {movies.items.map((movie, index) => {
                return (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        ImagePath={movies.pathImage}
                        className="w-[calc(50%-4px)] sm:w-[calc(33.33%-4px)] md:w-[calc(25%-4px)] h-60 md:h-80"
                    />
                    // <div className="w-[calc(25%-4px)] h-80 bg-[red] p-[5px] mx-[2px] my-[5px]"></div>
                );
            })}
        </div>
        <div className="flex flex-col items-center" >
            <div className="my-[10px] w-fit ">
                <div className="flex justify-center">
                    <Pagination
                        defaultCurrent={1}
                        current={page}
                        showPrevNextJumpers={false}
                        showSizeChanger={false}
                        total={movies.pagination.totalItems}
                        defaultPageSize={pageSize}
                        onChange={onPageChange}
                        nextIcon={"Sau"}
                        prevIcon={"Trước"}
                    />
                    <div className="FastJumb" onClick={() => setShowJumpPage((preState) => !preState)}>
                        GO
                    </div>
                </div>
                {showJumpPage && (
                    <div className="flex ">
                        <Input className="SearchInput PaginationInput flex-1" placeholder="Nhập từ khóa..." />

                        <div className="PaginationSendIcon">
                            <SendIcon />
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div> ): <Loading className="h-[calc(100vh-70px)] bg-[#2d2d2d] "/>
}
