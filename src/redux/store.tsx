import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slice/test";

const store = configureStore({
    reducer: {
        test: testSlice.reducer,

    }
})
export default store;