import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authError: null,
  authGroups: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload;
    },

    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setAtuhGroups: (state, action) => {
      state.authGroups = action.payload;
    },
  },
});

export const { setActiveUser, setAuthError, setAtuhGroups } = authSlice.actions;

export const selectUser = (state) => state.user;
export default authSlice.reducer;
