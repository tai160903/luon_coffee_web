import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/instance";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await instance.post(
        `${import.meta.env.VITE_BASE_URL}/User/login`,
        {
          username,
          password,
        }
      );

      // Store user in localStorage
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.customer)
        );
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Authentication failed";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

// Initial state
const initialState = {
  user: user ? user : null,
  isAuthenticated: !!user,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
