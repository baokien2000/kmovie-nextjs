import { createSelector } from "@reduxjs/toolkit";
import { Imovie } from "../repositories/interface/movie";
import { IMovieSlice } from "./slice/movie";
interface IReducer {
    movies: IMovieSlice;
}

export const getShowSearch = (state: IReducer) => state.movies.showSearch;
