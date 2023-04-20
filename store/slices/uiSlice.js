import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "signIn",
};

const authUiSlice = createSlice({
  name: "authUi",
  initialState,
  reducers: {
    setAuthUi: (state, action) => {
      state.type = action.payload;
    },
    resetAuthUi: (state) => {
      state.type = "signIn";
    },
  },
});

export const { setAuthUi, resetAuthUi } = authUiSlice.actions;

export const selectAuthUi = (state) => state.authUi;
export default authUiSlice.reducer;
