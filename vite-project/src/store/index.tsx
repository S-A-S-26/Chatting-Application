import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./utils/utils";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})

export default store