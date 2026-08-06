import React, { useEffect, useState } from "react";
import { Imovie, MovieItem } from "../repositories/interface/movie";
import { getMovie } from "../repositories/api/movie";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
interface Prop {
    movie: MovieItem;
    className?: string;
    ImagePath?: string;
}
export const renderEpisode = (current: string, total: string) => {
    if (["Full", "Trailer"].includes(current || "")) {
        return current;
    } else {
        if (["Hoàn Tất", "Hoàn tất", "hoàn tất"].some((item) => item === current?.slice(0, 8))) {
            return current.replaceAll("Hoàn Tất", "").replaceAll("Hoàn tất", "").replaceAll("hoàn tất", "").replaceAll("(", "").replaceAll(")", "");
        } else {
            return (current + "/" + total).replaceAll("Tập", "").replaceAll("tập", "").replaceAll("tâp", "").replaceAll("Đang cập nhật", "??");
        }
    }
};
const MovieCard = (props: Prop) => {
    const { movie, className, ImagePath } = props;
    const [loading, setLoading] = useState<boolean>(false);
    // const [info, setInfo] = useState<Imovie>();
    const navigate = useNavigate();
    // useEffect(() => {
    //     getMovie(movie.slug, (data) => {
    //         setInfo(data);
    //     },setLoading);
    // }, [movie]);
    console.log(dayjs(movie.modified?.time).format("DD/MM/YYYY hh:mm:ss"));
    return (
        <div
            onClick={() => navigate("/phim/" + movie.slug)}
            className={
                (!loading ? "opacity-100 " : "opacity-50 ") +
                " bg-black p-[5px] mx-[2px] my-[5px] relative cursor-pointer hover:opacity-[80%] " +
                className
            }
        >
            <img className=" object-fill h-[calc(100%-25px)] w-full " src={ImagePath + movie.thumb_url} alt={"thumbnail" + movie._id} />
            <p className="truncate px-[3p] py-[5px] text-sm text-center text-[#cc8d4c] font-bold">{movie.name}</p>
            <div className="absolute top-[15px]  left-[15px] px-[12px]  border-[3px] border-double bg-[#383838] border-[#5a5a5a]">
                <span className="text-[#cac9c9] font-bold text-sm">{renderEpisode(movie?.episode_current, movie?.episode_total)}</span>
            </div>
        </div>
    );
};

export default MovieCard;
