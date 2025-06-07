import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authCheck = createAsyncThunk(
  "user/authCheck",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/authstatus`,
        { withCredentials: true }
      );

      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
        state.loading = false;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
