import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/instance";
import { clearCart } from "./cartSilce";
import { PURGE } from "redux-persist";

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

      if (response.data && response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.customer)
        );
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        "Authentication failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  localStorage.clear();
  thunkAPI.dispatch(async () => {
    await PURGE();
  });
  thunkAPI.dispatch(clearCart());
  return null;
});

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
    updateUser: (state, action) => {
      state.user = action.payload;
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
        state.isAuthenticated = action.payload.status === 200;
        state.user = action.payload.data?.data?.customer || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset, updateUser } = authSlice.actions;
export default authSlice.reducer;
