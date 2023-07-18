import React, { useEffect, useRef, useState } from "react";
import HomeTitle from "../component/HomeTitle";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Input, Pagination } from "antd";
import { SendIcon } from "../asset/svg";
import { ImovieList } from "../repositories/interface/movie";
import { getCategoryMovie, getKMovie } from "../repositories/api/movie";
import Loading from "../component/Loading";
import MovieCard from "../component/MovieCard";

const Category = () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [showJumpPage, setShowJumpPage] = useState(false);
    const [movies, setMovies] = useState<ImovieList>();
    const moviesListRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
    const pageSize = 24;
    console.log(params.CategorySlug);
    useEffect(() => {
        getCategoryMovie(page, pageSize, params.CategorySlug ?? "", (data) => data && setMovies(data), setLoading);
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    }, [page, params.CategorySlug]);

    const onPageChange = (page: number) => {
        setPage(page);
        moviesListRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return movies ? (
        <div className="bg-[#2d2d2d] px-[10px] py-[20px] max-w-[1100px] w-full">
            <HomeTitle title="Phim " highlight={renderCategory(params.CategorySlug || "")} />
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
            <div className="flex flex-col items-center">
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
        </div>
    ) : (
        <Loading className="h-[calc(100vh-70px)] bg-[#2d2d2d] " />
    );
};

export default Category;

export const renderCategory = (category: string) => {
    switch (category) {
        case "hanh-dong":
            return "Hành Động";
        case "tinh-cam":
            return "Tình Cảm";
        case "hai-huoc":
            return "Hài Hước";
        case "co-trang":
            return "Cổ Trang";
        case "tam-ly":
            return "Tâm Lý";
        case "hinh-su":
            return "Hình Sự";
        case "chien-tranh":
            return "Chiến Tranh";
        case "the-thao":
            return "Thể Thao";
        case "vo-thuat":
            return "Võ Thuật";
        case "vien-tuong":
            return "Viễn Tưởng";
        case "phieu-luu":
            return "Phiêu Lưu";
        case "khoa-hoc":
            return "Khoa Học";
        case "kinh-di":
            return "Kinh Dị";
        case "am-nhac":
            return "Âm Nhạc";
        case "than-thoai":
            return "Thần Thoại";
        case "tai-lieu":
            return "Tài Liệu";
        case "gia-dinh":
            return "Gia Đình";
        case "chinh-kich":
            return "Chính kịch";
        case "hanh":
            return "Hành";
        case "bi-an":
            return "Bí ẩn";
        case "hoc-duong":
            return "Học Đường";
        case "kinh-dien":
            return "Kinh Điển";
        default:
            return category;
    }
};
