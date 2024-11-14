import { createSlice } from "@reduxjs/toolkit";

export const groupModal = createSlice({
  name: "groupModal",
  initialState: false,
  reducers: {
    toggleCreateGroup: (state) => {
      // state.push(action.payload)
      console.log("toggle create group", state)
      return !state
    },

  },
});

export const { toggleCreateGroup } = groupModal.actions;

