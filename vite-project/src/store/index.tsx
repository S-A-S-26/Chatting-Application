import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./utils/utils";
import { messageProfile } from "./utils/messageprofile";
import { combineReducers } from '@reduxjs/toolkit'
import { onlineUsers } from "./utils/onlineUsers";
import { groupModal } from "./utils/groupModal";
const rootReducer = combineReducers({})
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        messageProfileData: messageProfile.reducer,
        onlineUsers: onlineUsers.reducer,
        groupModal: groupModal.reducer,
    },
})

export default store
export type IRootState = ReturnType<typeof rootReducer>
