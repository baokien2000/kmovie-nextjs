import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getMovie } from '../repositories/api/movie';
import { Imovie } from '../repositories/interface/movie';
import { FilmIcon, ReportIcon } from '../asset/svg';
import { Button } from 'antd';
import Comment from '../component/Comment';
import Loading from '../component/Loading';

const MovieWatch = () => {
    const params = useParams()


    const [info, setInfo] = useState<Imovie>()
    const [movieLink, setMovieLink] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false);
    const [episode, setEpisode] = useState(params.EpisodeSlug?.split("-")[1] ?? "")
    const [server,setServer] = useState<string>()
    useEffect(() => {
        params.slug && 
            getMovie(
                params.slug,
                (data) => {
                    setInfo(data);
                    if (episode !== "kep") {
                        setMovieLink(data.episodes[0].server_data.find(item => item.slug.toString() === episode)?.link_embed)
                    } else {
                        setMovieLink(data.episodes[0].server_data.find(item => item.filename.toString() === params.EpisodeSlug?.split("-")[2])?.link_embed)
                    }
                    setServer(data.episodes[0].server_name)
                },
                setLoading
            );
    }, []);
    info &&console.log(info.episodes[0].server_data.filter(item => item.slug.toString() === episode));
    useEffect(() => {
        if (info) {
            setMovieLink(info.episodes[0].server_data.find(item => item.slug.toString() === episode)?.link_embed)
        }       
    },[episode])
    console.log("info",movieLink);


    return (
        info ? <div className='p-[10px] bg-[#2d2d2d] w-full max-w-[1100px]'>
            <div className='bg-[#000000] flex flex-col rounded-[5px] p-[10px]'>
                <div className='flex pb-[10px] border-b-[1px] border-dashed border-[#2f2f2f] text-[#ffce4f] font-bold text-[16px] items-center'>
                    <FilmIcon />
                    <span className='ml-[10px]'>{info?.movie.name}</span>
                </div>
                <div className='flex pt-[10px] justify-between text-[#a7a7a7] font-bold text-[16px] items-center'>
                    <span>{"Tập " + episode}</span>
                    <div className='p-[5px] rounded-[5px] bg-[#b73a3a]'><ReportIcon/></div>
                </div>
            </div>
            <div className='my-[10px] mb-[20px] flex gap-[10px] justify-center'>
                {info?.episodes.map((item,index) => {
                    return <Button onClick={() => setServer(item.server_name)} key={index} className={(item.server_name === server ? "MovieWatchBtn" : "MovieBtn") + ' bg-[#ffce4f]'}>{item.server_name}</Button>
                })}
            </div>
            <iframe title='Movies' allowFullScreen={true} className='w-full h-[200px]  sm:h-[500px]' src={movieLink} />
            <div className="w-full p-[10px] text-[#ccc] bg-[#404040] rounded-[5px] mt-[10px]">
                    <h3 className="font-semibold mt-[5px]">Danh sách tập phim</h3>
                    <div className="EpisodeList pr-[10px]  overflow-auto items-start flex flex-wrap mt-[10px] max-h-[300px]">
                        {info?.episodes[0].server_data.map((ep,index) => {
                            return <a
                                href={"/phim/" + params.slug + "/tap-" + ep.slug}
                                key={ep.slug + index}
                            className={(ep.slug.toString() === episode ? "bg-[#000]" : "bg-[#333232]") +" hover:bg-[#ffce4f] hover:text-[#000]  px-[10px] py-[5px] text-center sm:w-[50px] w-1/5 bg-[#333232] border-[1px] border-[#4e4e4e]"}
                        >
                             {ep.slug.toString() === "full" ? "full" : index + 1}   
                        </a>
                        })}
                    </div>
            </div>
            <Comment info={info}/>

        </div> :<Loading className="h-[calc(100vh-70px)] bg-[#2d2d2d] "/>
    );
};

export default MovieWatch;