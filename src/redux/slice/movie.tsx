import { createSlice } from "@reduxjs/toolkit";
import { Imovie } from "../../repositories/interface/movie";

export interface IMovieSlice {
    movie: Imovie;
    status: string;
    showSearch: boolean;
    showCategory: boolean;
}

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movie: {},
        status: "idle",
        showSearch: false,
        showCategory: false,
    },
    reducers: {
        setShowSearch: (state, action) => {
            state.showSearch = action.payload;
        },
        setShowCategory: (state, action) => {
            state.showCategory = action.payload;
        },
    },
    // extraReducers: builder => {
    //     builder.addCase(getOrdersData.pending, (state, action) => {
    //         state.status = 'loading';
    //     }).addCase(getOrdersData.fulfilled, (state, action) => {
    //         state.index +=1
    //         state.status = 'idle'

    //     })
    // },
});
export default movieSlice;

// export const getOrdersData = createAsyncThunk('Order/getOrders', async () => {
//     const URL = "https://kstore-api.cyclic.app/orders"
//     const controller = new AbortController()
//     try {
//         const res = await axios({
//             method: 'get',
//             url: URL,
//             signal: controller.signal,
//         });
//         return res.data;

//     } catch (e) {
//         return []
//     }

// })
