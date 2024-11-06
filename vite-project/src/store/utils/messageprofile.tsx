import { createSlice } from "@reduxjs/toolkit";

export const messageProfile = createSlice({
  name: "messageProfile",
  initialState: {
    _id: '',
    username: '',
    phone: '',
    status: '',
    profile: '',
    group: false,
  },
  reducers: {
    setMessageUser: (state, action) => {
      console.log("action payload messageProfile", action.payload)
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.status = action.payload.status;
      state.profile = action.payload.profile;
      state.group = action.payload.group;
    },

  },
});

export const { setMessageUser } = messageProfile.actions;

