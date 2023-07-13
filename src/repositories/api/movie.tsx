import axios from "axios";
import { Imovie, ImovieList, MovieItem } from "../interface/movie";

// export const getMovieList = async (
//     page: number,
//     callback: (data: ImovieList) => void,
//     loading? : React.Dispatch<boolean>
// ) => {
//     if (loading) loading(true)
    
//     const url = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=" + page
//     try {
//         const response = await axios({
//             method: 'get',
//             url: url,
//         });
//         callback(response.data)
//     } catch (error) {
//         console.log(error)
//     } 
//     if (loading) loading(false)

// }

export const getMovie = async (
    slug: string,
    callback: (data: Imovie) => void,
    loading? : React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    
    const url = "https://ophim1.com/phim/" + slug

    try {
        const response = await axios({
            method: 'get',
            url: url,
        });
        callback(response.data)
    } catch (error) {
        console.log(error)
    } 
    if (loading) loading(false)

}


export const getKMovie = async (
    page: number,
    pageSize: number,
    callback: (data: ImovieList) => void,
    loading?: React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    const payload = {
        page: page,
        pageSize: pageSize,
    }
    const url = "https://kmovie-api.vercel.app/movies"

    try {
        const response = await axios({
            method: 'get',
            url: url,
            params: payload,
        });
        callback(response.data)
    } catch (error) {
        console.log(error)
    } 
    if (loading) loading(false)

}


export const Search = async (
    value: string,
    callback: (data: MovieItem[]) => void,
    loading?: React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    const payload = {
        value: value,
    }
    const url = "https://kmovie-api.vercel.app/movies/Search"

    try {
        const response = await axios({
            method: 'get',
            url: url,
            params: payload,
        });
        callback(response.data)
    } catch (error) {
        console.log(error)
        callback([])
    } 
    if (loading) loading(false)

}