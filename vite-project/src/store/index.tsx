import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./utils/utils";
import { messageProfile } from "./utils/messageProfile";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        messageProfileData: messageProfile.reducer,
    },
})

export default store