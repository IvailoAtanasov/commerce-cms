import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

const initialState = {
  user: null,
  error: false,
  success: false,
  isLoading: false,
  message: "",
};

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.error = false),
        (state.success = false),
        (state.message = "");
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
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectUser = (state) => state.user;
export default authSlice.reducer;
