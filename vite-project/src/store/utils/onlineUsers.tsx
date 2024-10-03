import { createSlice } from "@reduxjs/toolkit";

export const onlineUsers = createSlice({
  name: "onlineUsers",
  initialState: [],
  reducers: {
    setOnlineUsers: (state, action) => {
      // state.push(action.payload)
      return action.payload
    },

  },
});

export const { setOnlineUsers } = onlineUsers.actions;

