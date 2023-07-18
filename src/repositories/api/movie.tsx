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
export const getCategoryMovie = async (
    page: number,
    pageSize: number,
    category: string,
    callback: (data: ImovieList) => void,
    loading?: React.Dispatch<boolean>,
) => {
    if (loading) loading(true)
    const payload = {
        page: page,
        pageSize: pageSize,
        category: category,
    }
    const url = "http://localhost:5000/movies/Category"

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

export const getKMovie = async (
    page: number,
    pageSize: number,
    search: string,
    callback: (data: ImovieList) => void,
    loading?: React.Dispatch<boolean>,
) => {
    if (loading) loading(true)
    const payload = {
        page: page,
        pageSize: pageSize,
        search: search,
    }
    const url = "http://localhost:5000/movies"

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
    // const url = "https://kmovie-api.vercel.app/movies/Search"
    const url = "http://localhost:5000/movies/Search"

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

export const UpdateMoviesAPI = async (
    movies: MovieItem,
    callback: (data: MovieItem[]) => void,
    loading?: React.Dispatch<boolean>
) => {
    if (loading) loading(true)

    // const url = "https://kmovie-api.vercel.app/movies/Search"
    const url = "http://localhost:5000/movies/Update"

    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: movies,
        });
        callback(response.data)
    } catch (error) {
        console.log(error)
        callback([])
    } 
    if (loading) loading(false)

}