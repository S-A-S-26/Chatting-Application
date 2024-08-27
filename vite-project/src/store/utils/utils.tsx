import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
      _id: '',
      username: '',
      phone: '',
      status:'',
      profile:'',
    },
    reducers: {
      setUser: (state, action) => {
        console.log("action payload",action.payload)
        state._id = action.payload._id;
        state.username = action.payload.username;
        state.phone = action.payload.phone;
        state.status = action.payload.status;
        state.profile = action.payload.profile;
      },

    },
});

export const { setUser } = userSlice.actions;

