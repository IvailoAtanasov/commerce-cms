import { Auth } from "aws-amplify";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Register user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, thunkAPI) => {
    try {
      return await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//resend confirmation code
export const resendConfirmation = createAsyncThunk(
  "auth/resendConfirmation",
  async ({ username }, thunkAPI) => {
    try {
      return await Auth.resendSignUp(username);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// confirm sign up
export const confirmSignUp = createAsyncThunk(
  "auth/confirmSignUp",
  async ({ username, code }, thunkAPI) => {
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
