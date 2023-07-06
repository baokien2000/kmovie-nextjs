import React, { useEffect, useState } from "react";
import { Imovie, MovieItem } from "../repositories/interface/movie";
import { getMovie } from "../repositories/api/movie";
interface Prop {
    movie: MovieItem;
    className?: string;
    ImagePath?: string;
}
const MovieCard = (props: Prop) => {
    const { movie, className, ImagePath } = props;

    const [info, setInfo] = useState<Imovie>();
    useEffect(() => {
        getMovie(movie.slug, (data) => {
            setInfo(data);
        });
    }, []);
    
    return (
        <div className={"bg-black p-[5px] mx-[2px] my-[5px] relative cursor-pointer hover:opacity-[80%] " + className}>
            <img
                className=" object-fill h-[calc(100%-25px)] w-full "
                src={ImagePath + movie.thumb_url}
                alt="thumbnail"
            />
            <p className="truncate px-[3p] py-[5px] text-sm text-center text-[#cc8d4c] font-bold">{movie.name}</p>
            <div className="absolute top-[15px]  left-[15px] px-[12px]  border-[3px] border-double bg-[#383838] border-[#5a5a5a]">
                <span className="text-[#cac9c9] font-bold text-sm">
                    {["Full","Trailer"].includes(info?.movie.episode_current || "")
                        ? info?.movie.episode_current
                        : info?.movie.episode_current.includes("Hoàn Tất")
                            ? info?.movie.episode_current.replaceAll("Hoàn Tất", "").replaceAll("(", "")
                            .replaceAll(")", "")
                            : (info?.movie.episode_current + "/" + info?.movie.episode_total)
                              .replaceAll("Tập", "")
                              .replaceAll("tập", "")
                              }
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
