import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const testSlice = createSlice({
    name: 'test',
    initialState: {
        index: 0,
        status: 'idle',
    },
    reducers: {
        setIndex: (state, action) => {
            state.index += 1 ;
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

})
export default testSlice;



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