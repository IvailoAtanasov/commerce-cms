import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  confirmSignUp,
  resendConfirmation,
  signIn,
  forgottenPassword,
  forgottenPasswordSubmit,
} from "../thunks/authThunk";

const initialState = {
  error: false,
  success: false,
  isLoading: false,
  message: "",
  resendSuccess: false,
  userConfirmed: false,
  username: null,
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
        (state.resendSuccess = false);
    },
    setSocialLoading: (state, action) => {
      state.isSocialLoading = action.payload;
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
        state.userConfirmed = action.payload.userConfirmed;
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
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(forgottenPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgottenPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(forgottenPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(forgottenPasswordSubmit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgottenPasswordSubmit.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(forgottenPasswordSubmit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setSocialLoading } = authSlice.actions;

export const selectUser = (state) => state.user;
export default authSlice.reducer;
