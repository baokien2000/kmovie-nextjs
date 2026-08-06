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
// const baseURL = "https://kmovie-api.vercel.app/movies";
const baseURL = "http://localhost:5000/movies";

export const getMovie = async (
    slug: string,
    callback: (data: Imovie) => void,
    loading?: React.Dispatch<boolean>
    ,errorCallback?: () => void
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
        errorCallback && errorCallback()
        console.log(error)
    } 
    if (loading) loading(false)

}
export const getMoviePerPage = async (
    page: string,
    callback: (data: MovieItem[]) => void,
    loading? : React.Dispatch<boolean>
) => {
    if (loading) loading(true)
    
    const url = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=" + page

    try {
        const response = await axios({
            method: 'get',
            url: url,
        });
        callback(response.data.items)
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
    loading?: React.Dispatch<boolean>
) => {
    if (loading) loading(true);
    const payload = {
        page: page,
        pageSize: pageSize,
        category: category,
    };
    const url = `${baseURL}/Category`;

    try {
        const response = await axios({
            method: "get",
            url: url,
            params: payload,
        });
        callback(response.data);
    } catch (error) {
        console.log(error);
    }
    if (loading) loading(false);
};

export const getKMovie = async (
    page: number,
    pageSize: number,
    search: string,
    callback: (data: ImovieList) => void,
    loading?: React.Dispatch<boolean>
) => {
    if (loading) loading(true);
    const payload = {
        page: page,
        pageSize: pageSize,
        search: search,
    };
    const url = baseURL;

    try {
        const response = await axios({
            method: "get",
            url: url,
            params: payload,
        });
        callback(response.data);
    } catch (error) {
        console.log(error);
    }
    if (loading) loading(false);
};

export const Search = async (value: string, callback: (data: MovieItem[]) => void, loading?: React.Dispatch<boolean>) => {
    if (loading) loading(true);
    const payload = {
        value: value,
    };
    // const url = "https://kmovie-api.vercel.app/movies/Search"
    const url = `${baseURL}/Search`;

    try {
        const response = await axios({
            method: "get",
            url: url,
            params: payload,
        });
        callback(response.data);
    } catch (error) {
        console.log(error);
        callback([]);
    }
    if (loading) loading(false);
};

export const UpdateMoviesAPI = async (movies: any, callback: (data: MovieItem[]) => void, loading?: React.Dispatch<boolean>,errorCallback?: () => void) => {
    if (loading) loading(true);

    const url = `${baseURL}/Update`;
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: movies,
        });
        console.log("im in call back sc",response.data);
        callback(response.data);
    } catch (error) {
        console.log("UpdateMoviesAPI error",error);
        errorCallback && errorCallback()
        callback([]);
    }
    if (loading) loading(false);
};


export const AddMovie = async (movies: any, callback: (data: MovieItem[]) => void, loading?: React.Dispatch<boolean>,errorCallback?: () => void) => { 
    if (loading) loading(true);

    const url = `${baseURL}/Add`;
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: movies,
        });
        callback(response.data);
    } catch (error) {
        console.log("AddMovie Error",error);
        errorCallback && errorCallback()
        callback([]);
    }
    if (loading) loading(false);
}


export const UpdateBlurImageAPI = async (id: string,image_url:string, callback: (data: any) => void,errorCallback?: () => void) => {
    const url = `${baseURL}/Update-blurImage`;
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: {
                id: id,
                image_url: image_url
            },
        });
        callback(response.data);
    } catch (error) {
        errorCallback && errorCallback()
        console.log("UpdateBlurImageAPI Error",error);
    }
};