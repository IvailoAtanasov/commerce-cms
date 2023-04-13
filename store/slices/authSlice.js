import { createSlice } from "@reduxjs/toolkit";
import { signUp, confirmSignUp, resendConfirmation } from "../thunks/authThunk";

const initialState = {
  username: null,
  error: false,
  success: false,
  isLoading: false,
  message: "",
  userGroups: [],
  userConfirmed: false,
  resendSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.error = false),
        (state.success = false),
        (state.message = ""),
        (state.userConfirmed = false),
        (state.resendSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.username = action.payload.user.username;
        state.userConfirmed = action.payload.user.userConfirmed;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(resendConfirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendConfirmation.fulfilled, (state) => {
        state.isLoading = false;
        state.resendSuccess = true;
      })
      .addCase(resendConfirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(confirmSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmSignUp.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(confirmSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectUser = (state) => state.user;
export default authSlice.reducer;
