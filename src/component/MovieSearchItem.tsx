import React, { useEffect, useState } from "react";
import { Imovie, MovieItem } from "../repositories/interface/movie";
import { getMovie } from "../repositories/api/movie";
import { renderEpisode } from "./MovieCard";
import { useDispatch } from "react-redux";
import movieSlice from "../redux/slice/movie";
import { useNavigate } from "react-router";
interface Prop {
    movie: MovieItem;
    setSearchTerm: (value: string) => void;
}
const MovieSearchItem = (props: Prop) => {
    const { movie,setSearchTerm } = props;

    
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<Imovie>();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // useEffect(() => {
    //     movie.slug &&
    //         getMovie(
    //             movie.slug,
    //             (data) => {
    //                 setInfo(data);
    //             },
    //             setLoading
    //         );
    // }, [movie]);
    const handleClick = () => {
        dispatch(movieSlice.actions.setShowSearch(false))
        navigate("/phim/" + movie.slug)
        setSearchTerm("")
    }
    return (
        <div className="sm:w-1/2 w-full flex border-b-[1px] border-[#3e3e3e] py-[10px] cursor-pointer" onClick={handleClick}>
            <img src={"https://img.ophim8.cc/uploads/movies/"+ movie.thumb_url} alt="Thumbnail"  className="w-[50px] h-[50px] " />
            <div className="flex flex-1 flex-col ml-[10px] text-[#fff]">
                <span className="font-medium">{movie.name}</span>
                {/* <span className="opacity-70 text-[12px]">{info && renderEpisode(info?.movie.episode_current,info?.movie.episode_total)}</span> */}
                <span className="opacity-70 text-[12px]">{movie.origin_name}</span>
            </div>
        </div>
    );
};

export default MovieSearchItem;
