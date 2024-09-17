import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./utils/utils";
import { messageProfile } from "./utils/messageprofile";
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        messageProfileData: messageProfile.reducer,
    },
})

export default store
export type IRootState = ReturnType<typeof rootReducer>
