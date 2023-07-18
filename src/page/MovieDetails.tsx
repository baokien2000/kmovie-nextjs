import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovie } from "../repositories/api/movie";
import { ICategory_Country, Imovie } from "../repositories/interface/movie";
import { Button } from "antd";
import { BookmarkIcon, PlayIcon, RefreshIcon, StarIcon } from "../asset/svg";
import Comment from "../component/Comment";
import { useDispatch } from "react-redux";
import movieSlice from "../redux/slice/movie";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";

const Movie = () => {
    const params = useParams();
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<Imovie>();

    useEffect(() => {
        params.slug &&
            getMovie(
                params.slug,
                (data) => {
                    setInfo(data);
                    // dispatch(movieSlice.actions.setMovieWatch(data))
                },
                setLoading
            );
    }, [params.slug ]);
    const renderMovieStatus = (status: string) => {
        switch (status) {
            case "ongoing":
                return "Đang tiến hành"
                case "completed":
                    return "Hoàn thành"
            default:
                break;
        }
    }
    const renderMovieCategory = (category: ICategory_Country[]) => {
        // const categoryList = []
        const categoryList = category.map(item => {
            return <Link to={"/the-loai/" + item.slug} key={item.id} className="py-[5px] px-[10px] rounded-[6px] cursor-pointer bg-[#313131]">{item.name}</Link>
        })
        return categoryList
    }
    console.log(info);
    return info ? (
        <div className="text-white w-full max-w-[1100px] bg-[#2d2d2d] p-[10px] ">
            <div className="w-full">
                <h1 className="p-[10px] bg-[#3a3a3a] text-[17px] text-center text-[#cccccc] font-bold ">
                    {info.movie.name}
                </h1>

                <div className="flex flex-col sm:flex-row p-[10px] bg-[#191919] items-center  ">
                    <img
                        src={info.movie.thumb_url}
                        alt="thumbnail"
                        className="sm:w-[250px] w-full mb-[20px] sm:mb-[0] object-cover p-[5px] bg-black"
                    />
                    <div className="w-full text-[#ccc] ml-[10px] ">
                        <div className="flex w-full p-[15px] border-b-[1px] border-[#2f2f2f]">
                            <span className="font-bold w-[100px] ">Tên Khác</span>
                            <span className="flex-1 text-center font-medium">{info.movie.origin_name}</span>
                        </div>
                        <div className="flex w-full p-[15px] border-b-[1px] border-[#2f2f2f]">
                            <span className="font-bold w-[100px] ">Thể loại</span>
                            <div className="flex-1 flex justify-center gap-[5px] font-medium">{renderMovieCategory(info.movie.category)}</div>
                        </div>
                        <div className="flex w-full p-[15px] border-b-[1px] border-[#2f2f2f]">
                            <span className="font-bold w-[100px]">Trạng thái</span>
                            <span className="flex-1 text-center font-medium">{renderMovieStatus(info.movie.status)}</span>
                        </div>
                        <div className="flex w-full p-[15px] border-b-[1px] border-[#2f2f2f]">
                            <span className="font-bold w-[100px]">Điểm</span>
                            <span className="flex-1 text-center font-medium">{info.movie.view}</span>
                        </div>
                        <div className="flex w-full p-[15px] border-b-[1px] border-[#2f2f2f]">
                            <span className="font-bold w-[100px]">Phát hành</span>
                            <span className="flex-1 text-center font-medium">{info.movie.year}</span>
                        </div>
                        <div className="flex w-full p-[15px]">
                            <span className="font-bold w-[100px]">Thời lượng</span>
                            <span className="flex-1 text-center font-medium">{info.movie.time}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between p-[10px] bg-[#404040] mt-[10px] rounded-[5px]">
                <Link to={"/phim/" + params.slug + "/tap-" + info.episodes[0].server_data[0].slug } >
                <Button className="MovieWatchBtn sm:w-[200px] w-[130px]  bg-[#ffce4f]" icon={<PlayIcon />}>
                    Xem ngay
                </Button>
                </Link>
                <div className="flex sm:gap-[10px] gap-[5px]">
                    <Button className="MovieBtn bg-[#191919] text-[#ccc] px-[10px] sm:px-[15px]" icon={<BookmarkIcon fill="#ccc" />}>
                        Lưu
                    </Button>
                    <Button className="MovieBtn bg-[#191919] text-[#ccc] px-[10px] sm:px-[15px]" icon={<StarIcon fill="#ccc" />}>
                        Đánh giá
                    </Button>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-[10px] mt-[10px] text-[#ccc] ">
                <div className="sm:w-[300px] w-full p-[10px]  bg-[#404040] rounded-[5px]">
                    <h3 className="font-semibold mt-[5px]">Danh sách tập phim</h3>
                    <div className="EpisodeList pr-[10px]  overflow-auto items-start flex flex-wrap mt-[10px] max-h-[300px]">
                        {info.episodes[0].server_data.map((ep,index) => {
                            return <a
                                href={"/phim/" + params.slug + "/tap-" + ep.slug + (ep.slug.toString() === "kep" ? "-"+ep.filename : "" )}
                                key={ep.slug + index}
                            className="hover:bg-[#ffce4f] hover:text-[#000] px-[10px] py-[5px] text-center sm:w-1/4 w-1/5 bg-[#333232] border-[1px] border-[#4e4e4e]"
                        >
                            {ep.slug.toString() === "full" ? "full" : index + 1}
                        </a>
                        })}
                    </div>
                </div>
                <div className="flex-1 p-[10px] bg-[#404040] rounded-[5px]">
                    <h3 className="font-semibold mt-[5px]">Nội dung</h3>
                    <div
                        className="mt-[10px] text-[14] overflow-auto EpisodeList max-h-[300px]"
                        dangerouslySetInnerHTML={{ __html: info.movie.content }}
                    />
                </div>
            </div>
            
            <Comment info={info}/>
        </div>
    ) : <Loading className="h-[calc(100vh-70px)] bg-[#2d2d2d] "/>
    
};

export default Movie;
