import axios from "axios";
import { Imovie, ImovieList } from "../interface/movie";

export const getMovieList = async (
    page: number,
    callback: (data: ImovieList) => void,
    loading? : React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    
    const url = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=" + page
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


export const getKMovie = async(
    callback: (data: any) => void,
    loading? : React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    
    const url = "http://localhost:5000/movies"

    try {
        const response = await axios({
            method: 'get',
            url: url,
        });
        callback(response)
    } catch (error) {
        console.log(error)
    } 
    if (loading) loading(false)

}