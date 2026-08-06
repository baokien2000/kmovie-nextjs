export interface MovieItem {
    modified?: {
        time: Date;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name?: string;
    thumb_url: string;
    poster_url: string;
    category: ICategory_Country[];
    episode_current: string;
    episode_total: string;
    year: number;
    updatedAt: Date | number;
}
export interface ImovieList {
    status: boolean;
    items: MovieItem[];
    pathImage: string,
    pagination: {
        totalItems: number,
        totalItemsPerPage: number,
        currentPage: number,
        totalPages: number
    }
}
export interface ICategory_Country{
    id: string,
    name: string,
    slug: string
}
export interface IServer_data{
    name: number,
    slug: number,
    filename: string,
    link_embed: string,
    link_m3u8: string,
}
export interface Imovie {
    status: true,
    msg: string,
    movie: {
        created: {
            time: Date
        },
        modified: {
            time: Date
        },
        _id: string,
        name: string,
        origin_name: string,
        content: string,
        type: string,
        status: string,
        thumb_url:string,
        trailer_url: string,
        time: string,
        episode_current: string,
        episode_total: string,
        quality: string,
        lang: string,
        notify: string,
        showtimes:string,
        slug: string,
        year: string,
        view: string,
        actor: string[],
        director: string[],
        category: ICategory_Country[],
        country: ICategory_Country[],
        is_copyright: boolean,
        chieurap: boolean,
        poster_url: string,
        sub_docquyen: boolean
    },
    episodes: [
        {
            server_name: string,
            server_data: IServer_data[]
        }
    ]
}
